# Content Map

Every piece of authored copy in the app, and where to change it.

Two kinds of content live here:

- **Data files** — pure constants under `domain/constants/`. Edit the array or object; nothing else changes. This covers most of the content.
- **Inline copy** — strings written directly into a component's JSX. Editing means touching the component.

---

## 1. Identity and contact

All of it derives from `src/shared/domain/constants/profile.ts`:

- `PROFILE` — name, initial, role, company, location, machine name, shell user, email, site, GitHub user, résumé path and filename.
- `PROFILE_LINKS` — `href` values for GitHub, LinkedIn, dev.to, Medium and email.
- `PROFILE_HANDLES` — the same accounts as plain text, for the Terminal where a URL is not clickable.

Change them there and every surface follows: login screen, Apple menu, Settings sidebar, About window, Finder sidebar, Terminal title/prompt/echo/`contact`, Safari address bar and hero, Messages, Notes, notification cards, Preview window.

**The one exception** is `index.html`, which carries its own `<title>` and `<meta name="description">`. Those are static HTML, outside React, so they need editing by hand.

---

## 2. Data files

### Projects and writing

| File | Contains |
| --- | --- |
| `features/safari/domain/constants/pinned-repositories.ts` | `PINNED_REPOSITORIES` is the allowlist of repos the Open Source section shows, in display order. `FALLBACK_REPOSITORIES` is the baked-in copy shown when the GitHub API is unreachable. **Adding a repo means adding it to both** — the allowlist decides what appears, the fallback decides what appears when the API is down. |
| `features/safari/domain/constants/fallback-articles.ts` | `ARTICLE_LIMIT` sets how many posts the Writing section shows. `FALLBACK_ARTICLES` mirrors the most recent dev.to posts and is shown until the API answers — refresh it when older entries fall off the list. |

### Writing

| File | Contains |
| --- | --- |
| `features/notes/domain/constants/today-tasks.ts` | **The visitor guide.** One list, rendered twice: `label` (short) in the Today widget, `detail` (full sentence) in the note. Like a real macOS widget the desktop card shows only the first `TODAY_WIDGET_TASK_LIMIT` rows and defers the rest to the app — it does not scroll, so raising that limit means the rows no longer fit. |
| `features/notes/domain/constants/notes.ts` | The single note (`NoteId.GUIDE`) that wraps that checklist — title, intro, section heading and closing line. |
| `features/terminal/domain/constants/terminal-command-output.ts` | Output for the text-only commands: `help`, `skills`, `contact`. Column alignment is done with literal spaces and preserved by `whitespace-pre-wrap` in `terminal-content.tsx` — collapse that and the columns go ragged. |
| `features/terminal/domain/constants/terminal-command-apps.ts` | Commands that **open a window** instead of printing: `about` → About Me, `projects` → Safari. A command listed here must not also appear in the output map. |
| `features/terminal/domain/constants/initial-terminal-lines.ts` | The shell login banner. |
| `features/terminal/domain/enums/terminal-command.ts` | The command list. A new command needs an enum member plus an entry in **either** the output map (to print) or the app map (to open a window), and a line in `help`. |

### Files and folders

| File | Contains |
| --- | --- |
| `features/finder/domain/constants/finder-sections.ts` | **Every filename in Finder**, grouped by sidebar section. Only user files and folders are lowercase — applications keep their proper names and are built by the `application()` helper from `APPLICATION_REGISTRY`, so Finder cannot disagree with the Dock; the desktop icons in `desktop-files.tsx` and the Apple menu's Recent Items name the same files and must match. Each entry names the app that opens it — entries that open Safari use `FinderEntryKind.DOCUMENT` with `FinderEntryGlyph.WEB` so they read as web locations rather than folders on disk. |
| `features/finder/domain/constants/finder-favorites.ts` | Which sections appear in the sidebar, and their order. |

Adding a section needs a new `FinderSection` enum member; adding a file to an existing section is a one-line change.

### System chrome

| File | Contains |
| --- | --- |
| `shared/domain/constants/application-registry.ts` | Per-app window titles, Dock and menu-bar labels, default window size and position. |
| `features/about/domain/constants/about-device-specifications.ts` | The spec rows in the About window. The header already shows name, role and company, so keep these additive. |
| `features/desktop/domain/constants/calendar-events.ts` | `BIRTHDAY` (month/day, matched annually), `BIRTHDAY_EVENT`, and `DEFAULT_CALENDAR_EVENT` shown on every other day. |
| `features/settings/domain/constants/settings-panel-copy.ts` | Every System Settings toggle: title, detail, default state, and each panel's description. |
| `features/settings/domain/constants/settings-sections.ts` | Settings sidebar sections and order. |
| `features/messages/domain/constants/message-contacts.ts` | Conversation list: name, preview, avatar letter, colour. |
| `features/messages/domain/constants/conversation-messages.ts` | The incoming messages in each thread, address, timestamp. |
| `features/photos/domain/constants/photo-titles.ts` | Eight photo names. Images are generated gradients, not files — see [Assets](#4-assets). |
| `features/desktop/domain/constants/dock-applications.ts` | Dock contents and order. |
| `features/desktop/domain/constants/launchpad-applications.ts` | Launchpad contents and order. |
| `features/desktop/domain/constants/default-weather.ts` | Fallback temperature shown before the live fetch resolves. |

---

## 3. Inline copy

| Copy | Where |
| --- | --- |
| Safari section headings | `features/safari/components/safari-content.tsx` — `OPEN SOURCE`, `WRITING`, and their one-line captions. The page has no hero; it opens straight into the repositories. |
| Notification Center cards | `features/desktop/components/notification-center.tsx` — the Do Not Disturb card, the site card and the Messages card, including their `Now` / `10m ago` timestamps. |
| Weather location | `features/desktop/components/weather-widget.tsx` — `Maringá, PR`. The coordinates are in `features/desktop/hooks/use-maringa-weather.ts`; changing city means editing both, and renaming the hook file. |
| Today widget heading | `features/desktop/components/today-widget.tsx` — "Start here", "Open Notes". |
| System Status widget | `features/desktop/components/system-status-widget.tsx` — heading and the hardcoded `84%` battery figure. |
| Battery percentage (menu bar) | `features/desktop/components/menu-bar.tsx` — `aria-label='Battery, 84 percent'`. |
| Desktop file labels | `features/desktop/components/desktop-files.tsx` — "screenshots", "read me.txt". Separate strings from the Finder entries; both need changing to stay consistent. |
| Photos header | `features/photos/components/photos-content.tsx` — "Library", "Interface studies · 8 items". |

---

## 4. Assets

- `public/wallpaper-tahoe-day.jpg` — referenced from `src/styles.css` (`.desktop`).
- **Photos are not images.** `photos-content.tsx` generates coloured gradient tiles from `PHOTO_TITLES`. Real photographs would mean adding files to `public/` and reworking that component.
- Favicon is an inline SVG data URI in `index.html`.

---

## 5. Live data

Three things fetch at runtime, and all degrade to a constant rather than an error state:

**Medium is not fetched.** The account has no published stories, and Medium offers no public API — its RSS feed is not readable from the browser (no CORS headers). The nav links to the profile, but the Writing list is dev.to only. Publishing on Medium would mean either adding entries to `FALLBACK_ARTICLES` by hand or fetching the feed at build time.


| Source | Fallback |
| --- | --- |
| `api.github.com` — repo metadata for the Projects section, via `features/safari/adapters/github-repositories.ts` | `FALLBACK_REPOSITORIES` renders immediately and is replaced only if the request succeeds. Unauthenticated GitHub allows 60 requests/hour per IP; past that the fallback simply stays, with slightly stale star counts. |
| `dev.to/api/articles` — the Writing section, via `features/safari/adapters/devto-articles.ts` | `FALLBACK_ARTICLES`. No key needed and dev.to sends permissive CORS headers, so it runs straight from the browser. |
| `api.open-meteo.com` — Maringá weather, via `features/desktop/adapters/maringa-weather.ts` | `DEFAULT_WEATHER`. |
