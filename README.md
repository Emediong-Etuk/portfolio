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

## Deployment (Render)

This repo includes a `render.yaml` Blueprint, so deployment is a few
clicks rather than manual setup:

1. Push this repo to GitHub (already done if you're reading this from
   the repo).
2. In the Render dashboard: **New → Blueprint**, connect this GitHub repo.
   Render reads `render.yaml` and provisions both the free Postgres
   database and the web service automatically, with `DATABASE_URL` wired
   between them and `ADMIN_SESSION_SECRET` auto-generated.
3. You'll be prompted for the one value the blueprint intentionally
   leaves blank: **`ADMIN_PASSWORD`**. Set it to whatever you want your
   `/admin` login password to be.
4. Click **Apply**. Render builds and deploys — the build step runs
   migrations and the safe seed automatically
   (`prisma migrate deploy && npm run db:ensure-seed`), so the site is
   populated with your GitHub projects on first deploy with no extra step.
5. Once live, visit `/admin` on your Render URL and sign in with the
   password from step 3 to make edits.

The free Postgres plan on Render expires after 30 days unless upgraded —
worth knowing before you rely on this long-term. To deploy elsewhere
(Railway, Fly.io, a VPS), the shape is the same: provision Postgres, set
`DATABASE_URL`/`ADMIN_PASSWORD`/`ADMIN_SESSION_SECRET`, and run
`npm run db:deploy && npm run db:ensure-seed && npm run build` as your
build step.

## Tech stack

- Next.js 15 (App Router, Server Components)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Prisma + PostgreSQL
- `jose` for signed admin session cookies
