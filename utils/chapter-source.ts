import { useEffect, useMemo, useState } from 'react';
import { Chapter } from '../types';
import { splitIntoSections, extractChapterMeta, parseChapterSections } from './chapter-parser';

// Simple in-memory cache for parsed markdown lessons per chapter id
const lessonsCache: Map<string, Chapter> = new Map();

function clearCache() {
  lessonsCache.clear();
}

async function parseMarkdownIfAvailable(chapter: Chapter): Promise<Chapter> {
  if (!chapter.markdownPath) return chapter;

  try {
    const base = (import.meta as any).env?.BASE_URL || '/';
    const mdPath = base + chapter.markdownPath.replace(/^\//, '');
    const response = await fetch(mdPath);
    if (!response.ok) throw new Error(`Failed to load markdown: ${response.statusText}`);
    const markdownContent = await response.text();
    const { frontmatter, sections } = splitIntoSections(markdownContent);
    const meta = extractChapterMeta(frontmatter);
    const lessons = parseChapterSections(sections, frontmatter, { chapterId: meta.id, type: meta.type });
    return { ...chapter, lessons };
  } catch (err) {
    console.warn(`Markdown parse failed or unavailable for chapter '${chapter.slug ?? chapter.id}'. Falling back to TS lessons.`, err);
    return chapter;
  }
}

export function useChapterSource(rawChapter: Chapter, useMarkdown: boolean): Chapter {
  const [chapter, setChapter] = useState<Chapter>(rawChapter);

  useEffect(() => {
    let mounted = true;
    async function load() {
      // Ensure we don't serve stale TS results when switching to markdown mode
      if (useMarkdown) {
        clearCache();
      }
      if (!useMarkdown) {
        setChapter(rawChapter);
        return;
      }

      const cached = lessonsCache.get(rawChapter.id);
      if (cached) {
        setChapter(cached);
        return;
      }

      const parsed = await parseMarkdownIfAvailable(rawChapter);
      if (mounted) {
        lessonsCache.set(rawChapter.id, parsed);
        setChapter(parsed);
      }
    }
    load();
    return () => { mounted = false; };
  }, [rawChapter, useMarkdown]);

  return chapter;
}

export function useChaptersSource(rawChapters: Chapter[], useMarkdown: boolean): { chapters: Chapter[]; loading: boolean } {
  const [chapters, setChapters] = useState<Chapter[]>(rawChapters);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function loadAll() {
      if (useMarkdown) {
        clearCache();
      }
      if (!useMarkdown) {
        setChapters(rawChapters);
        return;
      }
      setLoading(true);
      const results = await Promise.all(
        rawChapters.map(async (ch) => {
          const cached = lessonsCache.get(ch.id);
          if (cached) return cached;
          const parsed = await parseMarkdownIfAvailable(ch);
          lessonsCache.set(ch.id, parsed);
          return parsed;
        })
      );
      if (mounted) {
        setChapters(results);
        setLoading(false);
      }
    }
    loadAll();
    return () => { mounted = false; };
  }, [rawChapters, useMarkdown]);

  return { chapters, loading };
}
