-- TennisAffect Think-Aloud Analysis Schema
-- Feature 2: Audio transcription with Whisper + attribution pattern analysis

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Core tables (shared across features)
CREATE TABLE IF NOT EXISTS players (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    display_name TEXT NOT NULL,
    skill_level TEXT CHECK (skill_level IN ('beginner', 'intermediate', 'advanced', 'professional')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS match_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID REFERENCES players(id) ON DELETE CASCADE,
    opponent_name TEXT,
    match_type TEXT CHECK (match_type IN ('practice', 'friendly', 'tournament', 'league')),
    started_at TIMESTAMPTZ DEFAULT NOW(),
    ended_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS match_points (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES match_sessions(id) ON DELETE CASCADE,
    point_number INTEGER NOT NULL,
    point_won BOOLEAN,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(session_id, point_number)
);

-- Think-Aloud specific tables
CREATE TABLE IF NOT EXISTS think_aloud_recordings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    point_id UUID REFERENCES match_points(id) ON DELETE CASCADE,
    audio_url TEXT,
    duration_seconds DECIMAL(5,2),
    recording_type TEXT CHECK (recording_type IN ('during_point', 'between_points', 'changeover')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS transcriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recording_id UUID REFERENCES think_aloud_recordings(id) ON DELETE CASCADE,
    text_content TEXT NOT NULL,
    whisper_model TEXT DEFAULT 'whisper-1',
    confidence_score DECIMAL(3,2),
    language TEXT DEFAULT 'en',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Attribution analysis based on Weiner's model
CREATE TABLE IF NOT EXISTS attribution_analyses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transcription_id UUID REFERENCES transcriptions(id) ON DELETE CASCADE,
    -- Attribution dimensions (Weiner's model)
    locus TEXT CHECK (locus IN ('internal', 'external')),
    stability TEXT CHECK (stability IN ('stable', 'unstable')),
    controllability TEXT CHECK (controllability IN ('controllable', 'uncontrollable')),
    -- Confidence scores for each dimension
    locus_confidence DECIMAL(3,2),
    stability_confidence DECIMAL(3,2),
    controllability_confidence DECIMAL(3,2),
    -- Combined attribution pattern
    attribution_pattern TEXT CHECK (attribution_pattern IN (
        'adaptive',      -- internal-unstable-controllable (e.g., "I didn't prepare enough")
        'maladaptive',   -- internal-stable-uncontrollable (e.g., "I'm not talented enough")
        'defensive',     -- external-stable-uncontrollable (e.g., "The ref always favors them")
        'neutral'        -- mixed or unclear pattern
    )),
    -- Self-talk classification
    self_talk_type TEXT CHECK (self_talk_type IN ('instructional', 'motivational', 'negative', 'neutral')),
    -- Cognitive distortions detected
    cognitive_distortions TEXT[],
    -- Derived emotional prediction
    predicted_emotion TEXT,
    emotional_trajectory TEXT CHECK (emotional_trajectory IN ('improving', 'stable', 'declining')),
    key_phrases TEXT[],
    analysis_summary TEXT,
    gemini_raw_response JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_recordings_point ON think_aloud_recordings(point_id);
CREATE INDEX idx_transcriptions_recording ON transcriptions(recording_id);
CREATE INDEX idx_attribution_transcription ON attribution_analyses(transcription_id);
CREATE INDEX idx_attribution_pattern ON attribution_analyses(attribution_pattern);
