# Dynamic Markdown Loading

This feature allows chapters to load lessons directly from markdown files at runtime, bypassing the need to pre-compile them to TypeScript.

## Overview

Chapters can now specify an optional `markdownPath` field that points to a markdown file in the `public` directory. When present, the React app will:

1. Fetch the markdown file at runtime
2. Parse it using the same `markdown-parser` utility used by the build scripts
3. Split it into lessons based on `##` headers
4. Dynamically populate the chapter with lessons

## Benefits

- **Faster iteration**: Edit markdown files without running build scripts
- **Smaller bundle size**: Lessons aren't embedded in the JavaScript bundle
- **Hot reload friendly**: Changes to markdown files can be picked up without recompilation
- **Flexible deployment**: Markdown files can be updated independently of the app

## Usage

### 1. Place markdown file in public directory

```bash
cp data/markdown/my-lesson.md public/data/
```

### 2. Configure chapter with markdownPath

```typescript
// data/chapters-constants.ts
export const CHAPTERS: Chapter[] = [
  {
    id: 'my-chapter',
    slug: 'my-chapter',
    title: 'My Chapter',
    description: 'Chapter description',
    lessons: [], // Can be empty or provide fallback lessons
    markdownPath: '/data/my-lesson.md' // Path relative to public/
  }
];
```

### 3. Markdown file format

The markdown file should follow the same format used for pre-compilation:

```markdown
---
id: chapter-id
title: Chapter Title
type: reading
description: Chapter description
---

# Chapter Introduction

## Lesson 1: First Topic

Content for lesson 1...

## Lesson 2: Second Topic

Content for lesson 2...
```

- Frontmatter (between `---`) defines chapter metadata
- Each `##` header creates a new lesson
- Lesson IDs are auto-generated from the header text

## Implementation Details

### Hooks

- **`useMarkdownChapter(chapter)`**: Processes a single chapter, fetching and parsing markdown if `markdownPath` is present
- **`useAllChapters(chapters)`**: Processes all chapters in parallel, useful for course overview pages

### Utilities

- **`utils/useMarkdownChapter.ts`**: Single chapter hook
- **`utils/useAllChapters.ts`**: Batch processing hook
- Both use the existing `utils/markdown-parser.ts` for parsing

### Integration Points

- **`App.tsx`**: `LessonShell` uses `useMarkdownChapter` to load the current chapter
- **`components/Course.tsx`**: Uses `useAllChapters` to load all chapters for the overview

## Performance Considerations

- Markdown files are fetched on-demand (not prefetched)
- Parsing happens once per chapter per session
- Results are cached in React state
- No performance impact if `markdownPath` is not used

## Migration Path

Existing chapters using pre-compiled TypeScript lessons continue to work as-is. To migrate:

1. Copy markdown source to `public/data/`
2. Add `markdownPath` to chapter configuration
3. Remove or comment out the `lessons` import (optional)

You can also use both approaches: provide fallback `lessons` that are used if markdown fetch fails.
