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

## Deployment (Render + Neon)

This repo includes a `render.yaml` Blueprint for the web service. It
does **not** provision a Render Postgres database, because Render only
allows one free-tier database per account — if that slot is already
used by another project, the blueprint fails with "cannot have more
than one active free tier database." Instead, bring a free Postgres
database from [Neon](https://neon.tech) (or Supabase, or any Postgres
host) and point this app at it.

1. **Create the database.** Sign up at [neon.tech](https://neon.tech)
   (free, no credit card), create a project, and copy its connection
   string (`postgresql://...`). Append `?sslmode=require` if it isn't
   already there.
2. **Push this repo to GitHub** (already done if you're reading this
   from the repo).
3. **In the Render dashboard:** **New → Blueprint**, connect this
   GitHub repo. Render reads `render.yaml` and sets up the `portfolio`
   web service, with `ADMIN_SESSION_SECRET` auto-generated.
4. You'll be prompted for the values the blueprint leaves blank:
   - **`DATABASE_URL`** — the Neon connection string from step 1.
   - **`ADMIN_PASSWORD`** — whatever you want your `/admin` login to be.
5. Click **Apply**. Render builds and deploys — the build step runs
   migrations and the safe seed automatically
   (`prisma migrate deploy && npm run db:ensure-seed`), so the site is
   populated with your GitHub projects on first deploy with no extra step.
6. Once live, visit `/admin` on your Render URL and sign in with the
   password from step 4 to make edits.

If you'd rather use a second Render Postgres instead of Neon, that's
fine too — just upgrade it off the free plan (Render's one-free-database
limit only applies to free-tier databases), then set `DATABASE_URL` to
its connection string the same way.

To deploy elsewhere entirely (Railway, Fly.io, a VPS), the shape is the
same: provision Postgres, set
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
