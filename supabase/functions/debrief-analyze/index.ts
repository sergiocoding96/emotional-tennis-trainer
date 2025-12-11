import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders, handleCors } from '../_shared/cors.ts'
import { getSupabaseClient } from '../_shared/supabase.ts'
import { ANALYZE_SYSTEM_PROMPT } from '../_shared/coach-prompts.ts'

interface AnalyzeRequest {
  matchDescription: string
  userTriggers?: string[]
  matchDate?: string
  opponent?: string
  score?: string
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

    const body: AnalyzeRequest = await req.json()
    const { matchDescription, userTriggers = [], matchDate, opponent, score } = body

    if (!matchDescription || matchDescription.trim().length < 10) {
      return new Response(
        JSON.stringify({ error: 'Match description is too short' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Build the prompt with user's known triggers
    const userPrompt = `Match Description:
${matchDescription}

${userTriggers.length > 0 ? `Player's Known Triggers (from their profile):\n${userTriggers.map(t => `- ${t}`).join('\n')}` : 'No known triggers on file.'}

Analyze this match and provide the opening for the debriefing session.`

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
        max_tokens: 2000,
        system: ANALYZE_SYSTEM_PROMPT,
        messages: [
          { role: 'user', content: userPrompt }
        ]
      })
    })

    if (!claudeResponse.ok) {
      const errorText = await claudeResponse.text()
      console.error('Claude API error:', errorText)
      return new Response(
        JSON.stringify({ error: 'AI analysis failed' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const claudeData = await claudeResponse.json()
    const responseText = claudeData.content[0]?.text || ''

    // Parse the JSON response
    let parsedResponse
    try {
      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = responseText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('No JSON found in response')
      }
    } catch (parseError) {
      console.error('Failed to parse Claude response:', responseText)
      return new Response(
        JSON.stringify({ error: 'Failed to parse analysis' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create the debrief session in the database
    const { data: session, error: sessionError } = await supabase
      .from('debrief_sessions')
      .insert({
        user_id: user.id,
        initial_input: matchDescription,
        match_date: matchDate || null,
        opponent: opponent || null,
        score: score || null,
        analysis: parsedResponse.analysis
      })
      .select()
      .single()

    if (sessionError) {
      console.error('Failed to create session:', sessionError)
      return new Response(
        JSON.stringify({ error: 'Failed to create session' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Save the opening message
    await supabase
      .from('debrief_messages')
      .insert({
        session_id: session.id,
        role: 'assistant',
        content: parsedResponse.openingMessage,
        referenced_emotion: parsedResponse.analysis.emotions_detected[0]?.emotion || null
      })

    return new Response(
      JSON.stringify({
        sessionId: session.id,
        analysis: parsedResponse.analysis,
        openingMessage: parsedResponse.openingMessage
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in debrief-analyze:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
