# Spanish Vocabulary App - Project Summary

## 1. Product Snapshot
This is a full-stack Spanish learning web app focused on daily vocabulary practice, lightweight progress tracking, and practice modes built on top of top 1000 most common word database.

The app currently works as a single-user development setup (using a test user ID in backend env vars, but will use supabase google oauth in the future) and already includes:
- Daily word study flow
- Word status updates (new/learning/known)
- Progress dashboard
- Listening practice mode
- Flashcard practice mode
- Practice attempt recording to update learning state

## 2. Current Features (Implemented)

### Daily Words (Home page)
- Route: `/`
- Frontend fetches `GET /api/words/daily`
- Shows one word card at a time with next/previous navigation
- Word payload includes Spanish, English, POS, audio, examples, and user status
- User can mark word status from UI
- Status update sent via `POST /api/words/:word_id/status`

Backend behavior for daily words:
- Deterministic per-user, per-date selection using `daily_words` table
- If daily set does not exist, selects approximately:
  - 1 known word
  - 4 non-known words
- Fills remaining slots if needed to always return 5 words
- Stores selected IDs in `daily_words` so refreshes return same set on same day
- Filters out rows where `english` is empty array

### Word Status Tracking
- Endpoint validates:
  - valid numeric `word_id`
  - status in `[known, learning, new]`
- Uses upsert on `user_words`
- Updates `last_seen`
- Returns success message for UI confirmation

### Progress Page
- Route: `/progress`
- Frontend fetches `GET /api/progress`
- Shows:
  - streak (currently placeholder/null fallback to 0)
  - known-word percentage-like value (`wordKnown` currently sourced from known count)
  - XP (currently placeholder/null fallback to 0)
  - achievement cards from backend payload

Note:
- Weekly activity and progress bar sections are currently mostly UI/mock values.

### Practice Mode Hub
- Route: `/practice`
- Practice selection cards link to:
  - `/practice/listening`
  - `/practice/flashcard`

### Listening Practice
- Route: `/practice/listening`
- Fetches `GET /api/practice/listening`
- Backend chooses the oldest-seen eligible user word with non-null audio
- Returns:
  - `wordMetadata`
  - `correctChoice`
  - 2 generated wrong choices (spelling perturbations)
- Frontend:
  - auto-plays audio when question loads
  - supports replay button
  - shows immediate correct/incorrect feedback
  - tracks local session score and total
  - has summary screen at finish

### Flashcard Practice
- Route: `/practice/flashcard`
- Fetches `GET /api/practice/flashcard`
- Backend picks oldest-seen user word
- Card supports front/back flip interaction
- Includes audio playback button and long-content scroll handling on back content area
- User marks correct/incorrect via buttons shown after flip
- Sends `POST /api/practice/attempt` with:
  - `wordId`
  - `practiceMode: flashcard`
  - `outcome: correct|incorrect`

### Practice Attempt Recording
- Endpoint: `POST /api/practice/attempt`
- Logic:
  - correct -> status becomes `known`
  - incorrect while known -> status becomes `learning`
  - otherwise keeps current status
- Updates `last_seen`

### Not Found Handling
- Frontend includes `NotFound` page for unmatched routes
- Backend returns JSON 404 for unknown API endpoints

## 3. Architecture

### High-Level Structure
- Monorepo style workspace with two apps:
  - `frontend/` (React + Vite)
  - `backend/` (Express API)
- Root script runs both concurrently for local development.

### Frontend Architecture
- React 19 with route-based pages (`react-router-dom`)
- Pages:
  - Home
  - Progress
  - Table (placeholder)
  - Practice hub
  - Listening practice
  - Flashcard practice
  - Not Found
- Component-driven UI (`WordCard`, `Flashcard`, `PracticeSummary`, badges, layout/header)
- Data fetching is currently done directly in page components using `fetch`

### Backend Architecture
- Express 5 REST API with modular routers and controllers
- API namespace: `/api`
- Main route groups:
  - Daily words/status/progress
  - Practice endpoints
- Controllers are thin; business logic moved into `services/`
- Data access centralized through Supabase client

### Data Layer / Persistence
- Supabase PostgreSQL used as main database
- Core tables used by app logic:
  - `words`
  - `users`
  - `user_words`
  - `daily_words`
  - `daily_activity` (present in plan/schema work, not yet fully used)

## 4. Tech Stack

### Frontend
- React 19
- React Router DOM 7
- Vite (rolldown-vite override)
- Tailwind CSS v4 integration via `@tailwindcss/vite`
- Heroicons for UI icons
- ESLint for linting

### Backend
- Node.js (ES modules)
- Express 5
- Supabase JS client
- CORS + JSON middleware
- dotenv for env config

### Data/ETL
- CSV parsing via `csv-parse`
- One-time scripts for ingest and enrichment
- Merriam-Webster Spanish Dictionary API for enrichment

### Tooling
- Root dev orchestration with `concurrently`

## 5. Data Pipeline You Built
- CSV import script inserts/upserts the 1000-word list into `words`
- Enrichment script:
  - fetches Merriam-Webster Spanish Dictionary entries for words lacking english data
  - normalizes accents/query term
  - skips very short words (<=2 chars) to avoid noisy/ambiguous results
  - extracts and normalizes english definitions, POS, audio URL, example sentences, conjugations
  - updates rows safely with logging
- Helper mapping (`injectWordsTable`) converts raw API shape into DB-ready payload

## 6. Timeline of Edits

### Foundation (Nov 2025)
- Planned execution approach
- Created initial project/backend structure
- Designed and created DB tables (`words`, `users`, `user_words`)
- Built first CSV population workflow

### Data Ingestion + Enrichment (Dec 2025)
- Improved API population flow
- Handled short-word edge cases and noisy API matches
- Built `getDailyWords` for initial daily endpoint

### Core App and Daily Flow (Jan 2026)
- Implemented status update backend and frontend wiring
- Built frontend Home flow and WordCard browsing
- Refactored daily logic so user gets same words on same date
- Added progress backend and progress page frontend
- Added practice routing structure

### Practice Modes (Jan 2026)
- Implemented listening backend flow and frontend UI
- Added autoplay audio behavior in listening mode
- Added attempt recording structure
- Built practice summary component

### UI/Platform Refinements (Feb-Mar 2026)
- Migrated Tailwind to v4
- Built flashcard practice API + UI and iteration on card behavior
- Continued refinement of flashcard interactions, scrolling, and controls

## 7. Current Known Gaps / In-Progress Areas
- Table page is still placeholder (`/all`)
- `getWordsTable` service file exists but is empty
- Progress metrics are partially placeholder (streak/xp logic not fully wired)
- `updateStreak` service is scaffolded but not implemented
- Listening attempt persistence is commented out in frontend
- Single test-user flow is used (no production auth flow yet)

## 8. Practical Next Milestones
1. Implement `/api/words` with pagination/search/filter/sort and complete Table page.
2. Finalize streak/xp backend logic and connect real weekly activity data.
3. Add auth/user identity flow to replace static test user.
4. Harden error/loading states and API validation across frontend pages.
