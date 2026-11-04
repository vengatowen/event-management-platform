# Event Management Platform — SAMANVAYA 2027

A complete, reusable full-stack Event Management Website built for college students.

**Stack:** Next.js 15 · TypeScript · Tailwind CSS · Prisma · Neon PostgreSQL · Resend · Vercel

---

## What is already working

| Feature | Status |
|---------|--------|
| Public multi-page event website (Home, About, Agenda, Partners, Contact, Privacy, Terms) | ✅ Working |
| Event registration form with validation | ✅ Working |
| Unique ticket generation + QR code | ✅ Working |
| Confirmation email with ticket (Resend) | ✅ Working |
| Admin login (NextAuth) | ✅ Working |
| Admin dashboard (placeholder) | ✅ Working |
| Database schema (Prisma + Neon) | ✅ Working |
| Middleware protection for admin routes | ✅ Working |
| Vercel-ready configuration | ✅ Working |

---

## Quick Start (Local)

```bash
npm install
cp .env.example .env.local
# Fill DATABASE_URL, AUTH_SECRET, RESEND_* values
npx prisma migrate dev
npm run dev
```

---

## Deploy to Vercel

1. Push this repo to GitHub (already done).
2. Import the repo in Vercel.
3. Add environment variables from `.env.example`.
4. Deploy.

After first deploy, run the setup route or migrations as documented in the README.

---

## Project Structure

- `src/app/(public)` – Public pages
- `src/app/admin` – Admin area
- `src/app/api` – API routes
- `prisma/` – Database schema & migrations
- `src/lib` – Auth, DB, utils

Built for easy customization and reuse for other college events.
