# Dr. Ankita Chauhan Website — SEO Fix Changelog
**Date:** September 2026
**Scope:** Full implementation of the On-Page SEO Audit findings, as agreed with Akshat.

This document lists every change made to the codebase. Read this alongside the original audit (`DrAnkitaChauhan-OnPage-SEO-Audit.md`) for the "why" behind each item.

---

## 1. Critical fixes

- **Varanasi → Hyderabad**, everywhere. Root layout default title/description, About, Contact, Services index — all corrected. The clinic's real address (Gachibowli, Hyderabad) now matches the site copy consistently.
- **Homepage now has its own metadata** (title, description, canonical, Open Graph) — previously it had none and silently inherited the wrong sitewide default.
- **Homepage `<h1>`** now reads "Consultant Gynecologist & Obstetrician in Hyderabad" instead of the city-less original.
- **11 orphaned `/services/*` pages resolved**, per your decisions:
  - **6 kept and relocated** into the proper category taxonomy, fully linked from nav/footer/services index, with real metadata and a genuine `<h1>` added (previously **none** of these 11 pages had an `<h1>` at all — the shared heading component silently rendered `<h2>`):
    - `/services/hymenoplasty` → `/advanced-procedures-and-surgeries/hymenoplasty`
    - `/services/vaginoplasty` → `/advanced-procedures-and-surgeries/vaginoplasty`
    - `/services/infertility-treatment` → `/gynecology-care/infertility-treatment`
    - `/services/post-delivery-rehabilitation` → `/pregnancy-and-obstetric-care/post-delivery-rehabilitation`
    - `/services/prp-therapy` → `/laser-gynecology/prp-therapy-for-vaginal-dryness`
    - `/services/vaginal-dryness` → `/laser-gynecology/vaginal-dryness-treatment`
  - **5 redirected** (301, permanent) into the modern page that already covered the same topic, to stop them competing with your own linked pages:
    - `/services/laparoscopic-surgery` → `/advanced-procedures-and-surgeries/laparoscopic-surgeries`
    - `/services/laser-vaginal-rejuvenation` → `/laser-gynecology/vaginal-tightening-procedures`
    - `/services/laser-vaginal-tightening` → `/laser-gynecology/vaginal-tightening-procedures`
    - `/services/pre-natal-care-and-delivery` → `/pregnancy-and-obstetric-care/antenatal-and-postnatal-care`
    - `/services/pregnancy-counselling` → `/pregnancy-and-obstetric-care/preconception-counselling-and-planning`
- **Removed the "for safe you and your baby" placeholder tagline** from all 6 kept pages (it made no sense on pages like Hymenoplasty or Vaginoplasty) and replaced it with a real page-specific heading.
- **Fixed a real bug**: `services/layout.tsx` was importing `Footer` from `react-day-picker` (a date-picker library) instead of the site's own Footer component. Every one of the 11 orphaned pages was silently rendering with **no footer at all**. Fixed to import the correct component.
- **Fixed a copy-paste bug**: all 6 kept pages had the exact same wrong image `alt="Infertility Treatment"` regardless of the actual page topic (e.g. the Vaginoplasty page's photo was labeled "Infertility Treatment"). Each now has a correct, unique, descriptive alt text.

## 2. URL structure migration

All URLs containing `&` and underscores have been replaced with clean, hyphenated slugs. **All old URLs 301-redirect to their new equivalents** (see `next.config.ts` → `redirects()`, 25 rules total) so nothing that was previously indexed or bookmarked breaks.

| Old | New |
|---|---|
| `/advanced_procedures_&_surgeries/*` | `/advanced-procedures-and-surgeries/*` |
| `/gynecology_care/*` | `/gynecology-care/*` |
| `/laser_gynecology/*` | `/laser-gynecology/*` |
| `/pregnancy_&_obstetric_care/*` | `/pregnancy-and-obstetric-care/*` |

Every individual page slug underneath was also cleaned up (e.g. `menopause_care_&_counselling` → `menopause-care-and-counselling`, `PCOS-management` → `pcos-management`). Full list is in `next.config.ts`.

**Everywhere these URLs were referenced has been updated to match**: `NavBar.tsx`, `Footer.tsx`, `Services.tsx`, `sitemap.ts`, and each page's own `canonical` tag.

## 3. Keyword cannibalization resolved

The 5 redirected pages above no longer compete with your modern, linked pages for the same search terms. Link equity now consolidates onto one URL per topic.

## 4. Structured data (Schema.org / JSON-LD) — new

- **Sitewide `Physician` schema** added to the root layout: name, address, phone, email, specialties, and geo-coordinates (pulled from the precise pin in your own Google Maps embed: 17.460089, 78.353494), plus your Instagram/YouTube as `sameAs`. This is what makes a practice eligible for richer local-search treatment.
- **`MedicalWebPage` / Article schema** added to all 4 blog posts (headline, author, datePublished, image).

## 5. Open Graph & Twitter Card tags — new

Previously **zero** pages had these, meaning WhatsApp/Facebook/LinkedIn link previews had no reliable title, description, or image. Added:
- Sitewide defaults + `metadataBase` in the root layout (default share image: `/images/hero/dr-ankita.png`)
- Page-specific OG tags on the homepage, About, Contact, Services index, Blog index, all 4 blog posts, all 14 already-optimized service pages, and all 6 newly-integrated pages.

## 6. `/login` and dashboard routes deindexed

- `/login` now has `robots: { index: false, follow: false }` and was removed from the sitemap.
- Both `/doctor/*` and `/user/*` route groups now carry `noindex` via a small server-component wrapper layout (their existing layouts are Client Components, which Next.js doesn't allow to export `metadata` directly — so a thin server layout was added one level up instead, without touching your existing dashboard logic).
- `robots.ts` also explicitly disallows `/login`, `/doctor/`, and `/user/` as a second layer of protection.

## 7. Branding & typo fixes

- Standardized every service-page title to end in `| Dr. Ankita Chauhan` (previously inconsistent: some said "Dr. Ankita" only, some omitted the name entirely).
- Fixed "Dr. Ankita **Chauhann**" (blog index title).
- Fixed "Gynecology & Pregnancy Care Services in **Hydrabad**" (services index title).
- Fixed "PRP **Theraphy**" → "PRP Therapy" (heading text).
- Fixed "**vaginaloplasty**" → "vaginoplasty" and an awkward "surgical surgery" phrase in the Vaginoplasty page body copy.
- Fixed 4 images on the Vaginal Tightening Procedures page that all shared the **identical** alt text — each now has distinct, descriptive alt text.

## 8. Contact page — visible NAP added

The clinic address/phone/email previously existed only inside an unreadable Google Maps `<iframe>` (search engines can't read text inside an iframe) and in the footer. Added a real, crawlable `<address>` text block directly on the Contact page next to the map.

## 9. Image hosting & naming

- All 4 hotlinked `images.unsplash.com` URLs replaced with self-hosted local images (removed the now-unnecessary `remotePatterns` entry from `next.config.ts` too).
- **91 generic `img-1.jpg`-style filenames renamed to descriptive, keyword-relevant filenames** (e.g. `img-12.jpg` → `laparoscopic-and-vaginal-hysterectomy.jpg`), derived from each image's actual alt text/context. Two asset folders also renamed for consistency: `advanced_procedures` → `advanced-procedures`, `laser_gynecology` → `laser-gynecology`. Every source reference was updated to match — verified with a full scan that zero broken image references exist.
- 5 files in `/images/treatments/` were left untouched (confirmed genuinely unused anywhere in the code — safe to delete later if you want, but out of scope to touch un-referenced assets).

## 10. Sitemap rebuilt

- `/login` removed.
- All 6 newly-integrated pages added.
- Priorities and change frequencies now reflect actual content type (homepage vs. static service pages vs. weekly-updated blog index vs. rarely-changing individual posts) instead of one flat value for everything.

---

## Verification performed

- **Full TypeScript check (`tsc --noEmit`) across the entire codebase: zero errors.**
- Scripted verification that every image path referenced in source code exists on disk, and that zero old (pre-rename) image paths remain anywhere.
- Grep sweep confirming zero remaining instances of: "Varanasi", "Hydrabad", "Chauhann", "Theraphy", the placeholder tagline, and any `&`/underscore route folder names.
- A full `next build` was **not** run, because this app requires a live database connection (Prisma) and several third-party API credentials (Cashfree, Cloudinary, Google, Razorpay, Resend, Qstash) that don't exist in this environment — it would fail on missing infrastructure, not on anything related to this fix. **Please have Rahul run `npm run build` with real environment variables configured as a standard pre-deploy check**, same as for any other release.

## One item outside this scope, worth flagging

`npm install` reported: **"next@16.0.8: This version has a security vulnerability. Please upgrade to a patched version."** This is unrelated to the SEO work but should be looked at separately — recommend Rahul checks the linked advisory and plans an upgrade.

## Image caveat

The photography swapped in for the 4 former Unsplash images (menopause lifestyle cards + one CTA image) reuses existing photos already in your asset library, since there's no generic "healthy lifestyle" stock photography in the codebase and I had no way to source new licensed photography in this environment. They're reasonable placeholders, not perfect thematic matches — worth having Priyambada commission proper photography for those specific spots when there's time.
