# Copilot instructions for devkickstart-web

Purpose: provide targeted context and runnable commands so future Copilot sessions work effectively in this repository.

---

## 1) Build / test / lint commands

- Install deps: `npm install`
- Dev server: `npm run dev` (Next dev server, default http://localhost:3000)
- Build: `npm run build` (Next production build)
- Start (prod): `npm run start`
- Lint: `npm run lint` (ESLint)

Tests in this repo: none (no `test` script in package.json). The backend tests live in the separate API repo:
- Backend repo: `/Users/brucie/DevKickstart.Api` (solution: `/Users/brucie/DevKickstart.sln`)
- Run backend tests: `dotnet test /Users/brucie/DevKickstart.sln`
- To run a single .NET test use `dotnet test --filter "FullyQualifiedName=Namespace.Class.Method"` or the test runner/GitHub Actions used by that repo.

If unit tests are later added to this frontend (Jest/Vitest), prefer adding an npm script `test` and use the runner's `--testNamePattern` or `-t` to run a single test.

---

## 2) High-level architecture (big picture)

- Frontend: Next.js (v16.2.5) App Router + React + TypeScript + Tailwind CSS.
  - Routes live under `app/` (App Router) — main pages include `/login`, `/register`, `/dashboard`, `/notes`, `/notes/create`, `/notes/[id]`.
  - Reusable UI is in `Components/`.
  - `lib/api.ts` is the central helper to build API URLs and perform requests (`apiUrl()`, `apiRequest()`), and expects an optional `token` param.
  - Client auth: JWT stored in `localStorage` and supplied via `lib/api.ts` when present.
- Backend: separate ASP.NET Core API (not in this repo). The frontend expects the API base URL in `NEXT_PUBLIC_API_URL`.
- Deployment: frontend is intended for Vercel (set `NEXT_PUBLIC_API_URL` per environment before build). The API must be a public URL accessible from the browser.

---

## 3) Key repository conventions and gotchas

- Next.js docs: This repo uses a Next.js version with breaking changes. Before changing Next internals or routes, consult the local Next docs at `node_modules/next/dist/docs/` (see `AGENTS.md` and repo warnings).
- Centralized API access: always use `lib/api.ts` for API requests so behavior (headers, token handling, base URL) remains consistent.
- Env var lifetime: `NEXT_PUBLIC_API_URL` is baked into the client at build time. Set it per Vercel environment (Preview/Production) before running `npm run build`.
- Tokens: token is stored in `localStorage`. Be careful changing auth flow — update `lib/api.ts` and components that read/write the token.
- Path alias: `@/*` maps to repo root (see `tsconfig.json`). Use it for internal imports when appropriate.
- ESLint: config extends `eslint-config-next` and overrides default ignores. Run `npm run lint` and follow configured rules.
- File/Folder naming: UI components live in `Components/` (PascalCase filenames). Keep pages in `app/` to follow Next App Router conventions.
- CHANGELOG_WORKLOG.md: update this file for significant changes (what changed, why, validation steps) if present in your workflow.
- Do not commit build artifacts: `bin/` and `obj/` are excluded for backend; avoid adding such directories here.

---

## 4) Files and docs Copilot should always consult

- `README.md` — local setup and deploy notes (frontend-specific).
- `AGENTS.md` — repository-specific agent rules and constraints (e.g., Next.js doc requirement).
- `CLAUDE.md` / `COPILOT_CONTEXT_PROMPT.md` — local assistant prompts and contextual guidance; include their constraints when producing code or messages.
- `lib/api.ts` — canonical place for API logic; changes here affect all API usage.
- `next.config.ts`, `tsconfig.json`, `eslint.config.mjs` — config files that affect routing, compilation, and linting.

When producing code or edits that touch framework-level behavior (routing, Next middleware, build config), include a short note referencing `node_modules/next/dist/docs/` to validate compatibility with this Next.js version.

---

## 5) Suggested behavior for Copilot sessions

- Prefer minimal, surgical edits. When modifying API usage, update `lib/api.ts` first and then the call sites.
- When changing runtime or build-time config that affects environment variables or bundling, mention that `NEXT_PUBLIC_API_URL` must be set per environment and that Vercel needs it configured before build.
- When asked to modify Next.js internals or to modernize code to a different Next version, flag the change and consult `node_modules/next/dist/docs/` and `AGENTS.md` first.

---

## 6) Where related code lives (for cross-repo work)

- Backend API repo (local): `/Users/brucie/DevKickstart.Api`
- Tests solution: `/Users/brucie/DevKickstart.sln`

If a change requires backend updates (CORS, JWT secrets, Redis), coordinate with the API repo: update `NEXT_PUBLIC_API_URL` in Vercel and the API's `Cors:AllowedOrigins` and environment secrets before running end-to-end tests.

---

If anything above should be expanded (more commands, extra architecture diagrams, or explicit examples for common edits), say which area to expand and Copilot will add it.
