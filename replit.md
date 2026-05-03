# Melvina Igboanugo — The Education Enthusiast

Personal brand website for Nigerian education leader Melvina Igboanugo, built as a full-stack application.

## Architecture

**Monorepo** managed by pnpm with the following artifacts:
- `artifacts/melvina-website` — React + Vite frontend (`@workspace/melvina-website`)
- `artifacts/api-server` — Express 5 backend (`@workspace/api-server`)

**Shared libraries:**
- `lib/api-spec` — OpenAPI YAML spec + Orval codegen config
- `lib/api-client-react` — Generated React Query hooks (from Orval)
- `lib/api-zod` — Generated Zod validation schemas (from Orval)
- `lib/db` — Drizzle ORM schema + DB client (`@workspace/db`)

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19, Vite, Wouter, TanStack Query, Tailwind CSS, Framer Motion, shadcn/ui |
| Backend | Express 5, Drizzle ORM, PostgreSQL |
| Validation | Zod (server), React Hook Form + Zod (frontend) |
| Auth | Cookie-based admin auth (cookie-parser, `melvina_admin_session` cookie) |
| Codegen | Orval (OpenAPI → React Query hooks + Zod schemas) |
| Payments | Paystack (react-paystack) |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, programs overview, impact stats, testimonials |
| `/about` | About Melvina — bio, mission, vision |
| `/programs` | Programs & pricing with Paystack payment integration |
| `/impact` | Impact statistics and testimonials |
| `/blog` | Blog listing — loads from DB API, search + category filter |
| `/blog/:id` | Individual blog post page — full article, related posts, newsletter |
| `/contact` | Contact form + WhatsApp booking link |
| `/admin` | Admin CMS panel — Blog, Site Content, Newsletter sections |

## API Endpoints (`/api/*`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/blog-posts` | — | List published posts (add `?all=true` as admin) |
| POST | `/blog-posts` | Admin | Create post |
| GET | `/blog-posts/:id` | — | Get single post |
| PATCH | `/blog-posts/:id` | Admin | Update post |
| DELETE | `/blog-posts/:id` | Admin | Delete post |
| POST | `/newsletter/subscribe` | — | Subscribe to newsletter |
| GET | `/newsletter/subscribers` | Admin | List all subscribers |
| GET | `/site-content` | — | Get all site content key/value pairs |
| PATCH | `/site-content/:key` | Admin | Update site content value |
| POST | `/admin/login` | — | Login (sets `melvina_admin_session` cookie) |
| POST | `/admin/logout` | — | Logout (clears cookie) |
| GET | `/admin/me` | — | Check if authenticated |

## Admin Panel

- URL: `/admin`
- Default password: `melvina2026`
- To change: set `ADMIN_PASSWORD` environment variable
- Features: Blog CRUD, Site Content editing, Newsletter subscriber list, Dashboard stats

## Database Tables

- `blog_posts` — id, title, excerpt, content, category, tag, imageUrl, readTime, published, publishedAt, createdAt, updatedAt
- `newsletter_subscribers` — id, email, name, createdAt
- `site_content` — id, key (unique), value, updatedAt

## Email Delivery (Pending)

Email delivery (newsletter welcome email + contact form notification) has not been set up yet.

**To enable it:** Provide a `RESEND_API_KEY` or `SENDGRID_API_KEY` secret, or connect the Resend/SendGrid Replit integration.

Planned emails:
- Welcome email when a user subscribes to the newsletter
- Contact form notification to Melvina when someone sends a message

## Running Codegen

After changing `lib/api-spec/openapi.yaml`:
```bash
pnpm --filter @workspace/api-spec run codegen
# Then fix the generated index if needed:
echo 'export * from "./generated/api";' > lib/api-zod/src/index.ts
```

## Seeding Data

```bash
pnpm --filter @workspace/scripts run seed
```

## Brand

- **Colors:** Royal purple (`#6B21A8`) + gold accent (`#D97706`), warm ivory background
- **Fonts:** Playfair Display (headings), DM Sans (body)
- **Identity:** "The Education Enthusiast"
- **WhatsApp booking:** configured in `src/lib/constants.ts`
- **Social links:** YouTube, LinkedIn, Instagram, Facebook in `src/lib/constants.ts`
