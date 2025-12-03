Parser Overview: Dev vs Prod

This project supports two lesson-loading modes: a fast Markdown-driven Dev mode for rapid iteration, and a production build that compiles Markdown into TypeScript for consistent deployment. Both modes share the same parsing logic via a single module to avoid drift.

Core Components

- Shared Parser: `utils/chapter-parser.ts`
  - `splitIntoSections(markdown)`: Splits content by `##` headers and extracts optional frontmatter.
  - `extractChapterMeta(frontmatter)`: Reads `id`, `title`, `type` defaults (type defaults to `exercise`).
  - `parseChapterSections(sections, frontmatter, { chapterId, type })`: Converts sections to `Lesson[]` using `convertCleanMarkdownToLesson`, generates IDs, and auto-detects lesson type.
  - Auto-detection rules:
    - Title contains "challenge" → `type: 'challenge'`
    - Title contains "understanding" → `type: 'reading'`

- Markdown → Lesson converter: `utils/markdown-parser.ts`
  - Handles fenced code blocks, Show Me syntax (e.g., ```lang:Show Me: Label and ![alt:Show Me: Summary](src)), descriptions, images, etc.

Dev Mode (Markdown at runtime)

- Centralized hooks: `utils/chapter-source.ts`
  - `useChapterSource(rawChapter, useMarkdown)`: For a single chapter; fetches `markdownPath`, parses via shared parser, and falls back to TS `lessons` on missing path or parse/fetch failure. Includes simple in-memory caching.
  - `useChaptersSource(rawChapters, useMarkdown)`: For course overview lists; applies the same logic to all chapters with caching.
- Where used:
  - `App.tsx` → `LessonShell` calls `useChapterSource` for the active chapter.
  - `components/Course.tsx` uses `useChaptersSource` for the overview.
- Chapter config: `data/chapters-constants.ts` entries include both `markdownPath` and TS `lessons` arrays; runtime chooses source via `VITE_APP_USE_MARKDOWN`.
- Live editing: Changes to files under `public/data/*.md` reflect on refresh.

Prod Mode (compiled TypeScript lessons)

- Scripted build:
  - `npm run sync-chapters:prod`
    - `npm run parse-all-chapters`: `scripts/parse-all-chapters.ts` reads every `public/data/*.md`, uses the shared parser, and outputs generated lesson modules under `data/*-lessons.ts`.
    - `tsx scripts/update-chapter-constants.ts production`: ensures imports exist for generated lessons. We retain `markdownPath` for dev, but production uses TS lessons.
- Runtime:
  - The app imports `*LESSONS` arrays from `data/*-lessons.ts`.
  - No network fetches of markdown in production.

Course Listing vs Lesson View

- Course overview uses `useChaptersSource` to render chapter previews consistently.
- Lesson rendering uses `useChapterSource` for the active chapter in dev; in prod it reads from generated `*LESSONS`.

Show Me Syntax Notes

- Code blocks: ```language:Show Me: Summary → converted to collapsible code snippet with optional description.
- Images: `![alt:Show Me: Summary](src)` → rendered via a collapsible image component.
- The markdown renderer (`components/LessonView.tsx`) includes custom components and styling.
- Paragraph wrapping fix: if a markdown paragraph contains only an image (Show Me), it is rendered as a fragment to avoid invalid `<div>` inside `<p>` for hydration.

GitHub Actions

- `.github/workflows/sync-markdown-to-ts.yml` runs `npm run sync-chapters:prod` on push/PR to validate parsing.
- `.github/workflows/deploy.yml` runs `npm run sync-chapters:prod`, builds, and deploys to GitHub Pages.

Typical Workflows

- Add a new chapter (dev):
  - `npm run create-chapter "Your Chapter Name"` → creates `public/data/<slug>.md` with frontmatter and stub sections, updates `data/chapters-constants.ts` with `markdownPath`.
  - `npm run dev` → verify lessons render live from markdown.

- Prepare for production:
  - `npm run sync-chapters:prod` → generates `data/*-lessons.ts` and updates `chapters-constants.ts` to import them.
  - `npm run build` or push to main → Actions will build and deploy.

Troubleshooting

- Dev changes not visible:
  - Ensure the chapter entry has `markdownPath` in `data/chapters-constants.ts`.
  - Confirm `VITE_APP_USE_MARKDOWN=true` and that `useChapterSource`/`useChaptersSource` are wired (they are by default in `App.tsx` and `Course.tsx`).

- Lesson type badges incorrect in dev:
  - Verify the shared parser (`utils/chapter-parser.ts`) is used; titles should include keywords like "Understanding:" or "Challenge:".

- Hydration errors around Show Me images:
  - Ensure `LessonView.tsx` contains the paragraph-only-image fragment logic to avoid `<div>` inside `<p>`.

File Locations (key paths)

- `utils/chapter-parser.ts` — shared parser logic
- `utils/markdown-parser.ts` — raw markdown → lesson converter
- `utils/chapter-source.ts` — centralized dev runtime loaders with fallback + cache
- `scripts/parse-all-chapters.ts` — prod codegen for lessons
- `scripts/update-chapter-constants.ts` — ensures TS imports alongside dev `markdownPath`
- `data/chapters-constants.ts` — chapter registry (includes both markdownPath and TS lessons)
- `components/LessonView.tsx` — markdown rendering with custom components
- `public/data/*.md` — source markdown chapters
