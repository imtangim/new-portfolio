# CMS & Admin Guide

This portfolio is powered by **Sanity** (all editable content) and **Supabase** (blog comments & likes). After the initial deploy, you update content in Sanity Studio — no rebuild or redeploy required.

---

## Quick links

| What | URL |
|------|-----|
| **Admin (Sanity Studio)** | `https://your-domain.com/studio` |
| **Sanity project dashboard** | [sanity.io/manage → project `mnwkp2bk`](https://www.sanity.io/manage) |
| **Supabase dashboard** | [supabase.com/dashboard](https://supabase.com/dashboard) |

---

## First-time setup

### 1. Environment variables

Copy `.env.example` to `.env.local` and fill in:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=mnwkp2bk
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=          # for seeding only
SANITY_REVALIDATE_SECRET=          # random string for webhooks
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

**Where to get each value:**

| Variable | Source |
|----------|--------|
| Sanity project ID | Already set: `mnwkp2bk` |
| `SANITY_API_WRITE_TOKEN` | [sanity.io/manage](https://www.sanity.io/manage) → Project → API → Tokens → Add token (Editor) |
| `SANITY_REVALIDATE_SECRET` | Any long random string you invent |
| Supabase URL & service role | Supabase → Project Settings → API |

### 2. Seed Sanity with your current content

```bash
npm run seed
```

This creates **Site Settings**, **Experience**, **Projects**, **Achievements**, and **Blog Posts** matching the original hardcoded content.

### 3. Set up Supabase tables

In Supabase → **SQL Editor**, paste and run the contents of:

```
supabase/schema.sql
```

This creates `comments`, `post_reactions`, and `reaction_votes` tables.

### 4. Deploy once (Vercel recommended)

Add all env vars in your hosting dashboard, then deploy. The site must stay on a Node host (not static export) for webhooks and API routes.

### 5. Sanity webhook (instant updates without redeploy)

In [sanity.io/manage](https://www.sanity.io/manage) → Project `mnwkp2bk` → **API** → **Webhooks** → **Create**:

| Field | Value |
|-------|-------|
| Name | Revalidate portfolio |
| URL | `https://your-domain.com/api/revalidate` |
| Dataset | production |
| Trigger on | Create, Update, Delete |
| HTTP method | POST |
| Secret | Same as `SANITY_REVALIDATE_SECRET` |
| Projection | `{ _type }` |
| Filter | `_type in ["siteSettings","post","project","experience","achievement"]` |

After publishing in Studio, the live site updates within seconds (no redeploy).

---

## Where to edit what in Sanity

Open **`/studio`** on your site (or run `npm run studio` locally).

### Site Settings (single document)

**Sidebar → Site Settings**

This controls almost everything on the home page plus global SEO.

| Studio tab | What it controls on the website |
|------------|----------------------------------|
| **SEO & Global** | Browser title, meta description, keywords, default OG image → `layout.tsx` metadata |
| **Hero** | Eyebrow, headline lines, highlight word, subtitle, portrait, resume PDF/URL, CTA button labels → `#hero` section |
| **Intro** | Scroll narration text, side/front portrait images → intro section below hero |
| **About** | Section label & headline, years counter, fun facts, core stack tags, specialty text, bento achievement cards → `#about` |
| **Skills** | Section label & headline, orbital skill tags, center number/label, proficiency bars → `#skills` |
| **Experience header** | Section label & headline only → `#experience` title (job entries are separate) |
| **Projects header** | Section label & headline only → `#projects` title (project cards are separate) |
| **Achievements header** | Section label & headline → achievements dark section title |
| **Blog header** | Home blog section label/headline + blog index page title/description |
| **Contact & Footer** | Contact section label/headline, contact links (email, phone, GitHub), footer lines |
| **Navigation** | “Let’s talk” button text in navbar |

**Images:** Upload to Sanity **or** paste a URL in the matching `*Url` field (e.g. `heroPortraitUrl`). Uploaded images are preferred — they use Sanity CDN.

**Resume:** Upload PDF in **Resume PDF** or set **Resume URL** to `/assets/your-file.pdf` in `public/`.

---

### Experience (multiple documents)

**Sidebar → Experience**

Each document = one job on the timeline.

| Field | Website location |
|-------|------------------|
| Role | Job title |
| Company | Company name under title |
| Period | Date range (e.g. `2025 — Present`) |
| Bullet points | List under each role |
| **Display order** | Left-to-right order (0 = first) |

---

### Projects (multiple documents)

**Sidebar → Projects**

Each document = one app in the scroll showcase.

| Field | Website location |
|-------|------------------|
| Name | Project title + phone mockup label |
| Tag | Small red label above title |
| Description | Paragraph in project panel |
| Tech stack | Pill tags below description |
| Screenshot | Phone mockup image (upload or `screenshotUrl`) |
| App Store / Play Store URL | Store buttons (leave empty = “Coming soon”) |
| **Display order** | Scroll order (0 = first shown) |

---

### Achievements (multiple documents)

**Sidebar → Achievements**

| Field | Website location |
|-------|------------------|
| Rank / label | Large text (e.g. “Champion”, “6th Place”) |
| Title | Achievement name |
| Meta line | Subtitle (event, year, location) |
| **Featured** | ON = wide highlighted card with red styling |
| **Display order** | Grid order |

---

### Blog Posts (multiple documents)

**Sidebar → Blog Posts**

| Field | Website location |
|-------|------------------|
| Title | Post `<h1>` and card title |
| Slug | URL: `/blog/your-slug` — click **Generate** from title |
| Excerpt | Card teaser + meta description fallback |
| Published date | Date shown on post and cards |
| Read time | e.g. `8 min read` |
| Tags | Tag pills on post and filters on `/blog` |
| Cover image | Hero image (upload or external URL) |
| Gallery | Optional image grid at bottom of post |
| Body | Post content blocks (see below) |
| SEO | Override meta title, description, OG image per post |

#### Body block types

When editing **Body**, add blocks:

| Block type | Use for |
|------------|---------|
| **Paragraph** | Normal text |
| **Heading** | Section `<h2>` inside article |
| **Image** | Single figure with alt + optional caption |
| **Gallery** | 2–3 column image grid |

For **Image** / **Gallery**: upload to Sanity or use **Image URL** for external links (Unsplash, etc.).

---

## Supabase: comments & likes

Comments and reactions are **not** in Sanity — they live in Supabase and update in real time via API routes.

| Feature | Storage | User-facing |
|---------|---------|-------------|
| Comments | `comments` table | Form at bottom of each blog post |
| Like / dislike counts | `post_reactions` + `reaction_votes` | Reaction bar under each post |

**View data in Supabase:**

- **Table Editor → comments** — all reader comments
- **Table Editor → post_reactions** — like/dislike totals per post slug

No admin UI is built for moderating comments yet; delete rows directly in Supabase if needed.

---

## Day-to-day workflow

### Change homepage text or images

1. Go to `/studio`
2. Open **Site Settings** → edit the relevant tab
3. Click **Publish**
4. Wait ~5–30 seconds (webhook) or up to 60 seconds (ISR fallback)
5. Hard-refresh the site

### Add a new blog post

1. **Blog Posts → Create**
2. Fill title, generate slug, excerpt, date, tags, cover
3. Add **Body** blocks
4. Optional: fill **SEO** for custom Google/social preview
5. **Publish**

Post appears at `/blog/your-slug` and in the home blog section automatically.

### Add a project

1. **Projects → Create**
2. Set **Display order** (use next number: 6, 7, …)
3. Upload screenshot, fill store links
4. **Publish**

### Update resume

1. **Site Settings → Hero**
2. Upload new PDF in **Resume PDF** (or update **Resume URL**)
3. **Publish**

---

## Local development

```bash
# Run site
npm run dev

# Run Sanity Studio standalone (optional)
npm run studio

# Re-seed Sanity (careful: creates duplicate experience/project/achievement docs if run twice)
npm run seed
```

Studio is embedded at: [http://localhost:3000/studio](http://localhost:3000/studio)

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Site shows old content after publish | Check webhook URL & secret; verify `SANITY_REVALIDATE_SECRET` matches |
| `/studio` is blank | Confirm `NEXT_PUBLIC_SANITY_PROJECT_ID=mnwkp2bk` in env |
| Comments don’t save | Run `supabase/schema.sql`; set `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` |
| Images broken after upload | Ensure `cdn.sanity.io` is in `next.config.js` (already configured) |
| Empty sections | Run `npm run seed` or create documents in Studio; fallbacks show until Sanity has data |
| Duplicate jobs/projects after re-seed | Delete duplicates in Studio; seed uses `create()` not upsert for list items |

---

## Architecture summary

```
Sanity Studio (/studio)
  ├── siteSettings    → Home page copy, SEO, contact, headers
  ├── experience      → Job timeline
  ├── project         → Project showcase
  ├── achievement     → Awards section
  └── post            → Blog articles

Supabase
  ├── comments        → Reader comments (API: /api/comments)
  └── post_reactions  → Likes/dislikes (API: /api/reactions)

Next.js (Vercel)
  ├── Fetches Sanity at build + ISR (60s)
  ├── Webhook /api/revalidate → instant cache bust
  └── Server API routes → Supabase for interactions
```

---

## What still requires a code deploy

- Changing animations, layout, or new section types
- Adding new Sanity schema fields the website doesn’t read yet
- Bug fixes and dependency updates

Everything else — copy, images, blog, projects, resume, SEO text — is managed from Sanity after the first deploy.
