# TODO - TennisAffect Score Context

## Feature Status: Setup Complete

### Infrastructure
- [x] Create worktree and branch
- [x] Create docker-compose.yml (PostgreSQL: 5435, PgAdmin: 5053)
- [x] Create db/init/01-schema.sql
- [x] Create feature-specific CLAUDE.md
- [x] Create feature-specific todo.md

### Development Setup
- [ ] Run `docker-compose up -d` to start PostgreSQL
- [ ] Verify database schema is created
- [ ] Create .env.local

---

## Sprint 1: Score Input UI
- [ ] Create ScoreInput.tsx for manual entry
- [ ] Implement tennis scoring logic
- [ ] Create useScoreTracking.ts hook

## Sprint 2: Importance Calculation
- [ ] Create importanceCalculator.ts
- [ ] Game/set/match importance scores
- [ ] Pressure classification (low/medium/high/critical)

## Sprint 3: Momentum Tracking
- [ ] Create momentumService.ts
- [ ] Track last 5 points
- [ ] Detect streaks and momentum shifts

## Sprint 4: Visualization
- [ ] Create MatchTimeline.tsx
- [ ] Create ImportanceDisplay.tsx
- [ ] Create MomentumTracker.tsx

---

*Last updated: Feature worktree setup complete*
