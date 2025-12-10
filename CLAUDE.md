# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

An emotional intelligence tennis training application that helps players understand and manage their emotions during matches. The app includes educational materials about tennis psychology and a routines builder tool with user management via Supabase.

## Technology Stack

- **React 19** with TypeScript (functional components with hooks)
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework (PREFERRED STYLING)
- **React Router v7** - Client-side routing
- **Supabase** - Backend (authentication, database, user management)
- **Chart libraries** - Recharts or Chart.js for data visualization (future)

## Architecture

### Project Structure
```
src/
├── components/        # Shared UI components
│   └── auth/         # Authentication components
├── context/          # React context providers
├── features/         # Feature-based modules
│   ├── education/    # Educational content (choking masterclass, etc.)
│   ├── framework/    # Emotional tennis framework
│   └── routines/     # Routine builder
├── lib/              # Utilities (supabase client)
└── types/            # TypeScript type definitions
```

### Main Components

1. **choking-masterclass.jsx** - Educational module on "choking" (REFERENCE UI STYLE)
   - Tab-based navigation: Recognition, Anxiety vs Choking, Science, Risk Moments, Emergency Reset, Prevention
   - Dark theme with glass morphism effects
   - **USE THIS STYLING APPROACH**
   - **TODO**: Convert to TypeScript and move to `src/features/education/ChokingMasterclass.tsx`

2. **EmotionalRoutineBuilder.tsx** (`src/features/routines/`) - Routine Builder tool (REFERENCE UI STYLE)
   - Interactive tool for mapping emotional triggers and creating reset routines
   - State management for scenarios and routines per emotion
   - **USE THIS STYLING APPROACH**

3. **EmotionalFramework.tsx** (`src/features/framework/`) - Core educational dashboard ✅ MIGRATED
   - Six emotion profiles (disappointment, frustration, anger, anxiety, calmness, excitement)
   - Multiple views: Overview, Circumplex Map, Timeline, Energy/Arousal, Controllability, Ego/Focus
   - Uses Tailwind CSS with dark theme matching other components

## UI Consistency Guidelines

**ALWAYS use Tailwind CSS matching `choking-masterclass.jsx` and `remixed-e56df2f6.tsx` patterns:**

### Color Palette
- **Background**: `bg-slate-900`, `bg-slate-800/40`, gradients with slate tones
- **Cards**: Glass morphism with `backdrop-blur-xl`, `bg-slate-900/80`, `border-slate-700/50`
- **Text**: `text-white`, `text-slate-200`, `text-slate-400`, `text-slate-500`
- **Accents**: Rose/orange for danger, emerald/green for success, violet for anxiety, amber for frustration

### Common Patterns
```jsx
// Page container
<div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">

// Glass card
<div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50">

// Glow effect on hover
<div className="group relative">
  <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-500 to-orange-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition" />
  <div className="relative bg-slate-900/80 ...">
```

### Typography
- Font: System fonts (configured in tailwind.config.js)
- Headings: `text-4xl font-light`, `text-2xl font-semibold`
- Body: `text-lg text-slate-300 leading-relaxed`
- Labels: `text-sm uppercase tracking-wider text-slate-500`

## Key Data Structures

The emotion profiles follow a consistent schema across components:
```typescript
interface EmotionProfile {
  name: string
  icon: string // emoji
  color: string // Tailwind color name (slate, amber, rose, violet, blue, emerald)
  gradient: string // Tailwind gradient classes
  arousal: number // 1-10
  valence?: number // 1-10
  timeline: 'Past' | 'Present' | 'Future' | string
  ego: string
  controllability?: string
  danger: 'Low' | 'Moderate' | 'High' | 'Critical'
  description: string
}
```

## Supabase Integration

### Database Schema
Tables are defined with Row Level Security (RLS):
- **user_profiles** - User display names and skill levels
- **routines** - User-created emotional reset routines (steps as TEXT[])
- **scenarios** - User-defined trigger scenarios linked to emotions
- **routine_logs** - Historical record of routine usage with effectiveness ratings

### Environment Variables
Create `.env.local` with:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Type Safety
Database types are in `src/types/database.ts` - use with Supabase client for full TypeScript support.

## Domain Context

The app is grounded in sports psychology research:
- **Attribution Theory** - how athletes explain outcomes
- **Circumplex Model** - mapping emotions on arousal/valence axes
- **IZOF (Individual Zones of Optimal Functioning)** - optimal arousal levels
- **Achievement Goal Theory** - task vs ego orientation

## Tailwind CSS v4 Configuration

This project uses **Tailwind CSS v4** which has different configuration than v3:

### PostCSS Configuration (`postcss.config.js`)
```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},  // NOT 'tailwindcss'
  },
}
```

### CSS Import (`src/index.css`)
```css
@import "tailwindcss";
@config "../tailwind.config.js";
```

### Important Notes
- Use actual emoji characters in strings, not Unicode escapes (`😞` not `\u{1F61E}`)
- Unicode escapes only work in template literals (backticks)

## Development Workflow

### Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Subagent Usage
**ALWAYS use specialized subagents when possible:**
- `database-architect` - For Supabase schema design and queries
- `frontend-architect` - For UI component architecture and state management
- `security-guardian` - For authentication and data protection
- `code-reviewer` - After completing significant code changes
- `test-strategist` - For testing authentication and data flows
- `documentation-specialist` - When updating docs or creating guides

### Task Management
1. **Before starting work**: Read `todo.md` to understand current tasks
2. **During work**: Update `todo.md` with progress and new discoveries
3. **After completing tasks**:
   - Mark completed items in `todo.md`
   - Update `CLAUDE.md` if architecture changes
   - Add new tasks discovered during implementation

### File Updates Required After Every Task
- [ ] `todo.md` - Update task status
- [ ] `CLAUDE.md` - Update if architecture/patterns change
