<div align="center">

# Payload

**Send Invoices People Open.**

A full-stack invoice builder for creating, customizing, saving, and exporting polished invoices from a responsive live editor.

[Live App](https://payload-web-one.vercel.app) · [Repository](https://github.com/SAHILSHANGLOO35/payload)

</div>

---

## Overview

Payload is a production-deployed invoice application built as a Turborepo. It combines a Next.js frontend, a Bun + Express API, PostgreSQL through Supabase, Prisma ORM, Supabase Auth, and private object storage.

The editor is designed around a simple workflow: enter invoice data, see the document update in real time, choose a visual style, save it, and export the final invoice as PDF or PNG.

Guests can create an invoice without signing in. When they later authenticate with Google, the guest invoice is migrated to their account instead of being lost.

## Features

- Live invoice editor with responsive **Form**, **Preview**, and **Both** view modes
- A4 PDF preview while editing
- Five invoice templates: **Default**, **Vercel**, **GitHub**, **Stripe**, and **Notion**
- Customizable template, font, light/dark mode, and accent color
- Company and client details with custom fields
- Logo and signature uploads
- Line items with quantity, unit price, totals, tax, discount, and additional billing details
- Payment information, notes, and terms
- PDF and PNG export
- Google OAuth through Supabase
- Guest invoice flow with account migration after sign-in
- Invoice dashboard with pagination, statuses, editing, and deletion
- Private Supabase Storage for invoice assets
- Cookie-based authentication and ownership checks on protected invoice operations

## Tech Stack

| Area              | Technology                                                             |
| ----------------- | ---------------------------------------------------------------------- |
| Monorepo          | Turborepo, Bun workspaces                                              |
| Frontend          | Next.js 16, React, TypeScript                                          |
| UI                | Tailwind CSS v4, shadcn/ui                                             |
| Client state      | Zustand                                                                |
| HTTP client       | Axios                                                                  |
| PDF               | `@react-pdf/renderer`, `react-pdf`, `pdfjs-dist`, `react-pdf-tailwind` |
| Backend           | Bun, Express, TypeScript                                               |
| Validation        | Zod                                                                    |
| ORM               | Prisma                                                                 |
| Database          | PostgreSQL on Supabase                                                 |
| Authentication    | Supabase Auth with Google OAuth                                        |
| Storage           | Supabase Storage                                                       |
| Frontend hosting  | Vercel                                                                 |
| Backend hosting   | Render                                                                 |
| Health monitoring | UptimeRobot                                                            |

## Architecture

```
                         ┌──────────────────────┐
                         │      Next.js Web      │
                         │        Vercel         │
                         └──────────┬────────────┘
                                    │
                           Axios + credentials
                                    │
                         ┌──────────▼────────────┐
                         │   Bun + Express API    │
                         │        Render          │
                         └──────────┬─────────────┘
                                    │
                       ┌────────────┴─────────────┐
                       │                           │
                   Prisma                    Supabase SDK
                       │                           │
            ┌──────────▼──────────┐    ┌───────────▼──────────────┐
            │     PostgreSQL       │    │      Supabase Auth       │
            │      Supabase        │    │   + Private Storage      │
            └──────────────────────┘    └───────────────────────────┘
```

### Guest ownership flow

```
Guest opens Payload
        │
        ▼
guestId HttpOnly cookie set
        │
        ▼
Guest invoice stored in PostgreSQL
        │
        ▼
User signs in with Google
        │
        ▼
Guest invoice migrated to the authenticated user
        │
        ▼
guestId cookie cleared
```

Invoice writes are ownership-checked before database updates. Nested invoice data is persisted through Prisma transactions so related invoice fields are updated together.

## Project Structure

```
payload/
├── apps/
│   ├── web/              # Next.js frontend
│   └── server/           # Bun + Express API
├── packages/
│   ├── db/               # Prisma schema and database client
│   └── ui/               # Shared UI components
├── package.json
├── turbo.json
└── bun.lock
```

The repository uses workspace packages so the frontend, backend, database layer, and shared UI can evolve inside one codebase.

## Getting Started

### Prerequisites

- Node.js 20+
- Bun
- PostgreSQL database
- Supabase project
- Google provider configured in Supabase Auth

### 1. Clone the repository

```bash
git clone https://github.com/SAHILSHANGLOO35/payload.git
cd payload
```

### 2. Install dependencies

```bash
bun install
```

### 3. Configure environment variables

**Backend**

```env
PORT=8000
NODE_ENV=development

FRONTEND_URL=http://localhost:3000
GOOGLE_REDIRECT_URL=http://localhost:8000/api/v1/google/auth/callback

DATABASE_URL=

SUPABASE_URL=
SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=

JWT_SECRET=
```

**Frontend**

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000/api/v1
```

> Keep the Supabase service-role key on the server only. It must never be exposed through a `NEXT_PUBLIC_*` variable.

### 4. Configure Supabase

For local development:

- Enable the Google provider in Supabase Auth
- Allow `http://localhost:8000/api/v1/google/auth/callback` as an auth redirect URL
- Create a private storage bucket named `invoice-assets`
- Point `DATABASE_URL` to the PostgreSQL database used by the project

### 5. Generate Prisma Client

```bash
cd packages/db
bunx prisma generate
cd ../..
```

The database should use the schema defined by the Prisma setup in `packages/db`. Apply that schema using the Prisma migration workflow you use for your environment.

### 6. Start development

From the repository root:

```bash
bun dev
```

Default local services:

- Web: `http://localhost:3000`
- API: `http://localhost:8000`

## Root Scripts

```bash
bun dev
bun run build
bun run lint
bun run typecheck
bun run format
```

These commands are orchestrated through Turborepo across the workspaces.

## API

The backend is mounted under `/api/v1`.

### Authentication

```
GET   /api/v1/google/auth/login
GET   /api/v1/google/auth/callback
GET   /api/v1/google/auth/user
POST  /api/v1/google/auth/logout
```

### Invoices

```
POST    /api/v1/invoices
GET     /api/v1/invoices
GET     /api/v1/invoices/:id
PUT     /api/v1/invoices/:id
PUT     /api/v1/invoices/:id/status
DELETE  /api/v1/invoices/:id
```

Invoice listing supports pagination through `page` and `limit` query parameters.

### Health

```
GET /health
```

The production health endpoint is used by UptimeRobot to monitor the Render service.

## Authentication and Cookies

Payload uses its own JWT after Supabase completes the Google OAuth exchange.

The JWT is stored in an HttpOnly cookie, and frontend requests that require session state use `credentials`.

Local development uses a same-site-friendly cookie configuration. In production, the Vercel frontend and Render backend are on different sites, so cookies are configured with secure cross-site attributes.

The guest session uses the same cookie model through a separate `guestId` cookie.

## Storage

Invoice logos and signatures are stored in the private Supabase bucket:

```
invoice-assets
```

Assets are organized per invoice and accessed through signed URLs instead of making the bucket public.

## Production Deployment

The current production setup is intentionally split by responsibility:

| Layer          | Provider            |
| -------------- | ------------------- |
| Frontend       | Vercel              |
| Backend        | Render              |
| Database       | Supabase PostgreSQL |
| Authentication | Supabase Auth       |
| Image storage  | Supabase Storage    |
| Monitoring     | UptimeRobot         |

### Render

The backend is deployed from the monorepo root because it depends on the shared database workspace.

**Build command**

```bash
bun install && cd packages/db && bunx prisma generate
```

**Start command**

```bash
cd apps/server && bun start
```

**Production backend**

```
https://payload-ogpt.onrender.com
```

### Vercel

The frontend is deployed from `apps/web`.

**Production frontend environment variable**

```env
NEXT_PUBLIC_BACKEND_URL=https://payload-ogpt.onrender.com/api/v1
```

**Live app**

```
https://payload-web-one.vercel.app
```

### Production backend environment

The important URL values are:

```env
NODE_ENV=production
FRONTEND_URL=https://payload-web-one.vercel.app
GOOGLE_REDIRECT_URL=https://payload-ogpt.onrender.com/api/v1/google/auth/callback
```

Production secrets such as the database URL, JWT secret, and Supabase server credentials should be configured through Render's environment settings rather than committed to the repository.

## Security Notes

- JWT authentication is stored in HttpOnly cookies
- Production cookies use secure cross-site settings
- Invoice reads and writes verify user or guest ownership
- Request payloads are validated before persistence
- Nested invoice updates use Prisma transactions
- Supabase Storage remains private
- Stored assets are served using signed URLs
- Service-role credentials stay on the backend

## Contributing

Contributions, bug reports, and improvements are welcome.

For code changes:

```bash
git checkout -b feat/your-change
```

Before opening a pull request, run:

```bash
bun run lint
bun run typecheck
bun run build
```

Keep pull requests focused and include enough context to explain the problem being solved.

---

<div align="center">

Built and maintained by **Sahil Shangloo**.

If Payload is useful to you, consider starring the repository.

</div>
