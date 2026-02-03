-- TennisAffect Body Language Analysis Schema
-- Feature 1: Video processing with MediaPipe pose estimation + Gemini analysis

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Core tables (shared across features)
CREATE TABLE IF NOT EXISTS players (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    display_name TEXT NOT NULL,
    skill_level TEXT CHECK (skill_level IN ('beginner', 'intermediate', 'advanced', 'professional')),
    dominant_hand TEXT CHECK (dominant_hand IN ('left', 'right', 'ambidextrous')),
    optimal_arousal_min DECIMAL(3,1) DEFAULT 4.0,
    optimal_arousal_max DECIMAL(3,1) DEFAULT 7.0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS match_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID REFERENCES players(id) ON DELETE CASCADE,
    opponent_name TEXT,
    match_type TEXT CHECK (match_type IN ('practice', 'friendly', 'tournament', 'league')),
    surface TEXT CHECK (surface IN ('hard', 'clay', 'grass', 'indoor')),
    started_at TIMESTAMPTZ DEFAULT NOW(),
    ended_at TIMESTAMPTZ,
    final_score TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS match_points (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES match_sessions(id) ON DELETE CASCADE,
    point_number INTEGER NOT NULL,
    set_number INTEGER NOT NULL DEFAULT 1,
    game_number INTEGER NOT NULL DEFAULT 1,
    server TEXT CHECK (server IN ('player', 'opponent')),
    player_score TEXT NOT NULL,
    set_score TEXT,
    point_won BOOLEAN,
    importance_score DECIMAL(3,2),
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(session_id, point_number)
);

-- Body Language specific tables
CREATE TABLE IF NOT EXISTS body_language_captures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    point_id UUID REFERENCES match_points(id) ON DELETE CASCADE,
    video_url TEXT,
    capture_type TEXT CHECK (capture_type IN ('pre_point', 'during_point', 'post_point')),
    duration_seconds DECIMAL(5,2),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pose_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    capture_id UUID REFERENCES body_language_captures(id) ON DELETE CASCADE,
    timestamp_offset DECIMAL(6,3),
    -- Posture metrics
    shoulder_angle DECIMAL(5,2),
    spine_curvature DECIMAL(5,2),
    head_tilt DECIMAL(5,2),
    -- Movement metrics
    gesture_velocity DECIMAL(6,2),
    stillness_duration DECIMAL(5,2),
    -- Derived indicators
    confidence_indicator DECIMAL(3,2),
    tension_indicator DECIMAL(3,2),
    energy_indicator DECIMAL(3,2),
    -- Raw MediaPipe landmarks (33 points)
    raw_landmarks JSONB
);

CREATE TABLE IF NOT EXISTS body_language_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    capture_id UUID REFERENCES body_language_captures(id) ON DELETE CASCADE,
    -- Gemini analysis results
    emotional_state TEXT,
    valence DECIMAL(3,2) CHECK (valence >= -1.0 AND valence <= 1.0),
    intensity DECIMAL(3,2) CHECK (intensity >= 0.0 AND intensity <= 1.0),
    confidence_level DECIMAL(3,2),
    body_language_summary TEXT,
    key_indicators TEXT[],
    gemini_raw_response JSONB,
    processing_model TEXT DEFAULT 'gemini-1.5-flash',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_captures_point ON body_language_captures(point_id);
CREATE INDEX idx_pose_metrics_capture ON pose_metrics(capture_id);
CREATE INDEX idx_assessments_capture ON body_language_assessments(capture_id);
CREATE INDEX idx_match_points_session ON match_points(session_id);
