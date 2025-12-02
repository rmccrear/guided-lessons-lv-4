import { useState, useEffect } from 'react';
import { Chapter } from '../types';
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
function generateLessonId(sectionTitle: string, chapterId: string): string {
    const titleSlug = sectionTitle
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
    return `${chapterId}-${titleSlug}`;
}

/**
 * Parse markdown file into lessons
 */
async function parseChapterMarkdown(chapter: Chapter): Promise<Chapter> {
    if (!chapter.markdownPath) {
        return chapter;
    }

    try {
        const response = await fetch(chapter.markdownPath);
        if (!response.ok) {
            throw new Error(`Failed to load markdown: ${response.statusText}`);
        }
        
        const markdownContent = await response.text();
        const { frontmatter, sections } = splitIntoSections(markdownContent);
        const chapterMeta = extractChapterMeta(frontmatter);
        
        const lessons = sections.map((section) => {
            const fullSection = frontmatter ? `${frontmatter}\n${section}` : section;
            const lesson = convertCleanMarkdownToLesson(fullSection);
            
            const sectionTitleMatch = section.match(/^## (.+)/);
            const sectionTitle = sectionTitleMatch ? sectionTitleMatch[1].trim() : lesson.title;
            
            return {
                ...lesson,
                id: generateLessonId(sectionTitle, chapterMeta.id),
                title: sectionTitle
            };
        });

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
    const [parsedChapters, setParsedChapters] = useState<Chapter[]>(chapters);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadChapters = async () => {
            setLoading(true);
            const promises = chapters.map(chapter => parseChapterMarkdown(chapter));
            const results = await Promise.all(promises);
            setParsedChapters(results);
            setLoading(false);
        };

        loadChapters();
    }, []);

    return { chapters: parsedChapters, loading };
}
