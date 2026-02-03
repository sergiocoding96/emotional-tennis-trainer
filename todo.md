# TODO - TennisAffect Arousal Integration

## Feature Status: Setup Complete

### Infrastructure
- [x] Create worktree and branch
- [x] Create docker-compose.yml (PostgreSQL: 5434, PgAdmin: 5052)
- [x] Create db/init/01-schema.sql
- [x] Create feature-specific CLAUDE.md
- [x] Create feature-specific todo.md

### Development Setup
- [ ] Run `docker-compose up -d` to start PostgreSQL
- [ ] Verify database schema is created
- [ ] Register for Whoop Developer API
- [ ] Create .env.local with Whoop credentials
- [ ] Generate token encryption key

---

## Sprint 1: Whoop OAuth (Use security-guardian)
- [ ] Create whoopService.ts with OAuth 2.0 flow
- [ ] Implement secure token storage (encrypted)
- [ ] Create WhoopConnect.tsx UI

## Sprint 2: Data Sync
- [ ] Fetch HR/HRV/strain from Whoop API
- [ ] Store readings in arousal_readings table
- [ ] Link to match sessions and points

## Sprint 3: Arousal Calculation
- [ ] Create BaselineCalibration.tsx
- [ ] Create arousalCalculator.ts (HR/HRV → 1-10 scale)
- [ ] Create zoneService.ts (IZOF zones)

## Sprint 4: Visualization
- [ ] Create ArousalGauge.tsx (circular gauge)
- [ ] Create ZoneIndicator.tsx
- [ ] Create HRVChart.tsx

---

*Last updated: Feature worktree setup complete*
