import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders, handleCors } from '../_shared/cors.ts'
import { getSupabaseClient } from '../_shared/supabase.ts'
import { buildChatPrompt, CHAT_SYSTEM_PROMPT } from '../_shared/coach-prompts.ts'

interface ChatRequest {
  sessionId: string
  message: string
}

serve(async (req: Request) => {
  // Handle CORS preflight
  const corsResponse = handleCors(req)
  if (corsResponse) return corsResponse

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const supabase = getSupabaseClient(authHeader)

    // Get user from auth
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const body: ChatRequest = await req.json()
    const { sessionId, message } = body

    if (!sessionId || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing sessionId or message' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get the session and verify ownership
    const { data: session, error: sessionError } = await supabase
      .from('debrief_sessions')
      .select('*')
      .eq('id', sessionId)
      .eq('user_id', user.id)
      .single()

    if (sessionError || !session) {
      return new Response(
        JSON.stringify({ error: 'Session not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get conversation history
    const { data: messages, error: messagesError } = await supabase
      .from('debrief_messages')
      .select('role, content')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true })

    const conversationHistory = messages || []

    // Get user's routines and scenarios for context
    const [routinesResult, scenariosResult] = await Promise.all([
      supabase.from('routines').select('*').eq('user_id', user.id),
      supabase.from('scenarios').select('*').eq('user_id', user.id)
    ])

    const userRoutines = routinesResult.data || []
    const userScenarios = scenariosResult.data || []

    // Save the user's message
    await supabase
      .from('debrief_messages')
      .insert({
        session_id: sessionId,
        role: 'user',
        content: message
      })

    // Build the prompt
    const fullPrompt = buildChatPrompt(
      session.analysis || {},
      userRoutines,
      userScenarios,
      conversationHistory,
      message
    )

    // Call Claude API
    const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY')
    if (!anthropicApiKey) {
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [
          { role: 'user', content: fullPrompt }
        ]
      })
    })

    if (!claudeResponse.ok) {
      const errorText = await claudeResponse.text()
      console.error('Claude API error:', errorText)
      return new Response(
        JSON.stringify({ error: 'AI response failed' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const claudeData = await claudeResponse.json()
    const responseText = claudeData.content[0]?.text || ''

    // Detect if a reframe was suggested
    let suggestedReframe = null
    const reframeMatch = responseText.match(/Instead of:\s*["""]?([^"""]+)["""]?\s*Try:\s*["""]?([^"""]+)["""]?/i)
    if (reframeMatch) {
      suggestedReframe = {
        original: reframeMatch[1].trim(),
        reframed: reframeMatch[2].trim()
      }

      // Save the reframe
      await supabase
        .from('debrief_reframes')
        .insert({
          session_id: sessionId,
          original_thought: suggestedReframe.original,
          reframed_thought: suggestedReframe.reframed
        })
    }

    // Detect referenced emotion
    const emotions = ['disappointment', 'frustration', 'anger', 'anxiety', 'calmness', 'excitement']
    let referencedEmotion = null
    for (const emotion of emotions) {
      if (responseText.toLowerCase().includes(emotion)) {
        referencedEmotion = emotion
        break
      }
    }

    // Save the assistant's response
    await supabase
      .from('debrief_messages')
      .insert({
        session_id: sessionId,
        role: 'assistant',
        content: responseText,
        referenced_emotion: referencedEmotion
      })

    return new Response(
      JSON.stringify({
        message: responseText,
        referencedEmotion,
        suggestedReframe
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in debrief-chat:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
