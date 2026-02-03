# CLAUDE.md - TennisAffect Arousal Integration

## Feature Overview

This worktree implements **Feature 3: Arousal Integration** for TennisAffect. It integrates Whoop wearable data to track physiological arousal and map it to personalized optimal zones based on IZOF.

Based on **IZOF (Individual Zones of Optimal Functioning)** - optimal performance occurs within a personalized arousal range.

## Technology Stack

- **React 19** + TypeScript + Vite + Tailwind CSS v4
- **Whoop API** - OAuth 2.0 integration for wearable data
- **Chart.js / Recharts** - Arousal visualization
- **PostgreSQL** (Docker) - Local development database

## Port Assignments

| Service | Port |
|---------|------|
| PostgreSQL | 5434 |
| PgAdmin | 5052 |
| Vite Dev | 5175 |

## Database Tables

- `players` - Player profiles with optimal_arousal_min/max
- `match_sessions` - Match recording sessions
- `match_points` - Individual points
- `whoop_connections` - OAuth tokens (encrypted)
- `arousal_readings` - HR/HRV/strain per timestamp
- `arousal_baselines` - Resting/warmup/match baselines
- `arousal_performance_correlation` - Historical arousal-performance data

## Zone Classification

| Zone | Arousal Level | Action |
|------|---------------|--------|
| Below Optimal | < player.optimal_arousal_min | Activation techniques |
| Optimal | Within range | Maintain |
| Above Optimal | > player.optimal_arousal_max | Calming techniques |

## Development Setup

```bash
docker-compose up -d    # Start PostgreSQL (port 5434)
npm install             # Install dependencies
npm run dev             # Start dev server (port 5175)
```

## Environment Variables (.env.local)

```
DB_HOST=localhost
DB_PORT=5434
DB_USER=tennisaffect
DB_PASSWORD=devpassword123
DB_NAME=tennisaffect_arousal
WHOOP_CLIENT_ID=your_whoop_client_id
WHOOP_CLIENT_SECRET=your_whoop_client_secret
TOKEN_ENCRYPTION_KEY=your_32_byte_encryption_key
```

## Subagents to Use

- `security-guardian` - OAuth implementation, token encryption
- `backend-service-architect` - Whoop API client
- `frontend-architect` - Arousal visualizations
- `database-architect` - Schema design

## Integration Points

Provides to Fusion feature:
- `arousal_readings.arousal_level`
- `arousal_readings.zone_status`
- `arousal_readings.zone_deviation`
