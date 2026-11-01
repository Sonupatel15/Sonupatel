# Sonupatel

Static Astro portfolio in [sonupatel-dev](./sonupatel-dev/), using strict TypeScript and plain CSS. The owner-approved Astro migration replaces the former Next.js/React implementation; no React runtime, Next.js route payloads, or Linux-only build workaround remains.

## Current site

- Home, About, Posts/details, Journal/details, Projects, Resume, Contact, and custom 404. Journal details are generated only for published personal entries.
- Sonupatel A L wordmark, a personal greeting, and the corrected Associate Software Engineer role at Flexera.
- A shared circular Home/About portrait, work-only Home summary, and a separate Journal timeline linked from About.
- Four projects, three work entries including HAL, supplied PES/PUC/CBSE education, CI/CD skills, email, and nine profile links.
- Licensed local icons with platform colors for nine social/publishing profiles, email, PDF, and print; boxed actions and layered dark-mode surfaces.
- Writing links to Posts with a static Markdown collection, the full owner-authorized Substack article and local image, and publishing profiles. Journal supports future personal entries and book reviews using the same collection. Now and RSS remain deferred.
- A compact footer with the owner's name/current role and GitHub, LinkedIn, and X buttons.
- Light, Dark, and System theme selection, saved preferences, cross-tab updates, and clear feedback if browser storage is blocked.
- A current printable HTML resume and the owner-approved [PDF download](./sonupatel-dev/public/Sonupatel-AL-Resume.pdf), unchanged. The owner requested simple "Download PDF" labels without the earlier version notice. Separate employer case-study approval is still required.
- Static `out` output and assets-only Cloudflare/Wrangler configuration.

Search indexing remains disabled until domain ownership, canonical metadata, and the remaining launch checks are approved. No remote, push, account login, custom domain, or live deployment is established by this task.

## Requirements

Use Node.js 24 LTS, at least 24.22.1, and npm 12. Exact dependency versions are recorded in the [lockfile](./sonupatel-dev/package-lock.json). Install dependencies on the executing platform; do not share Windows and Linux `node_modules`.

## Local development

From the repository root in PowerShell:

```powershell
Set-Location .\sonupatel-dev
npm ci
npm run dev
```

The configured address is `http://127.0.0.1:3000/`. Astro allows one development instance per project. If it reports that a server is already running, open the printed URL rather than starting another copy.

To deliberately move an existing instance into your own terminal:

```powershell
npx astro dev stop
npm run dev
```

Do not use `--force` to replace an instance unless that replacement is intentional. Stop a foreground server with Ctrl+C.

## Validation and static preview

Native Windows production builds are supported and verified. Linux remains a supported build environment; Linux CI is not configured by this task.

From the frontend folder:

```powershell
npm run lint
npm run typecheck
npm test
npm run build
npm run preview
```

Check each exit status before continuing. `typecheck` uses `astro check`; the production build automatically runs `check:export`.

Preview validates and serves the existing `out` directory using local Wrangler. It does not rebuild or require Cloudflare login. Test direct page requests, navigation, project anchors, missing paths, themes, and the PDF download.

The export check verifies:

- Core content pages, Posts/Journal indexes and generated detail pages, custom 404, headers, personal icon, and the approved article image.
- No stale Next.js assets or unapproved framework hydration.
- A conservative initial gzip JavaScript upper bound below 100,000 bytes for every core route, counting all emitted external JavaScript plus that page's inline scripts.
- Responsive photo byte budgets.
- A valid PDF below 500,000 bytes whose SHA-256 matches the approved original.

The current build's JavaScript upper bound is 1,140 bytes per page, or 1,191 bytes on Resume, compared with about 143 KB in the former Next.js implementation. This is a build-artifact measurement, not a Lighthouse or field-performance claim. Repeated mobile Lighthouse, LCP/CLS, physical-phone, and screen-reader audits remain launch work.

## Content and resume maintenance

Edit [profile.ts](./sonupatel-dev/src/content/profile.ts) for shared identity, roles, education, project summaries, skills, and links. Detailed owner-supplied work statements are exposed on About and the current web resume. The phone link appears on Resume, not throughout the site.

The supplied PDF is 388,648 bytes and deliberately remains byte-for-byte unchanged. It still uses the older job title and source details. The owner's newer label/removal request does not update its contents or authorize regeneration. An approved future replacement requires updated facts and a new expected hash.

Project summaries are not complete case studies. No repository is guessed for the Raft project. Generic source actions use Repository; the store repository's backend coverage was not independently verified.

For application-only GitHub publication, local ports, GitHub Pages, Cloudflare Workers, and managed HTTPS certificates, use the [publishing and deployment runbook](./PUBLISHING-AND-DEPLOYMENT.md). The guide itself remains outside the clean application-only export.

## Adding posts

Add a lowercase, hyphen-separated Markdown filename in [src/content/posts](./sonupatel-dev/src/content/posts/), then rebuild. Each entry needs `title`, `summary`, and a real `published` date. Optional fields are `section`, `tags`, `draft`, and `source` (an object with `label` and an HTTPS `url`).

- Start with `draft: true`; drafts are excluded from both the index and individual routes.
- For a local article, write the full approved Markdown body, including headings and links, and omit `source`.
- For a Substack, Medium, or X post, add its real source URL and an original overview. Do not copy third-party article text or fabricate publication dates.
- Published content appears in [Posts](./sonupatel-dev/src/pages/posts/index.astro) and its own static detail page. The header keeps Posts active on detail pages.
- Publishing profile URLs remain centralized in [profile.ts](./sonupatel-dev/src/content/profile.ts).
- The supplied finance article now contains all ten source sections, after the owner confirmed text/image ownership and authorized republication. It retains the source link and a local, dimensioned WebP. The original publication date is 13 September 2025. Punctuation/range formatting follows the website rules; no financial claims were independently revised.
- After introducing a collection while Astro dev is already running, restart that project's dev instance if entries are not loaded. Posts fails explicitly when enabled without published entries rather than serving an empty success-shaped index.

### Journal entries and book reviews

Use the same content folder with `section: journal`. The default is `section: posts`, so existing articles stay in Posts. Journal entries have their own index links and `/journal/<filename>/` detail pages, and never appear in Posts. Drafts are excluded from both sections.

Write only your real review or personal experience, with a genuine date and optional tags such as Book review. Include external links through Markdown or `source` as needed. No placeholder reviews or activities are published. The [Journal index](./sonupatel-dev/src/pages/journal/index.astro) uses shared `journalMilestones` in [profile.ts](./sonupatel-dev/src/content/profile.ts), newest first from the Aug 2026 Flexera award to Class X in Mar 2019. Internship start/completion events reuse actual work dates, including HAL completion in Jul 2024 and Ribbon completion in Jul 2025. School results reuse education data; PES starts Dec 2021. The article publication milestone is removed.

## Structure and presentation

- [Astro configuration](./sonupatel-dev/astro.config.ts): static output, directory routes, local port, and disabled development toolbar.
- [Pages](./sonupatel-dev/src/pages/): static content routes, including Resume and 404.
- [Base layout](./sonupatel-dev/src/layouts/BaseLayout.astro): metadata, navigation, theme bootstrap, and footer.
- [Styles](./sonupatel-dev/src/styles/global.css): shared tokens, responsive layout, photo treatment, and print styles.
- [Theme control](./sonupatel-dev/src/components/ThemeControl.astro): small native TypeScript interaction, not a hydrated UI framework.
- [Action icons](./sonupatel-dev/src/components/Icon.astro): locally rendered Bootstrap Icons with the [MIT notice](./sonupatel-dev/public/licenses/bootstrap-icons.txt), no client-side icon library.
- [Images](./sonupatel-dev/public/images/): metadata-free WebP derivatives. The headshot variants are 10,684 and 37,430 bytes.
- [Wrangler configuration](./sonupatel-dev/wrangler.jsonc) and [static headers](./sonupatel-dev/public/_headers): assets-only hosting and a PDF attachment response.

The original photo and Word source stay private in the ignored local `temp` folder. Only the explicitly approved PDF and optimized photo derivatives are public assets.

## Deployment and conventions

`npm run deploy` builds, validates, and invokes Wrangler. Do not run it until publication is authorized and Cloudflare setup is complete. A local preview is not a deployment.

Follow [AGENTS.md](./AGENTS.md), the [architecture guide](./Understanding/03-architecture-and-design.md), and the [content/source analysis](./Understanding/09-profile-content-and-layout.md). Older source documents described Next.js; the later owner-approved Astro decision is authoritative for implementation.

Use plain, factual writing. Avoid em dashes, double-hyphen prose substitutes, marketing filler, invented metrics, and placeholder destinations. Preserve legitimate command flags and code syntax.
