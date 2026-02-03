-- TennisAffect Arousal Integration Schema
-- Feature 3: Whoop wearable integration + personalized arousal zones

-- Enable UUID and crypto extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Core tables (shared across features)
CREATE TABLE IF NOT EXISTS players (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    display_name TEXT NOT NULL,
    skill_level TEXT CHECK (skill_level IN ('beginner', 'intermediate', 'advanced', 'professional')),
    -- IZOF (Individual Zones of Optimal Functioning) settings
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

-- Arousal Integration specific tables
CREATE TABLE IF NOT EXISTS whoop_connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID REFERENCES players(id) ON DELETE CASCADE,
    whoop_user_id TEXT,
    -- Encrypted tokens for security
    access_token_encrypted BYTEA,
    refresh_token_encrypted BYTEA,
    token_expires_at TIMESTAMPTZ,
    connected_at TIMESTAMPTZ DEFAULT NOW(),
    last_sync_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT TRUE,
    UNIQUE(player_id)
);

CREATE TABLE IF NOT EXISTS arousal_readings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES match_sessions(id) ON DELETE CASCADE,
    point_id UUID REFERENCES match_points(id),
    timestamp TIMESTAMPTZ NOT NULL,
    -- Raw physiological data from Whoop
    heart_rate INTEGER,
    heart_rate_variability DECIMAL(5,2),
    skin_conductance DECIMAL(5,2),
    respiratory_rate DECIMAL(4,1),
    strain DECIMAL(4,2),
    -- Computed arousal metrics
    arousal_level DECIMAL(3,1) CHECK (arousal_level >= 1.0 AND arousal_level <= 10.0),
    arousal_delta DECIMAL(4,2),  -- Change from baseline
    -- Zone classification based on player's IZOF
    zone_status TEXT CHECK (zone_status IN ('below_optimal', 'optimal', 'above_optimal')),
    zone_deviation DECIMAL(3,2),  -- How far from optimal center
    -- Recovery metrics
    recovery_rate DECIMAL(4,2),  -- How quickly HR returns to baseline
    data_source TEXT DEFAULT 'whoop'
);

CREATE TABLE IF NOT EXISTS arousal_baselines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID REFERENCES players(id) ON DELETE CASCADE,
    baseline_type TEXT CHECK (baseline_type IN ('resting', 'warm_up', 'match_start', 'post_match')),
    avg_heart_rate INTEGER,
    avg_hrv DECIMAL(5,2),
    avg_respiratory_rate DECIMAL(4,1),
    optimal_arousal_center DECIMAL(3,1),
    sample_count INTEGER,
    calculated_at TIMESTAMPTZ DEFAULT NOW(),
    valid_until TIMESTAMPTZ
);

-- Historical arousal patterns for personalization
CREATE TABLE IF NOT EXISTS arousal_performance_correlation (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID REFERENCES players(id) ON DELETE CASCADE,
    session_id UUID REFERENCES match_sessions(id) ON DELETE CASCADE,
    avg_arousal_level DECIMAL(3,1),
    arousal_variability DECIMAL(3,2),
    time_in_optimal_zone DECIMAL(5,2),  -- Percentage
    performance_outcome TEXT CHECK (performance_outcome IN ('win', 'loss', 'tie')),
    performance_rating DECIMAL(3,2),  -- Self-rated 0-1
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_arousal_session ON arousal_readings(session_id);
CREATE INDEX idx_arousal_point ON arousal_readings(point_id);
CREATE INDEX idx_arousal_timestamp ON arousal_readings(timestamp);
CREATE INDEX idx_baselines_player ON arousal_baselines(player_id);
CREATE INDEX idx_whoop_player ON whoop_connections(player_id);
