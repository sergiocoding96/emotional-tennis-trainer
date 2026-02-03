-- TennisAffect Score Context Schema
-- Feature 4: Match context tracking + point importance calculation

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
    surface TEXT CHECK (surface IN ('hard', 'clay', 'grass', 'indoor')),
    match_format TEXT CHECK (match_format IN ('best_of_1', 'best_of_3', 'best_of_5')),
    tiebreak_format TEXT CHECK (tiebreak_format IN ('standard_7', 'super_10', 'match_tiebreak')),
    started_at TIMESTAMPTZ DEFAULT NOW(),
    ended_at TIMESTAMPTZ,
    final_score TEXT,
    winner TEXT CHECK (winner IN ('player', 'opponent')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Detailed point tracking
CREATE TABLE IF NOT EXISTS match_points (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES match_sessions(id) ON DELETE CASCADE,
    point_number INTEGER NOT NULL,
    set_number INTEGER NOT NULL DEFAULT 1,
    game_number INTEGER NOT NULL DEFAULT 1,
    -- Score state
    server TEXT CHECK (server IN ('player', 'opponent')),
    points_player INTEGER NOT NULL DEFAULT 0,  -- 0, 15, 30, 40, AD
    points_opponent INTEGER NOT NULL DEFAULT 0,
    player_score_display TEXT NOT NULL,  -- "40-30", "deuce", "ad-in"
    -- Set/game context
    games_player INTEGER NOT NULL DEFAULT 0,
    games_opponent INTEGER NOT NULL DEFAULT 0,
    sets_player INTEGER NOT NULL DEFAULT 0,
    sets_opponent INTEGER NOT NULL DEFAULT 0,
    is_tiebreak BOOLEAN DEFAULT FALSE,
    -- Point outcome
    point_won BOOLEAN,
    point_type TEXT CHECK (point_type IN ('ace', 'winner', 'forced_error', 'unforced_error', 'double_fault')),
    rally_length INTEGER,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(session_id, point_number)
);

-- Score context analysis
CREATE TABLE IF NOT EXISTS score_contexts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    point_id UUID REFERENCES match_points(id) ON DELETE CASCADE,
    -- Pressure classification
    pressure_category TEXT CHECK (pressure_category IN ('low', 'medium', 'high', 'critical')),
    -- Special situations
    is_break_point BOOLEAN DEFAULT FALSE,
    is_set_point BOOLEAN DEFAULT FALSE,
    is_match_point BOOLEAN DEFAULT FALSE,
    is_game_point BOOLEAN DEFAULT FALSE,
    -- Point type
    point_situation TEXT CHECK (point_situation IN (
        'routine',           -- Low stakes point
        'serving_to_hold',   -- Game point on serve
        'serving_to_break',  -- Break point for server (opponent's game)
        'defending_break',   -- Facing break point
        'set_point_for',     -- Set point for player
        'set_point_against', -- Facing set point
        'match_point_for',   -- Match point for player
        'match_point_against', -- Facing match point
        'tiebreak'           -- Any tiebreak point
    )),
    -- Momentum analysis
    momentum_indicator TEXT CHECK (momentum_indicator IN ('player_momentum', 'neutral', 'opponent_momentum')),
    momentum_score DECIMAL(3,2) CHECK (momentum_score >= -1.0 AND momentum_score <= 1.0),  -- -1 = opponent, 0 = neutral, 1 = player
    -- Recent form (last 5 points)
    recent_points_won INTEGER DEFAULT 0,
    streak_type TEXT CHECK (streak_type IN ('winning', 'losing', 'alternating', 'none')),
    streak_length INTEGER DEFAULT 0,
    -- Match phase
    match_phase TEXT CHECK (match_phase IN ('early', 'middle', 'late', 'decisive')),
    -- Importance calculations (0.0 to 1.0)
    game_importance DECIMAL(3,2),
    set_importance DECIMAL(3,2),
    match_importance DECIMAL(3,2),
    composite_importance DECIMAL(3,2),  -- Weighted combination
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(point_id)
);

-- Game summary for quick lookups
CREATE TABLE IF NOT EXISTS game_summaries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES match_sessions(id) ON DELETE CASCADE,
    set_number INTEGER NOT NULL,
    game_number INTEGER NOT NULL,
    server TEXT CHECK (server IN ('player', 'opponent')),
    winner TEXT CHECK (winner IN ('player', 'opponent')),
    was_break BOOLEAN DEFAULT FALSE,
    points_played INTEGER,
    deuce_count INTEGER DEFAULT 0,
    break_points_faced INTEGER DEFAULT 0,
    break_points_saved INTEGER DEFAULT 0,
    UNIQUE(session_id, set_number, game_number)
);

-- Set summary
CREATE TABLE IF NOT EXISTS set_summaries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES match_sessions(id) ON DELETE CASCADE,
    set_number INTEGER NOT NULL,
    games_player INTEGER NOT NULL,
    games_opponent INTEGER NOT NULL,
    winner TEXT CHECK (winner IN ('player', 'opponent')),
    was_tiebreak BOOLEAN DEFAULT FALSE,
    tiebreak_score TEXT,
    UNIQUE(session_id, set_number)
);

-- Indexes
CREATE INDEX idx_points_session ON match_points(session_id);
CREATE INDEX idx_points_set_game ON match_points(session_id, set_number, game_number);
CREATE INDEX idx_context_point ON score_contexts(point_id);
CREATE INDEX idx_context_pressure ON score_contexts(pressure_category);
CREATE INDEX idx_context_importance ON score_contexts(composite_importance);
CREATE INDEX idx_games_session ON game_summaries(session_id);
CREATE INDEX idx_sets_session ON set_summaries(session_id);
