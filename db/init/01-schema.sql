-- TennisAffect Multimodal Fusion Schema
-- Feature 5: Gemini Pro integration combining all 4 data streams

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Core tables (shared across features)
CREATE TABLE IF NOT EXISTS players (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    display_name TEXT NOT NULL,
    skill_level TEXT CHECK (skill_level IN ('beginner', 'intermediate', 'advanced', 'professional')),
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

-- Multimodal Fusion specific tables

-- Main fused emotional assessment
CREATE TABLE IF NOT EXISTS emotional_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    point_id UUID REFERENCES match_points(id) ON DELETE CASCADE,
    session_id UUID REFERENCES match_sessions(id) ON DELETE CASCADE,
    -- Input source references (from other features)
    body_language_assessment_id UUID,
    attribution_analysis_id UUID,
    arousal_reading_id UUID,
    score_context_id UUID,
    -- Fused emotional state (Circumplex Model)
    primary_emotion TEXT NOT NULL,
    secondary_emotion TEXT,
    valence DECIMAL(3,2) CHECK (valence >= -1.0 AND valence <= 1.0),
    arousal DECIMAL(3,1) CHECK (arousal >= 1.0 AND arousal <= 10.0),
    emotional_intensity DECIMAL(3,2) CHECK (emotional_intensity >= 0.0 AND emotional_intensity <= 1.0),
    -- Confidence and data quality
    overall_confidence DECIMAL(3,2),
    data_completeness DECIMAL(3,2),  -- How many streams had data (0.25-1.0)
    -- Source weights used for this assessment
    body_language_weight DECIMAL(3,2) DEFAULT 0.30,
    verbal_weight DECIMAL(3,2) DEFAULT 0.25,
    physiological_weight DECIMAL(3,2) DEFAULT 0.25,
    contextual_weight DECIMAL(3,2) DEFAULT 0.20,
    -- Congruence analysis
    stream_agreement TEXT CHECK (stream_agreement IN ('high', 'moderate', 'low', 'conflicting')),
    congruence_notes TEXT,
    -- Intervention recommendation
    intervention_needed BOOLEAN DEFAULT FALSE,
    intervention_type TEXT CHECK (intervention_type IN (
        'none',
        'arousal_regulation',    -- Breathing, relaxation
        'cognitive_reframe',     -- Attribution retraining
        'focus_redirect',        -- External focus cues
        'confidence_boost',      -- Positive self-talk
        'reset_routine'          -- Full emotional reset
    )),
    recommended_action TEXT,
    action_urgency TEXT CHECK (action_urgency IN ('none', 'low', 'medium', 'high', 'immediate')),
    -- Gemini Pro analysis
    fusion_summary TEXT,
    gemini_raw_response JSONB,
    processing_model TEXT DEFAULT 'gemini-1.5-pro',
    processing_time_ms INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Temporal emotional tracking
CREATE TABLE IF NOT EXISTS emotional_trajectories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES match_sessions(id) ON DELETE CASCADE,
    window_start TIMESTAMPTZ NOT NULL,
    window_end TIMESTAMPTZ NOT NULL,
    -- Aggregated metrics over window
    avg_valence DECIMAL(3,2),
    avg_arousal DECIMAL(3,1),
    valence_variance DECIMAL(4,3),
    arousal_variance DECIMAL(4,3),
    dominant_emotion TEXT,
    emotion_switches INTEGER,  -- Number of emotion changes in window
    emotional_stability DECIMAL(3,2),  -- 0.0 = volatile, 1.0 = stable
    trend_direction TEXT CHECK (trend_direction IN ('improving', 'stable', 'declining')),
    -- Performance correlation
    points_won_in_window INTEGER,
    points_lost_in_window INTEGER,
    win_rate DECIMAL(3,2),
    -- Window metadata
    points_in_window INTEGER,
    window_duration_minutes DECIMAL(5,2),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Intervention history
CREATE TABLE IF NOT EXISTS intervention_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assessment_id UUID REFERENCES emotional_assessments(id) ON DELETE CASCADE,
    session_id UUID REFERENCES match_sessions(id) ON DELETE CASCADE,
    intervention_type TEXT NOT NULL,
    intervention_message TEXT,
    delivered_at TIMESTAMPTZ DEFAULT NOW(),
    -- Effectiveness tracking
    acknowledged BOOLEAN,
    points_until_next_assessment INTEGER,
    effectiveness_rating DECIMAL(3,2),  -- Post-hoc rating
    notes TEXT
);

-- Pattern recognition
CREATE TABLE IF NOT EXISTS emotional_patterns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID REFERENCES players(id) ON DELETE CASCADE,
    pattern_name TEXT NOT NULL,
    pattern_type TEXT CHECK (pattern_type IN (
        'trigger',           -- Specific situation triggers specific emotion
        'cascade',           -- Emotion A leads to emotion B
        'recovery',          -- How player recovers from negative state
        'performance_link'   -- Emotion pattern linked to performance
    )),
    trigger_conditions JSONB,  -- e.g., {"pressure": "high", "streak": "losing"}
    emotional_sequence TEXT[],  -- e.g., ["frustration", "anger", "resignation"]
    frequency INTEGER DEFAULT 1,
    last_observed TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_assessments_point ON emotional_assessments(point_id);
CREATE INDEX idx_assessments_session ON emotional_assessments(session_id);
CREATE INDEX idx_assessments_emotion ON emotional_assessments(primary_emotion);
CREATE INDEX idx_assessments_intervention ON emotional_assessments(intervention_needed);
CREATE INDEX idx_trajectories_session ON emotional_trajectories(session_id);
CREATE INDEX idx_trajectories_window ON emotional_trajectories(window_start, window_end);
CREATE INDEX idx_interventions_session ON intervention_logs(session_id);
CREATE INDEX idx_patterns_player ON emotional_patterns(player_id);
