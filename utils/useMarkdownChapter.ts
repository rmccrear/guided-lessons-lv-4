import { useState, useEffect } from 'react';
import { Lesson, Chapter } from '../types';
import { convertCleanMarkdownToLesson } from './markdown-parser';

/**
 * Split markdown content by ## headers into sections
 */
function splitIntoSections(markdown: string): { frontmatter: string; sections: string[] } {
    const frontMatterRegex = /^---\s*([\s\S]*?)\s*---\n/;
    const frontMatterMatch = markdown.match(frontMatterRegex);
    
    let frontmatter = '';
    let content = markdown;
    
    if (frontMatterMatch) {
        frontmatter = frontMatterMatch[0];
        content = markdown.slice(frontMatterMatch[0].length);
    }
    
    const sections: string[] = [];
    const headerRegex = /^## (?!#)/gm;
    const matches = [...content.matchAll(headerRegex)];
    
    if (matches.length === 0) {
        return { frontmatter, sections: [content] };
    }
    
    for (let i = 0; i < matches.length; i++) {
        const start = matches[i].index!;
        const end = i < matches.length - 1 ? matches[i + 1].index! : content.length;
        sections.push(content.slice(start, end));
    }
    
    return { frontmatter, sections };
}

/**
 * Extract chapter metadata from frontmatter
 */
function extractChapterMeta(frontmatter: string) {
    const getField = (key: string) => frontmatter.match(new RegExp(`${key}:\\s*(.*)`))?.[1]?.trim();
    return {
        id: getField('id') || 'unknown',
        title: getField('title') || 'Untitled Chapter'
    };
}

/**
 * Generate a lesson ID from section title
 */
function generateLessonId(sectionTitle: string, chapterId: string, index: number): string {
    const titleSlug = sectionTitle
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
    return `${chapterId}-${titleSlug}`;
}

/**
 * Parse markdown file into lessons
 */
function parseMarkdownToLessons(markdownContent: string): Lesson[] {
    const { frontmatter, sections } = splitIntoSections(markdownContent);
    const chapterMeta = extractChapterMeta(frontmatter);
    
    return sections.map((section, index) => {
        const fullSection = frontmatter ? `${frontmatter}\n${section}` : section;
        const lesson = convertCleanMarkdownToLesson(fullSection);
        
        const sectionTitleMatch = section.match(/^## (.+)/);
        const sectionTitle = sectionTitleMatch ? sectionTitleMatch[1].trim() : lesson.title;
        
        return {
            ...lesson,
            id: generateLessonId(sectionTitle, chapterMeta.id, index),
            title: sectionTitle
        };
    });
}

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
                const lessons = parseMarkdownToLessons(markdownContent);
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
