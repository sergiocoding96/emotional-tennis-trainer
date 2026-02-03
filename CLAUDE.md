# CLAUDE.md - TennisAffect Body Language Analysis

## Feature Overview

This worktree implements **Feature 1: Body Language Analysis** for TennisAffect. It processes match video to extract emotional state information using MediaPipe pose estimation combined with Gemini 1.5 Flash for visual analysis.

Based on the **KIT Tennis Study (Jekauc et al., 2024)** which achieved 68.9% accuracy in classifying emotional states from body language.

## Technology Stack

- **React 19** + TypeScript + Vite + Tailwind CSS v4
- **MediaPipe Pose** - 33 3D landmark detection
- **WebRTC** - Video capture from camera
- **Gemini 1.5 Flash** - Video + pose dual-input analysis
- **PostgreSQL** (Docker) - Local development database

## Port Assignments

| Service | Port |
|---------|------|
| PostgreSQL | 5432 |
| PgAdmin | 5050 |
| Vite Dev | 5173 |

## Database Tables

- `players` - Player profiles with optimal arousal settings
- `match_sessions` - Match recording sessions
- `match_points` - Individual points with outcomes
- `body_language_captures` - Video segments (pre/during/post point)
- `pose_metrics` - MediaPipe landmark data per frame
- `body_language_assessments` - Gemini analysis results

## Feature Architecture

```
src/features/body-language/
├── components/
│   ├── VideoCapture.tsx         # WebRTC video capture
│   ├── PoseOverlay.tsx          # MediaPipe landmark visualization
│   ├── BodyLanguageCard.tsx     # Assessment result display
│   └── PostureIndicators.tsx    # Visual metrics gauges
├── hooks/
│   ├── useMediaPipe.ts          # MediaPipe pose detection hook
│   ├── useVideoCapture.ts       # WebRTC stream management
│   └── useBodyLanguageAnalysis.ts # Full analysis pipeline
├── services/
│   ├── mediaPipeService.ts      # MediaPipe integration
│   ├── geminiBodyService.ts     # Gemini video analysis
│   └── poseMetricsService.ts    # Pose metric calculations
└── types/
    └── bodyLanguage.ts          # TypeScript interfaces
```

## Development Setup

```bash
docker-compose up -d    # Start PostgreSQL
npm install             # Install dependencies
npm run dev             # Start dev server (port 5173)
```

## Environment Variables (.env.local)

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=tennisaffect
DB_PASSWORD=devpassword123
DB_NAME=tennisaffect_body_language
VITE_GEMINI_API_KEY=your_gemini_api_key
```

## Subagents to Use

- `ai-integration-architect` - MediaPipe/Gemini integration
- `frontend-architect` - Video capture UI
- `backend-service-architect` - Pose metrics API
- `database-architect` - Schema modifications
- `code-reviewer` - Code review

## Integration Points

Provides to Fusion feature:
- `body_language_assessments.emotional_state`
- `body_language_assessments.valence`
- `body_language_assessments.intensity`
