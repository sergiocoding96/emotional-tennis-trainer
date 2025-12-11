import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders, handleCors } from '../_shared/cors.ts'
import { getSupabaseClient } from '../_shared/supabase.ts'
import { SUMMARY_SYSTEM_PROMPT } from '../_shared/coach-prompts.ts'

interface SummaryRequest {
  sessionId: string
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

    const body: SummaryRequest = await req.json()
    const { sessionId } = body

    if (!sessionId) {
      return new Response(
        JSON.stringify({ error: 'Missing sessionId' }),
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

    // Get all messages from the session
    const { data: messages, error: messagesError } = await supabase
      .from('debrief_messages')
      .select('role, content')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true })

    if (!messages || messages.length < 2) {
      return new Response(
        JSON.stringify({ error: 'Not enough conversation to summarize' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get reframes created during the session
    const { data: reframes } = await supabase
      .from('debrief_reframes')
      .select('original_thought, reframed_thought')
      .eq('session_id', sessionId)

    // Get user's routines for context
    const { data: userRoutines } = await supabase
      .from('routines')
      .select('emotion, name, steps')
      .eq('user_id', user.id)

    // Build the prompt
    const conversationText = messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n\n')

    const userPrompt = `MATCH ANALYSIS:
${JSON.stringify(session.analysis, null, 2)}

CONVERSATION:
${conversationText}

REFRAMES CREATED DURING SESSION:
${reframes && reframes.length > 0
  ? reframes.map(r => `- "${r.original_thought}" -> "${r.reframed_thought}"`).join('\n')
  : 'None explicitly created'}

PLAYER'S EXISTING ROUTINES:
${userRoutines && userRoutines.length > 0
  ? userRoutines.map(r => `- ${r.name} (${r.emotion}): ${r.steps?.join(', ')}`).join('\n')
  : 'None saved yet'}

Generate a summary of this debriefing session.`

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
        max_tokens: 1500,
        system: SUMMARY_SYSTEM_PROMPT,
        messages: [
          { role: 'user', content: userPrompt }
        ]
      })
    })

    if (!claudeResponse.ok) {
      const errorText = await claudeResponse.text()
      console.error('Claude API error:', errorText)
      return new Response(
        JSON.stringify({ error: 'AI summary failed' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const claudeData = await claudeResponse.json()
    const responseText = claudeData.content[0]?.text || ''

    // Parse the JSON response
    let parsedResponse
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('No JSON found in response')
      }
    } catch (parseError) {
      console.error('Failed to parse Claude response:', responseText)
      return new Response(
        JSON.stringify({ error: 'Failed to parse summary' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Update the session with the summary and mark as completed
    const { error: updateError } = await supabase
      .from('debrief_sessions')
      .update({
        summary: parsedResponse.summary,
        completed_at: new Date().toISOString()
      })
      .eq('id', sessionId)

    if (updateError) {
      console.error('Failed to update session:', updateError)
    }

    return new Response(
      JSON.stringify({
        summary: parsedResponse.summary
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in debrief-summary:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
