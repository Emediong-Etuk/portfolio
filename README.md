# Portfolio

Personal developer portfolio for Emediong Etuk — a backend-focused full-stack
developer. Built with Next.js (App Router), TypeScript, Tailwind CSS v4,
Framer Motion, and Prisma/PostgreSQL.

Live site: _add your deployed URL here once you've deployed it._

## Features

- Multi-page site: Home, About, Projects, Project detail, Contact
- Projects, bio, services, and skills are all stored in a database — not
  hardcoded — so they can be edited without a code change or redeploy
- `/admin` — a password-protected dashboard to add, edit, delete and reorder
  projects, and to edit your bio/services/contact info
- Profile photo defaults to your **GitHub avatar** (`github.com/<user>.png`),
  which updates automatically whenever you change your GitHub avatar — or you
  can switch to a custom image URL from the admin dashboard
- Light/dark mode toggle (persisted, respects system preference by default)
- Scroll-in animations via Framer Motion, custom fonts (Space Grotesk / Inter
  / JetBrains Mono), dark neutral palette with a single accent color

## Getting started

```bash
npm install
cp .env.example .env   # fill in DATABASE_URL, ADMIN_PASSWORD, ADMIN_SESSION_SECRET
npm run db:migrate     # creates the schema in your Postgres database
npm run db:seed        # seeds your profile, services, skills, and projects
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Sign in at `/admin`
with the password you set in `ADMIN_PASSWORD`.

### Environment variables

| Variable                | Purpose                                                             |
| ------------------------ | -------------------------------------------------------------------- |
| `DATABASE_URL`           | PostgreSQL connection string                                        |
| `ADMIN_PASSWORD`         | Password for `/admin`                                               |
| `ADMIN_SESSION_SECRET`   | Random secret used to sign the admin session cookie (`openssl rand -hex 32`) |
| `GITHUB_USERNAME`        | Used by the seed script to set your GitHub username/avatar          |

### Editing content

`npm run db:seed` is a **destructive dev-only reset** — it wipes and
re-inserts everything, so never run it in production. Once the site is
live, use `/admin` for all day-to-day edits (projects, bio, services,
avatar). Deploys run `npm run db:ensure-seed` instead, which only seeds
tables that are still empty and never touches existing data, so your
`/admin` edits survive every redeploy.

## Deployment (Railway)

This repo includes a `railway.toml`, so Railway mostly configures
itself. Unlike Render, Railway doesn't limit you to one free database
per account, so Postgres can live in the same project as the app.

1. **Push this repo to GitHub** (already done if you're reading this
   from the repo).
2. **In the Railway dashboard:** **New Project → Deploy from GitHub
   repo**, and select `Emediong-Etuk/portfolio`. Railway detects the
   Node app via Nixpacks and reads `railway.toml` for the build/start
   commands.
3. **Add Postgres:** in the same project, **+ New → Database → Add
   PostgreSQL**. Railway provisions it and exposes its connection
   details as variables on that Postgres service.
4. **Wire up the web service's variables** (select the `portfolio`
   service → **Variables**):
   - `DATABASE_URL` → reference the Postgres service's URL:
     `${{ Postgres.DATABASE_URL }}` (Railway autocompletes this — pick
     it from the reference picker rather than typing it by hand so it
     always matches the actual service name).
   - `ADMIN_PASSWORD` → whatever you want your `/admin` login to be.
   - `ADMIN_SESSION_SECRET` → a random secret, e.g. the output of
     `openssl rand -hex 32` run locally (Railway has no auto-generate
     button like Render does, so generate one yourself and paste it in).
   - `GITHUB_USERNAME` → `Emediong-Etuk` (already the default in
     `prisma/seed-data.ts`, but harmless to set explicitly).
5. **Deploy.** The start command in `railway.toml`
   (`npm run db:deploy && npm run db:ensure-seed && npm run start`)
   runs migrations and the safe seed automatically on every boot, so
   the site is populated with your GitHub projects on first deploy and
   your `/admin` edits are never overwritten on later ones.
6. Once live, open the Railway-assigned URL (or a custom domain, under
   **Settings → Networking**) and visit `/admin` to sign in.

### Alternative: Render

A `render.yaml` Blueprint is also included if you'd rather use Render.
Render allows only **one free-tier Postgres database per account**, so
if that slot is already taken by another project, bring an external
free database (e.g. [Neon](https://neon.tech)) and set `DATABASE_URL`
manually when the blueprint prompts for it — it's left blank
(`sync: false`) for exactly that reason.

To deploy anywhere else (Fly.io, a VPS, etc.), the shape is the same:
provision Postgres, set
`DATABASE_URL`/`ADMIN_PASSWORD`/`ADMIN_SESSION_SECRET`, and run
`npm run db:deploy && npm run db:ensure-seed && npm run build` at build
time (or fold the migrate/seed into your start command as `railway.toml`
does, if your platform's build step can't reach the database).

## Tech stack

- Next.js 15 (App Router, Server Components)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Prisma + PostgreSQL
- `jose` for signed admin session cookies
