# TODO - TennisAffect Body Language Analysis

## Feature Status: Setup Complete

### Infrastructure
- [x] Create worktree and branch
- [x] Create docker-compose.yml (PostgreSQL: 5432, PgAdmin: 5050)
- [x] Create db/init/01-schema.sql
- [x] Create feature-specific CLAUDE.md
- [x] Create feature-specific todo.md

### Development Setup
- [ ] Run `docker-compose up -d` to start PostgreSQL
- [ ] Verify database schema is created
- [ ] Create .env.local with Gemini API key
- [ ] Install MediaPipe dependencies

---

## Sprint 1: Core Video Capture

### Video Capture Component
- [ ] Create `src/features/body-language/components/VideoCapture.tsx`
- [ ] Implement WebRTC camera access
- [ ] Add video recording controls (start/stop)
- [ ] Implement video segment extraction (3 seconds post-point)
- [ ] Add video preview component

### File Storage
- [ ] Set up local video file storage
- [ ] Implement video upload service
- [ ] Create video file naming convention

---

## Sprint 2: MediaPipe Integration

### Pose Detection
- [ ] Install @mediapipe/pose package
- [ ] Create `src/features/body-language/services/mediaPipeService.ts`
- [ ] Implement pose landmark extraction (33 points)
- [ ] Create `src/features/body-language/hooks/useMediaPipe.ts`

### Pose Visualization
- [ ] Create `src/features/body-language/components/PoseOverlay.tsx`
- [ ] Draw skeleton overlay on video
- [ ] Show landmark confidence scores

### Pose Metrics
- [ ] Create `src/features/body-language/services/poseMetricsService.ts`
- [ ] Implement shoulder angle calculation
- [ ] Implement spine curvature calculation
- [ ] Implement head tilt calculation
- [ ] Implement gesture velocity calculation
- [ ] Store pose metrics in database

---

## Sprint 3: Gemini Analysis

### Gemini Integration
- [ ] Create `src/features/body-language/services/geminiBodyService.ts`
- [ ] Implement video frame extraction for Gemini
- [ ] Create dual-input prompt (video + pose metrics)
- [ ] Parse Gemini emotional assessment response

### Assessment Display
- [ ] Create `src/features/body-language/components/BodyLanguageCard.tsx`
- [ ] Display emotional state classification
- [ ] Display valence/intensity scores
- [ ] Show key visual cues identified

---

## Sprint 4: UI Polish

### Dashboard
- [ ] Create body language feature page
- [ ] Add session selection
- [ ] Add point-by-point navigation
- [ ] Create emotional timeline visualization

### Indicators
- [ ] Create `src/features/body-language/components/PostureIndicators.tsx`
- [ ] Visual gauges for posture metrics
- [ ] Confidence/tension/energy indicators

---

## Integration Points (For Fusion)

### API Endpoints to Implement
- [ ] `POST /api/v1/captures` - Upload video capture
- [ ] `POST /api/v1/captures/:id/analyze` - Trigger analysis
- [ ] `GET /api/v1/captures/:id` - Get capture with assessment
- [ ] `GET /api/v1/points/:id/body-language` - All assessments for point

### Data Export for Fusion
- [ ] Ensure assessments include: emotional_state, valence, intensity
- [ ] Add point_id foreign key for fusion joins

---

## Backlog
- [ ] Real-time pose detection during live video
- [ ] Batch processing for recorded matches
- [ ] Historical analysis dashboard
- [ ] Export to PDF/CSV

---

*Last updated: Feature worktree setup complete*
