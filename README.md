# Cloudora Luxury Homestay

Next.js 15 booking platform for Cloudora’s private 5 BHK villa in Kodaikanal.

## Stack

- Next.js App Router + TypeScript + Tailwind v4
- Prisma + Supabase Postgres
- NextAuth (Google + email/password)
- Cashfree (50% advance)
- Brevo transactional email

## Setup

1. Copy `.env.example` to `.env.local` and fill Supabase, Auth, Cashfree, Brevo values.
2. `npm install`
3. `npm run db:push`
4. `npm run seed`
5. `npm run dev`

Admin login uses `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `.env.local`.

## Scripts

- `npm run dev` — local app
- `npm run db:push` — sync Prisma schema
- `npm run seed` — admin user, 5 rooms, packages, gallery
- `npm run build` — production build
