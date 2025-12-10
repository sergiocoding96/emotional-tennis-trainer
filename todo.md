# TODO - Emotional Tennis Trainer

## Current Sprint

### High Priority
- [x] Set up React project structure with Vite
- [x] Configure Tailwind CSS v4 (with @tailwindcss/postcss)
- [ ] Configure Supabase project and obtain credentials (user task - add to .env.local)
- [x] Create Supabase database schema (users, routines, scenarios, routine_logs)
- [x] Implement Supabase authentication (sign up, login, password reset)
- [x] Build protected routes for authenticated users

### UI Consistency (Tailwind Migration)
- [x] Migrate `Emotional Tennis Framework.jsx` to Tailwind CSS (src/features/framework/EmotionalFramework.tsx)
- [x] Move components to organized folder structure (src/features/)
- [x] Rename `remixed-e56df2f6.tsx` to `EmotionalRoutineBuilder.tsx` (src/features/routines/)
- [ ] Update AuthForm component to use Tailwind (currently uses inline styles)

### Choking Masterclass Integration (Next Sprint)
- [ ] Convert `choking-masterclass.jsx` to TypeScript (`ChokingMasterclass.tsx`)
- [ ] Move to `src/features/education/ChokingMasterclass.tsx`
- [ ] Add route `/education/choking` in App.tsx
- [ ] Add navigation link from main dashboard
- [ ] Verify all Tailwind classes work with v4 syntax

### Supabase Integration
- [x] Create Supabase client configuration
- [ ] Implement user profile management
- [ ] Connect Routine Builder to Supabase for saving routines
- [ ] Connect Routine Builder to Supabase for saving scenarios
- [ ] Add routine usage logging functionality

### Features
- [ ] Add user dashboard showing saved routines
- [ ] Add routine history/analytics view
- [ ] Add charts for emotion tracking (Recharts)
- [ ] Add export routines to PDF functionality

## Backlog
- [ ] Add unit tests for authentication flows
- [ ] Add integration tests for Supabase operations
- [ ] Performance optimization for emotion map rendering
- [ ] Mobile-responsive improvements
- [ ] Add offline support with service workers

## Completed
- [x] Initial codebase analysis
- [x] Create CLAUDE.md with project guidance
- [x] Create todo.md for task tracking
- [x] Set up Vite + React + TypeScript project structure
- [x] Configure TypeScript with proper paths and settings
- [x] Install and configure Tailwind CSS
- [x] Create database types (src/types/database.ts)
- [x] Create Supabase client (src/lib/supabase.ts)
- [x] Create AuthContext with hooks (src/context/AuthContext.tsx)
- [x] Create AuthForm component (src/components/auth/AuthForm.tsx)
- [x] Set up React Router with protected routes (src/App.tsx)
- [x] Update CLAUDE.md to reflect Tailwind as preferred styling
- [x] Fix Tailwind v4 PostCSS configuration (use @tailwindcss/postcss)
- [x] Fix Unicode escape sequences in EmotionalFramework.tsx (use emoji characters)
- [x] Update index.css for Tailwind v4 (@import "tailwindcss")

---
*Last updated: Fixed Tailwind v4 config, Unicode escapes. Ready to integrate choking masterclass.*
*Update this file after every completed task*
