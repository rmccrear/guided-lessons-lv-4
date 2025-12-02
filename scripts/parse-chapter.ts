#!/usr/bin/env tsx

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { convertCleanMarkdownToLesson } from '../utils/markdown-parser';

const args = process.argv.slice(2);

if (args.length === 0) {
    console.error('Usage: npm run parse-chapter <path-to-markdown-file> [output-path]');
    console.error('Example: npm run parse-chapter ./data/markdown/chapter.md ./data/chapter-lessons.ts');
    console.error('Splits markdown by ## headers into multiple lessons');
    process.exit(1);
}

const inputPath = resolve(args[0]);
const outputPath = args[1] ? resolve(args[1]) : null;

/**
 * Convert lesson ID to a valid constant name
 */
function toConstantName(id: string): string {
    return id.toUpperCase().replace(/[^A-Z0-9]+/g, '_');
}

/**
 * Split markdown content by ## headers into sections
 */
function splitIntoSections(markdown: string): { frontmatter: string; sections: string[] } {
    // Extract frontmatter if present
    const frontMatterRegex = /^---\s*([\s\S]*?)\s*---\n/;
    const frontMatterMatch = markdown.match(frontMatterRegex);
    
    let frontmatter = '';
    let content = markdown;
    
    if (frontMatterMatch) {
        frontmatter = frontMatterMatch[0];
        content = markdown.slice(frontMatterMatch[0].length);
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
function extractChapterMeta(frontmatter: string) {
    const getField = (key: string) => {
        const match = frontmatter.match(new RegExp(`${key}:\\s*(.*)`, 'm'));
        return match?.[1]?.trim() || '';
    };
    
    return {
        chapterId: getField('id'),
        chapterTitle: getField('title'),
        type: getField('type') || 'exercise'
    };
}

/**
 * Generate a lesson ID from section title
 */
function generateLessonId(sectionTitle: string, chapterId: string, index: number): string {
    // Extract title from ## Header
    const titleMatch = sectionTitle.match(/^##\s+(.+)/m);
    const title = titleMatch ? titleMatch[1].trim() : `lesson-${index + 1}`;
    
    // Convert to slug
    const slug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
    
    return `${chapterId}-${slug}`;
}

/**
 * Format lessons array as TypeScript
 */
function formatLessonsAsTypeScript(lessons: any[], constantName: string): string {
    const lines: string[] = [];
    
    lines.push(`import { Lesson } from '../types';`);
    lines.push('');
    lines.push(`export const ${constantName}: Lesson[] = [`);
    
    lessons.forEach((lesson, index) => {
        lines.push(`  {`);
        lines.push(`    id: ${JSON.stringify(lesson.id)},`);
        lines.push(`    title: ${JSON.stringify(lesson.title)},`);
        lines.push(`    description: ${JSON.stringify(lesson.description)},`);
        lines.push(`    type: ${JSON.stringify(lesson.type)},`);
        lines.push(`    content: \``);
        lines.push(lesson.content.replace(/`/g, '\\`').replace(/\$/g, '\\$'));
        lines.push(`\``);
        
        if (lesson.codeSnippets && lesson.codeSnippets.length > 0) {
            lines.push(`    ,codeSnippets: [`);
            lesson.codeSnippets.forEach((snippet: any, idx: number) => {
                lines.push(`      {`);
                lines.push(`        language: ${JSON.stringify(snippet.language)},`);
                lines.push(`        summary: ${JSON.stringify(snippet.summary)},`);
                lines.push(`        code: \``);
                lines.push(snippet.code.replace(/`/g, '\\`').replace(/\$/g, '\\$'));
                lines.push(`\`,`);
                lines.push(`        description: ${JSON.stringify(snippet.description)}`);
                lines.push(`      }${idx < lesson.codeSnippets.length - 1 ? ',' : ''}`);
            });
            lines.push(`    ]`);
        }
        
        lines.push(`  }${index < lessons.length - 1 ? ',' : ''}`);
    });
    
    lines.push(`];`);
    lines.push('');
    
    return lines.join('\n');
}

try {
    const markdownContent = readFileSync(inputPath, 'utf-8');
    const { frontmatter, sections } = splitIntoSections(markdownContent);
    const chapterMeta = extractChapterMeta(frontmatter);
    
    console.log(`📚 Found ${sections.length} section(s) in chapter`);
    
    const lessons = sections.map((section, index) => {
        // Add frontmatter back to each section for parsing
        const fullSection = frontmatter ? `${frontmatter}\n${section}` : section;
        const lesson = convertCleanMarkdownToLesson(fullSection);
        
        // Override ID to include chapter prefix and extract title from ##
        const titleMatch = section.match(/^##\s+(.+)/m);
        const sectionTitle = titleMatch ? titleMatch[1].trim() : `Lesson ${index + 1}`;
        
        lesson.id = generateLessonId(section, chapterMeta.chapterId, index);
        lesson.title = sectionTitle;
        
        // Auto-detect challenge type if title contains "Challenge"
        if (sectionTitle.toLowerCase().includes('challenge')) {
            lesson.type = 'challenge';
        } else {
            lesson.type = chapterMeta.type as any;
        }
        
        // Remove the ## header from content since title is extracted
        lesson.content = section.replace(/^##\s+.+\n/, '').trim();
        
        console.log(`  ✓ ${lesson.id}: ${lesson.title}`);
        
        return lesson;
    });
    
    const constantName = toConstantName(chapterMeta.chapterId + '_LESSONS');
    const typescriptOutput = formatLessonsAsTypeScript(lessons, constantName);
    
    if (outputPath) {
        writeFileSync(outputPath, typescriptOutput, 'utf-8');
        console.log(`\n✅ Successfully wrote ${lessons.length} lessons to ${outputPath}`);
        console.log(`   Constant name: ${constantName}`);
        console.log(`   Chapter ID: ${chapterMeta.chapterId}`);
    } else {
        console.log(typescriptOutput);
    }
} catch (error) {
    if (error instanceof Error) {
        console.error(`Error: ${error.message}`);
    } else {
        console.error('An unknown error occurred');
    }
    process.exit(1);
}
