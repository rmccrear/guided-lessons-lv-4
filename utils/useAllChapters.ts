import { useState, useEffect } from 'react';
import { Chapter } from '../types';
import { splitIntoSections, extractChapterMeta, parseChapterSections } from './chapter-parser';

/**
 * Parse markdown file into lessons
 */
async function parseChapterMarkdown(chapter: Chapter): Promise<Chapter> {
    if (!chapter.markdownPath) {
        return chapter;
    }

    console.log('🔄 Parsing markdown for chapter:', chapter.id, 'from', chapter.markdownPath);

    try {
        const base = (import.meta as any).env?.BASE_URL || '/';
        const mdPath = base + chapter.markdownPath.replace(/^\//, '');
        const response = await fetch(mdPath);
        if (!response.ok) {
            throw new Error(`Failed to load markdown: ${response.statusText}`);
        }
        
        const markdownContent = await response.text();
        const { frontmatter, sections } = splitIntoSections(markdownContent);
        const chapterMeta = extractChapterMeta(frontmatter);
        
        console.log('📚 Found', sections.length, 'sections in', chapter.id);
        
        // Use shared parser
        const lessons = parseChapterSections(sections, frontmatter, {
            chapterId: chapterMeta.id,
            type: chapterMeta.type
        });

        console.log('✅ Parsed', lessons.length, 'lessons for', chapter.id);

        return {
            ...chapter,
            lessons
        };
    } catch (error) {
        console.error(`Error loading markdown for chapter ${chapter.id}:`, error);
        return chapter;
    }
}

/**
 * Custom hook to load and parse all chapters, including markdown ones
 */
export function useAllChapters(chapters: Chapter[]): { chapters: Chapter[]; loading: boolean } {
    console.log('🚀 useAllChapters called with', chapters.length, 'chapters');
    const [parsedChapters, setParsedChapters] = useState<Chapter[]>(chapters);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log('🔄 useAllChapters effect running...');
        const loadChapters = async () => {
            setLoading(true);
            const promises = chapters.map(chapter => parseChapterMarkdown(chapter));
            const results = await Promise.all(promises);
            setParsedChapters(results);
            setLoading(false);
        };

        loadChapters();
    }, [chapters]);

    return { chapters: parsedChapters, loading };
}
