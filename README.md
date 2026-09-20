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

### Editing content after the first seed

Once seeded, don't re-run `npm run db:seed` in production — it wipes and
re-inserts everything. Use `/admin` instead for day-to-day edits (projects,
bio, services, avatar). The seed script is only meant for the initial setup
or for resetting a dev database.

## Deployment

This app needs a persistent Postgres database — deploy it anywhere that
supports Node.js + Postgres (Render, Railway, Fly.io, a VPS, etc.). On
Render, a typical setup is:

1. Create a Postgres instance, copy its connection string into `DATABASE_URL`.
2. Create a Web Service from this repo:
   - Build command: `npm install && npm run db:deploy && npm run build`
   - Start command: `npm run start`
3. Set `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` in the service's environment.
4. After the first deploy, run `npm run db:seed` once (via a one-off job or
   shell) to populate your initial profile/projects.

## Tech stack

- Next.js 15 (App Router, Server Components)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Prisma + PostgreSQL
- `jose` for signed admin session cookies
