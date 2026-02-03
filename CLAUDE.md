# CLAUDE.md - TennisAffect Score Context

## Feature Overview

This worktree implements **Feature 4: Score Context Integration** for TennisAffect. It tracks match context and calculates point importance scores to weight emotional responses appropriately.

A point at 30-40 when receiving carries different weight than a point at 40-0 when serving.

## Technology Stack

- **React 19** + TypeScript + Vite + Tailwind CSS v4
- **Dartfish API** (optional) - Match data import
- **PostgreSQL** (Docker) - Local development database

## Port Assignments

| Service | Port |
|---------|------|
| PostgreSQL | 5435 |
| PgAdmin | 5053 |
| Vite Dev | 5176 |

## Database Tables

- `players` - Player profiles
- `match_sessions` - Match metadata (format, surface, etc.)
- `match_points` - Detailed point tracking
- `score_contexts` - Pressure/momentum analysis
- `game_summaries` - Game-level aggregations
- `set_summaries` - Set-level aggregations

## Pressure Categories

| Category | Situations |
|----------|------------|
| Low | Routine points, comfortable lead |
| Medium | Close game, serving to hold |
| High | Break point, set point |
| Critical | Match point, facing match point |

## Momentum Tracking

- `player_momentum` - Won 3+ of last 5 points
- `neutral` - Even split
- `opponent_momentum` - Lost 3+ of last 5 points

## Development Setup

```bash
docker-compose up -d    # Start PostgreSQL (port 5435)
npm install             # Install dependencies
npm run dev             # Start dev server (port 5176)
```

## Environment Variables (.env.local)

```
DB_HOST=localhost
DB_PORT=5435
DB_USER=tennisaffect
DB_PASSWORD=devpassword123
DB_NAME=tennisaffect_score_context
DARTFISH_API_KEY=your_dartfish_api_key  # Optional
```

## Subagents to Use

- `database-architect` - Schema design
- `frontend-architect` - Score input UI
- `backend-service-architect` - Importance calculation API

## Integration Points

Provides to Fusion feature:
- `score_contexts.pressure_category`
- `score_contexts.momentum_indicator`
- `score_contexts.composite_importance`
