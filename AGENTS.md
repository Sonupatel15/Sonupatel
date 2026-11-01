# Project agent instructions

## 1. Scope and current state

These rules apply throughout the workspace. Keep project-wide instructions here; add a nested instruction file only for a subsystem with genuinely different requirements.

The current frontend is a static Astro 7.4.4 portfolio in [sonupatel-dev](./sonupatel-dev/), using strict TypeScript, plain CSS, and small native browser scripts. It replaces the former Next.js/React application. Native Windows production builds are supported and verified; the old Linux-only guard and Next.js route-payload protocol are retired.

- Current routes: Home, About, Posts/details, Journal/details, Projects, Resume, Contact, and custom 404. Journal detail routes appear only for published journal entries.
- Light/Dark/System themes, shared Home/About portraits, nine branded profile links, a Writing section linking to Posts, and a PDF download are implemented.
- No React runtime, content pipeline, backend, database, analytics, custom domain, or live deployment is established by this task.
- Preserve existing Git history and unrelated work. Do not infer a push or deployment from local source files.
- Reinspect actual files, scripts, and tool output before each task. Keep this snapshot and relevant guides current when behavior changes.

## 2. Source of truth

| Document | Purpose |
|---|---|
| [Repository README](./README.md) | Actual setup, commands, existing-server handling, and publication status |
| [Guide index](./Understanding/README.md) | Requirements/source history and document map |
| [Requirements](./Understanding/01-project-understanding-and-requirements.md) | Product priorities, phases, and exclusions |
| [What to build](./Understanding/02-what-to-build.md) | Content and route requirements |
| [Architecture and design](./Understanding/03-architecture-and-design.md) | Current Astro architecture, structure, UI, and static boundaries |
| [Where to start](./Understanding/04-where-to-start.md) | Current implementation and validation workflow |
| [Domain and deployment](./Understanding/05-domain-and-deployment.md) | Cloudflare, Wrangler, HTTPS, headers, and recovery |
| [Backend and database](./Understanding/06-backend-and-database.md) | Conditions for adding APIs, Go, and persistence |
| [Launch checklist](./Understanding/07-quality-and-launch-checklist.md) | Measurable full-launch requirements |
| [Roadmap](./Understanding/08-roadmap-costs-and-open-decisions.md) | Estimates, unresolved inputs, and ownership |
| [Content and layout analysis](./Understanding/09-profile-content-and-layout.md) | Approved facts, exact URLs, resume permission, and verification limits |

Preserve the distinction between **confirmed in source**, **recommended**, and **open**. The original source selected Next.js; the later owner-approved Astro decision supersedes that technical choice without rewriting the source's history. Actual files/tool results establish current behavior; guides establish intent. Resolve material conflicts rather than silently choosing a convenient interpretation.

## 3. Evidence-first workflow

- Read relevant files, manifests, scripts, and existing patterns before editing. Search for shared helpers before adding logic.
- Do not invent paths, dependencies, APIs, achievements, screenshots, test results, performance numbers, or deployment status.
- Verify version-sensitive Astro, Node.js, Cloudflare, hosting, and pricing claims against installed versions and current official documentation. Old Next.js tutorials are not implementation guidance for this app.
- Ask when missing information materially changes scope, design direction, cost, data handling, public content, or architecture. Do not ask for facts already available locally.
- Make the smallest complete change. Preserve unrelated work and intended behavior; fix tightly coupled regressions, not unrelated issues.
- Surface failures with useful context. Do not swallow unexpected exceptions, fabricate success, or return success-shaped defaults.
- Report changed behavior, checks actually run, remaining uncertainty, and blockers. Never claim a build, audit, or deployment passed without observing it.

### Writing rules

Apply these to new UI copy, headings, metadata, accessible labels, documentation, comments, and task summaries.

- Use plain, specific English and concrete facts. Remove filler instead of replacing it with a slogan.
- Do not use em dash (U+2014), en dash (U+2013), or double-hyphen prose separators. Split the sentence or use a comma, colon, parentheses, or full stop. Write ranges as "17 to 18 px".
- Preserve legitimate command options, CSS custom properties, operators, URLs, filenames, required attribution, accurate quotations, and the approved original PDF. Do not corrupt technical syntax or alter that artifact to satisfy a prose rule.
- Avoid stock claims such as "passionate developer", "cutting-edge solutions", "seamless experiences", "unlock potential", "elevate your business", and "game-changing".
- Terms such as "robust", "innovative", or "AI-powered" require a precise relevant explanation, not promotional use.
- No invented metrics, fake testimonials, client logos, availability badges, unsupported seniority, or first-person anecdotes.
- Use direct labels such as Projects, Read case study, Download resume, and Contact only when the destinations exist.
- Avoid decorative emoji, repeated exclamation marks, exaggerated praise, forced slogans, and repetitive headings.
- Comment only a non-obvious reason or constraint; do not narrate straightforward code or insert assistant preambles into source.
- Check changed copy, including metadata and error states, for prohibited punctuation, unsupported facts, repetition, and filler.

## 4. Content and publication boundaries

The portfolio is for Sonupatel A L. The owner confirmed the supplied resume profile and exact links. `sonupatel.dev` remains the intended domain, not verified account/domain ownership.

- Shared facts and URLs live in [profile.ts](./sonupatel-dev/src/content/profile.ts). Do not scatter conflicting copies through templates.
- The owner's current title is Associate Software Engineer at Flexera. This direct correction overrides older Software Development Engineer/Software Developer labels in the source PDF and pasted LinkedIn text. Do not copy the example person's name or FinOps AI work into this profile.
- On 31 October 2026 the owner explicitly approved publishing the original PDF unchanged, including its phone number and employer-work descriptions. This supersedes the earlier resume omission.
- The approved file is [Sonupatel-AL-Resume.pdf](./sonupatel-dev/public/Sonupatel-AL-Resume.pdf). Preserve its bytes and expected SHA-256. Do not regenerate, redact, or compress it without new approval.
- The PDF remains the unchanged supplied file and differs from newer website facts. The owner subsequently requested simple "Download PDF" labels and removal of the previous-version notice. This supersedes the earlier public archive-label rule. Do not re-add that wording or claim the PDF has been updated; regeneration still requires approval.
- `/resume/` contains current approved facts, the phone link, and print styling. About includes the owner's supplied work descriptions; do not add the phone throughout the site.
- A new approved resume requires matching HTML facts and an updated expected hash. The PDF budget stays below 500,000 bytes; an oversized original needs an explicit decision, not silent compression or a relaxed limit.
- Resume approval is not blanket permission for employer case studies, proprietary code, internal architecture, customer data, tickets, private repository names, or nonpublic defects.
- Keep original Word/photo attachments private in ignored `temp`. Only the approved PDF and optimized photo derivatives are public assets.
- The owner removed the employer-views footer disclaimer. Do not re-add it unless requested; removal does not change the confidentiality/publication boundary.
- The footer now contains only GitHub, LinkedIn, and X profile actions, plus the owner's name and current role. Keep other profiles in Contact and Posts.
- Keep draft content out of routes, Home, indexes, sitemap, and RSS. Do not publish empty or "coming soon" pages.
- Full launch still needs at least two complete public-safe case studies. Do not guess a repository for the Raft project or treat every resume statement as independently tested code.
- The owner now enables Posts with one genuine Substack article. This supersedes the earlier two-article gate. Posts use the build-time Markdown collection in [src/content/posts](./sonupatel-dev/src/content/posts/); draft entries never get routes or index links. RSS, Now, Uses, games, and terminal interactions remain deferred.

## 5. UI and image standards

Follow [the current design guide](./Understanding/03-architecture-and-design.md).

- Keep a quiet professional layout: clear typography, useful whitespace, restrained borders, consistent spacing, and one accent color.
- Reuse the shared layout, navigation, footer, containers, tokens, focus states, and styles. Do not redesign each route independently.
- Use native anchors and standard HTML. Active navigation is computed at build/server-render time; do not add a client router merely for active states.
- No decorative gradients, glass panels, glowing blobs, fake dashboards, invented project cards, logo walls, skill percentages, or nonfunctional controls.
- The header wordmark is Sonupatel A L without the S badge. Home uses the greeting "Hi, I'm Sonupatel A L.", a cropped headshot, and a work-only summary; education belongs on About and Resume.
- About now uses the same circular portrait as Home, beside the introduction on desktop and stacked on phones. There is still no trailing resume link. HAL retains RTOS work but no generic internship summary or Karnataka location suffix. Ribbon retains only AWS cloud infrastructure work.
- All nine social/publishing profiles and email/resume/print actions use local SVGs with text labels. Retain Bootstrap Icons' MIT notice and Simple Icons' CC0 notice. Simple Icons assets and palette metadata are pinned to commit 27a47e6540abf45107f0bfe50fd0d1f8e6395263; Medium uses Bootstrap's three-oval mark. Keep SVG aspect ratios and platform colors; do not add padded black/white backplates. Monochrome marks use theme-appropriate light/dark variants. LinkedIn has intrinsic white lettering, not an external white badge.
- Contact profiles begin with LinkedIn, then GitHub. Keep other existing orders unchanged.
- Box important downloads, print actions, project sources, and profile cards. The owner now also requests bordered Home actions for More about my work and All project details. Keep main navigation and inline article links lightweight.
- The Home writing action links to `/posts/`, which includes the supplied article and Substack/Medium/X profiles. Each Markdown entry can render local content and an optional external source link. Do not fabricate articles, activity dates, hobbies, or feeds, or copy another person's article into this portfolio.
- Journal milestones now run newest to oldest, from the Aug 2026 Flexera award back to Class X in Mar 2019. Keep separate internship start and completion events: HAL Jun/Jul 2024 and Ribbon Apr/Jul 2025. PES starts Dec 2021; the kabaddi win is Apr 2024; Flexera joining remains month-only Aug 2025. Use shared `journalMilestones` data and actual work end dates, include the supplied CET/JEE results, and do not restore the removed article milestone or subtitle. Future entries use `section: journal`; do not invent events, exact days, completion of the current role, or award links.
- The owner confirmed ownership and authorized reproducing the complete finance article and its image. The article includes all ten source sections and a local 626 by 469 WebP image, retaining the Substack source link. Website punctuation is normalized without adding or changing financial claims. This permission is specific to this article and image.
- The analyzer period is owner-confirmed Sep to Oct 2025. AI service is removed from its tools, and the old scraping note is removed. Use Repository as the common generic repository label; do not imply an unverified repository contains more code than was reviewed.
- Preserve original photos. Maintain pre-sized, metadata-free WebP derivatives, responsive sources, useful alt text, explicit dimensions, and stable frame ratios.
- Never infer a trip location, date, hobby, or new biography from an image.
- Keep system fonts and shared CSS tokens. The dark palette uses charcoal layers, readable muted text, and soft-blue actions; Light mode retains the white baseline. Do not add a font, icon, animation, or UI package merely to decorate the site.
- Use semantic headings/landmarks, visible keyboard focus, a working skip link, appropriate control names, and usable touch targets.
- Body text needs at least 4.5:1 contrast in both themes. Test actual combinations; tokens alone are not a contrast certification.
- Validate narrow/wide and landscape layouts, long text, text resizing, and no page-level horizontal overflow.
- Preserve Light/Dark/System selection, early saved colors, reload/history behavior, cross-tab synchronization, and clear blocked-storage feedback.
- Native controls are progressively enhanced; do not leave a visible inert control when JavaScript is unavailable. Core content, navigation, and PDF links must work as HTML.
- Prefer no motion; respect reduced-motion preferences. No scroll-jacking, autoplay, parallax, particles, or cursor trails.

## 6. Architecture, types, and extensions

- Use `.astro` for page/layout components and `.ts` for application data/helpers. `.mjs` configuration and Node test/check entrypoints are tooling exceptions.
- Keep Astro strict typing, `noUncheckedIndexedAccess`, `allowJs: false`, `noEmit`, and bundler resolution enabled. Do not replace [tsconfig.json](./sonupatel-dev/tsconfig.json) with a generic compiler setup.
- Use `import type` where appropriate, inference for obvious locals, and clear types at component/content/API boundaries.
- Treat external data as `unknown` until validated. Type assertions do not validate JSON, storage, forms, or content metadata.
- Do not use `any`, double assertions, unexplained non-null assertions, `@ts-ignore`, disabled diagnostics, or weakened settings to pass a check.
- Do not hand-edit the generated `.astro/` cache, dependencies, or `out/` files. Change source/configuration and rebuild.
- Keep `output: "static"`, directory-format routes, trailing slashes, and `out` unless an architecture change is explicitly approved.
- Published dynamic pages need `getStaticPaths()`. Future RSS/static endpoints must be prerendered.
- Use small processed TypeScript scripts for interaction. The trusted early theme bootstrap is the intentional `is:inline` exception; never inject untrusted content with `set:html`.
- Do not add whole-page React hydration, a client router, or an adapter without demonstrated need and an explicit performance/publication decision.
- Add a separate Go service only for a runtime feature, and a database only for demonstrated persistence needs. A separate API does not require making Astro server-rendered.
- Browser `PUBLIC_` environment values are public/build-time, never secrets. Cross-origin APIs need deliberate CORS and validated, bounded inputs.
- Future guestbook work needs moderation, authorized administration, safe text rendering, migrations, least privilege, retention/deletion rules, and tested restoration.
- Optional features must not break projects, resume, contact, or core content if an API/widget fails. Games/terminal code must stay out of shared-page bundles; terminal commands must be allowlisted.
- Trace affected routes, navigation, content, metadata, sitemap/RSS, assets, environment settings, hosting, tests, and docs for every extension.
- Update [export checks](./sonupatel-dev/scripts/check-static-export.mjs) when adding routes/assets or approving an island. Do not bypass the JavaScript, photo, or original-PDF checks.

## 7. Deployment and workspace hygiene

- Use the manifest's scripts, npm, and lockfile. Use `npm ci` for reproducible installs; install/restore only after a manifest change or missing-dependency failure.
- Do not bypass peer checks with `--force` or `--legacy-peer-deps`. Resolve the actual graph/configuration.
- Keep secrets, real environment files, dependencies, caches, and output out of Git/public assets.
- Preserve existing Git metadata and unrelated changes. Do not initialize again, overwrite history, invent a remote, push, or deploy without authorization.
- Wrangler remains assets-only: serve `out`, retain `404.html`, use `not_found_handling: "404-page"`, and do not add a Worker `main`, unused binding, or SPA fallback without a requirement.
- Headers/redirects belong at the host. The baseline CSP is not a full XSS policy; test native scripts and the early inline theme script before tightening it.
- The PDF response must have application/pdf content type and an attachment filename matching the approved file.
- Use one production deployment owner/pipeline. Verify real HTTPS URLs, path/query-preserving redirects, previews, and rollback rather than assuming success.
- A duplicate Astro dev-server message means an instance already exists. Verify/reuse the reported project URL; do not start duplicates or replace another process casually.
- Use PowerShell-compatible commands on Windows, quote paths, and check exit statuses. Separate lines do not stop automatically after failure.

## 8. Validation and definition of done

Documentation-only changes need accurate source/status wording, valid local links, and editorial checks, not an unnecessary dependency install.

From `sonupatel-dev`, on native Windows or another supported platform:

```powershell
npm run lint
npm run typecheck
npm test
npm run build
npm run preview
```

- `astro check` covers templates/types; the production build runs static-output validation.
- `npm test` covers theme and owner-profile regression cases, not a full browser or security audit.
- Preview serves existing verified output without rebuilding. It is not a deployment.
- Verify direct loads, navigation, anchors, 404 status, PDF attachment headers/bytes, themes, keyboard behavior, and relevant error states under the static host.
- Keep temporary helpers scoped and stop them afterward. A user-approved development server may remain available; do not terminate unrelated processes.

Full launch uses [the launch checklist](./Understanding/07-quality-and-launch-checklist.md), including mobile Lighthouse at least 95, LCP below 2.0 seconds, CLS below 0.1, and initial gzip JavaScript below 100,000 bytes per core route including all framework code.

The current export checks a conservative JavaScript upper bound using all emitted external scripts plus page inline scripts. Do not silently relax a failing threshold. A full performance claim requires at least three comparable cold-load production audits, a median, and recorded version/profile/date/deployment; lab results do not prove field performance.

Finish with changed behavior, actual checks/results, and any remaining decision or unverified requirement. Do not label the full portfolio launched merely because local build or preview passed.
