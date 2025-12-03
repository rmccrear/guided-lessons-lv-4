import { Lesson } from '../types';
import { convertCleanMarkdownToLesson } from './markdown-parser';

/**
 * Split markdown content by ## headers into sections
 */
export function splitIntoSections(markdown: string): { frontmatter: string; sections: string[] } {
    // Prefix base path for asset links when deploying under a subfolder (GitHub Pages)
    const base = (import.meta as any).env?.BASE_URL || '/';
    const prefixed = markdown
        .replace(/\]\(\/(data|assets)\//g, `](${base}$1/`);

    // Extract frontmatter if present
    const frontMatterRegex = /^---\s*([\s\S]*?)\s*---\n/;
    const frontMatterMatch = prefixed.match(frontMatterRegex);
    
    let frontmatter = '';
    let content = prefixed;
    
    if (frontMatterMatch) {
        frontmatter = frontMatterMatch[0];
        content = prefixed.slice(frontMatterMatch[0].length);
    }
    
    // Split by ## headers (but not ###)
    const sections: string[] = [];
    const headerRegex = /^## (?!#)/gm;
    const matches = [...content.matchAll(headerRegex)];
    
    if (matches.length === 0) {
        // No sections, treat entire content as one lesson
        return { frontmatter, sections: [content] };
    }
    
    for (let i = 0; i < matches.length; i++) {
        const startIndex = matches[i].index!;
        const endIndex = i < matches.length - 1 ? matches[i + 1].index! : content.length;
        sections.push(content.slice(startIndex, endIndex).trim());
    }
    
    return { frontmatter, sections };
}

/**
 * Extract chapter metadata from frontmatter
 */
export function extractChapterMeta(frontmatter: string) {
    const getField = (key: string) => {
        const match = frontmatter.match(new RegExp(`${key}:\\s*(.*)`, 'm'));
        return match?.[1]?.trim() || '';
    };
    
    return {
        chapterId: getField('id'),
        id: getField('id'), // Alias for compatibility
        chapterTitle: getField('title'),
        type: getField('type') || 'exercise'
    };
}

/**
 * Generate a lesson ID from section title and chapter ID
 */
export function generateLessonId(sectionTitle: string, chapterId: string): string {
    const slug = sectionTitle
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
    
    return `${chapterId}-${slug}`;
}

/**
 * Parse markdown sections into lessons with auto-detection of types
 */
export function parseChapterSections(
    sections: string[],
    frontmatter: string,
    chapterMeta: { chapterId: string; type: string }
): Lesson[] {
    return sections.map((section, index) => {
        // Extract title from ## header FIRST
        const titleMatch = section.match(/^##\s+(.+)/m);
        const sectionTitle = titleMatch ? titleMatch[1].trim() : `Lesson ${index + 1}`;
        
        // Remove the ## header from section BEFORE parsing
        const sectionWithoutHeader = section.replace(/^##\s+.+\n/, '').trim();
        
        // Add frontmatter back to section for parsing
        const fullSection = frontmatter ? `${frontmatter}\n${sectionWithoutHeader}` : sectionWithoutHeader;
        
        // Now parse - this will correctly extract Show Me blocks from content
        const lesson = convertCleanMarkdownToLesson(fullSection);
        
        // Generate lesson ID
        lesson.id = generateLessonId(sectionTitle, chapterMeta.chapterId);
        lesson.title = sectionTitle;
        
        // Auto-detect lesson type based on title
        if (sectionTitle.toLowerCase().includes('challenge')) {
            lesson.type = 'challenge';
        } else if (sectionTitle.toLowerCase().includes('understanding')) {
            lesson.type = 'reading';
        } else {
            lesson.type = chapterMeta.type as Lesson['type'];
        }
        
        return lesson;
    });
}
