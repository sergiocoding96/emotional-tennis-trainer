# CLAUDE.md - TennisAffect Multimodal Fusion

## Feature Overview

This worktree implements **Feature 5: Multimodal Fusion** for TennisAffect. It integrates all 4 data streams (body language, verbal, physiological, contextual) using Gemini 1.5 Pro for multimodal reasoning and intervention recommendations.

The core innovation of TennisAffect - combining multiple data sources enables inferences impossible from any single stream.

## Technology Stack

- **React 19** + TypeScript + Vite + Tailwind CSS v4
- **Gemini 1.5 Pro** - Multimodal reasoning and fusion
- **PostgreSQL** (Docker) - Local development database

## Port Assignments

| Service | Port |
|---------|------|
| PostgreSQL | 5436 |
| PgAdmin | 5054 |
| Vite Dev | 5177 |

## Database Tables

- `players` - Player profiles
- `match_sessions` - Match recording sessions
- `match_points` - Individual points
- `emotional_assessments` - Fused emotional state
- `emotional_trajectories` - Temporal patterns
- `intervention_logs` - Intervention history
- `emotional_patterns` - Recognized patterns

## Data Stream Weights

| Stream | Default Weight | Notes |
|--------|---------------|-------|
| Body Language | 0.30 | Visual emotional expression |
| Verbal | 0.25 | Cognitive/attribution content |
| Physiological | 0.25 | Arousal level |
| Contextual | 0.20 | Situational weighting |

## Intervention Types

| Type | Trigger | Action |
|------|---------|--------|
| Arousal Regulation | Above/below optimal zone | Breathing techniques |
| Cognitive Reframe | Maladaptive attribution | Attribution retraining |
| Focus Redirect | Ego-threatened state | External focus cues |
| Confidence Boost | Declining trajectory | Positive self-talk |
| Reset Routine | Multiple negative indicators | Full emotional reset |

## Development Setup

```bash
docker-compose up -d    # Start PostgreSQL (port 5436)
npm install             # Install dependencies
npm run dev             # Start dev server (port 5177)
```

## Environment Variables (.env.local)

```
DB_HOST=localhost
DB_PORT=5436
DB_USER=tennisaffect
DB_PASSWORD=devpassword123
DB_NAME=tennisaffect_fusion
VITE_GEMINI_API_KEY=your_gemini_api_key
```

## Subagents to Use

- `ai-integration-architect` - Gemini Pro integration
- `sports-psychology-coach` - Intervention logic validation
- `frontend-architect` - Dashboard UI
- `database-architect` - Schema design

## Gemini Pro Fusion Prompt

```
You are analyzing a tennis player's emotional state using 4 data streams.

BODY LANGUAGE: ${bodyLanguageAssessment}
VERBAL CONTENT: ${attributionAnalysis}
PHYSIOLOGICAL: ${arousalReading}
CONTEXT: ${scoreContext}

Synthesize these inputs:
1. Primary emotional state
2. Valence (-1 to 1) and arousal (1-10)
3. Stream congruence analysis
4. Intervention recommendation if needed
5. Brief summary for the coach
```

## Congruence Analysis

| Agreement | Description | Action |
|-----------|-------------|--------|
| High | All streams align | High confidence assessment |
| Moderate | 3 of 4 align | Note dissenting stream |
| Low | 2 of 4 align | Flag for review |
| Conflicting | Contradictory signals | Investigate (possible regulation) |
