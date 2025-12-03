import { useState, useEffect } from 'react';
import { Lesson, Chapter } from '../types';
import { parseChapterSections, splitIntoSections, extractChapterMeta } from './chapter-parser';

/**
 * Custom hook to load and parse markdown file for a chapter
 */
export function useMarkdownChapter(chapter: Chapter): Chapter {
    const [parsedChapter, setParsedChapter] = useState<Chapter>(chapter);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!chapter.markdownPath) {
            setParsedChapter(chapter);
            return;
        }

        setLoading(true);
        
        fetch(chapter.markdownPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load markdown: ${response.statusText}`);
                }
                return response.text();
            })
            .then(markdownContent => {
                const { frontmatter, sections } = splitIntoSections(markdownContent);
                const chapterMeta = extractChapterMeta(frontmatter);
                const lessons = parseChapterSections(sections, frontmatter, {
                    chapterId: chapterMeta.id,
                    type: chapterMeta.type
                });
                setParsedChapter({
                    ...chapter,
                    lessons
                });
            })
            .catch(error => {
                console.error('Error loading markdown chapter:', error);
                setParsedChapter(chapter);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [chapter.markdownPath, chapter.id]);

    return parsedChapter;
}
