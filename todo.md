# TODO - TennisAffect Think-Aloud Analysis

## Feature Status: Setup Complete

### Infrastructure
- [x] Create worktree and branch
- [x] Create docker-compose.yml (PostgreSQL: 5433, PgAdmin: 5051)
- [x] Create db/init/01-schema.sql
- [x] Create feature-specific CLAUDE.md
- [x] Create feature-specific todo.md

### Development Setup
- [ ] Run `docker-compose up -d` to start PostgreSQL
- [ ] Verify database schema is created
- [ ] Create .env.local with OpenAI and Gemini API keys

---

## Sprint 1: Audio Recording
- [ ] Create AudioRecorder.tsx with Web Audio API
- [ ] Implement recording controls (start/stop/pause)
- [ ] Set up local audio file storage

## Sprint 2: Whisper Transcription
- [ ] Create whisperService.ts for OpenAI Whisper API
- [ ] Create TranscriptViewer.tsx for display
- [ ] Store transcriptions in database

## Sprint 3: Attribution Analysis (Use sport-psych-research-collector)
- [ ] Create attributionService.ts with Weiner's model
- [ ] Classify locus/stability/controllability
- [ ] Detect cognitive distortions
- [ ] Create AttributionDisplay.tsx

## Sprint 4: UI Polish
- [ ] Phrase highlighting
- [ ] Suggested reframes for maladaptive patterns
- [ ] Self-talk classification display

---

*Last updated: Feature worktree setup complete*
