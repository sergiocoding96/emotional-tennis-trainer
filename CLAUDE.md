# CLAUDE.md - TennisAffect Think-Aloud Analysis

## Feature Overview

This worktree implements **Feature 2: Think-Aloud Analysis** for TennisAffect. It transcribes player verbalizations and analyzes attribution patterns using Whisper for speech-to-text and Gemini for cognitive analysis.

Based on **Weiner's Attribution Theory** - locus (internal/external), stability (stable/unstable), controllability (controllable/uncontrollable).

## Technology Stack

- **React 19** + TypeScript + Vite + Tailwind CSS v4
- **OpenAI Whisper** - Speech-to-text transcription
- **Web Audio API** - Audio recording
- **Gemini 1.5 Flash** - Attribution pattern analysis
- **PostgreSQL** (Docker) - Local development database

## Port Assignments

| Service | Port |
|---------|------|
| PostgreSQL | 5433 |
| PgAdmin | 5051 |
| Vite Dev | 5174 |

## Database Tables

- `players` - Player profiles
- `match_sessions` - Match recording sessions
- `match_points` - Individual points
- `think_aloud_recordings` - Audio segments
- `transcriptions` - Whisper transcription output
- `attribution_analyses` - Classified attribution patterns

## Attribution Patterns

| Pattern | Dimensions | Example | Impact |
|---------|------------|---------|--------|
| Adaptive | Internal-Unstable-Controllable | "I need to focus more" | Maintains motivation |
| Maladaptive | Internal-Stable-Uncontrollable | "I'm not talented" | Learned helplessness |
| Defensive | External-Stable-Uncontrollable | "Refs always favor them" | Avoids responsibility |

## Development Setup

```bash
docker-compose up -d    # Start PostgreSQL (port 5433)
npm install             # Install dependencies
npm run dev             # Start dev server (port 5174)
```

## Environment Variables (.env.local)

```
DB_HOST=localhost
DB_PORT=5433
DB_USER=tennisaffect
DB_PASSWORD=devpassword123
DB_NAME=tennisaffect_think_aloud
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

## Subagents to Use

- `sport-psych-research-collector` - Attribution model implementation
- `ai-integration-architect` - Whisper/Gemini integration
- `frontend-architect` - Audio recording UI
- `backend-service-architect` - Transcription API

## Integration Points

Provides to Fusion feature:
- `attribution_analyses.attribution_pattern`
- `attribution_analyses.predicted_emotion`
- `attribution_analyses.self_talk_type`
- `attribution_analyses.cognitive_distortions`
