-- Migration: Add Match Debriefing Tables
-- Description: Creates tables for the AI-powered match debriefing chat feature

-- Debrief sessions table
CREATE TABLE IF NOT EXISTS debrief_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  match_date DATE,
  opponent TEXT,
  score TEXT,
  initial_input TEXT NOT NULL,
  analysis JSONB,
  summary JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  completed_at TIMESTAMPTZ
);

-- Debrief messages table
CREATE TABLE IF NOT EXISTS debrief_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES debrief_sessions(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  referenced_emotion TEXT CHECK (referenced_emotion IN ('disappointment', 'frustration', 'anger', 'anxiety', 'calmness', 'excitement')),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Debrief reframes table
CREATE TABLE IF NOT EXISTS debrief_reframes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES debrief_sessions(id) ON DELETE CASCADE NOT NULL,
  original_thought TEXT NOT NULL,
  reframed_thought TEXT NOT NULL,
  emotion TEXT CHECK (emotion IN ('disappointment', 'frustration', 'anger', 'anxiety', 'calmness', 'excitement')),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_debrief_sessions_user_id ON debrief_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_debrief_sessions_created_at ON debrief_sessions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_debrief_messages_session_id ON debrief_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_debrief_messages_created_at ON debrief_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_debrief_reframes_session_id ON debrief_reframes(session_id);

-- Row Level Security (RLS) Policies
ALTER TABLE debrief_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE debrief_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE debrief_reframes ENABLE ROW LEVEL SECURITY;

-- Policies for debrief_sessions
CREATE POLICY "Users can view their own debrief sessions"
  ON debrief_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own debrief sessions"
  ON debrief_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own debrief sessions"
  ON debrief_sessions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own debrief sessions"
  ON debrief_sessions FOR DELETE
  USING (auth.uid() = user_id);

-- Policies for debrief_messages
CREATE POLICY "Users can view messages in their sessions"
  ON debrief_messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM debrief_sessions
      WHERE debrief_sessions.id = debrief_messages.session_id
      AND debrief_sessions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create messages in their sessions"
  ON debrief_messages FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM debrief_sessions
      WHERE debrief_sessions.id = debrief_messages.session_id
      AND debrief_sessions.user_id = auth.uid()
    )
  );

-- Policies for debrief_reframes
CREATE POLICY "Users can view reframes in their sessions"
  ON debrief_reframes FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM debrief_sessions
      WHERE debrief_sessions.id = debrief_reframes.session_id
      AND debrief_sessions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create reframes in their sessions"
  ON debrief_reframes FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM debrief_sessions
      WHERE debrief_sessions.id = debrief_reframes.session_id
      AND debrief_sessions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete reframes in their sessions"
  ON debrief_reframes FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM debrief_sessions
      WHERE debrief_sessions.id = debrief_reframes.session_id
      AND debrief_sessions.user_id = auth.uid()
    )
  );

-- Comments for documentation
COMMENT ON TABLE debrief_sessions IS 'Stores match debriefing sessions with AI analysis';
COMMENT ON TABLE debrief_messages IS 'Stores chat messages between user and AI coach during debrief';
COMMENT ON TABLE debrief_reframes IS 'Stores thought reframes created during debrief sessions';
COMMENT ON COLUMN debrief_sessions.analysis IS 'JSON containing AI-generated match analysis with emotions, patterns, and key moments';
COMMENT ON COLUMN debrief_sessions.summary IS 'JSON containing session summary with insights, reframes, and focus areas';
