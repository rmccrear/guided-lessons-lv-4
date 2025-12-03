#!/usr/bin/env tsx

import { readFileSync, writeFileSync } from 'fs';
import { resolve, basename } from 'path';
import { glob } from 'glob';
import { splitIntoSections, extractChapterMeta, parseChapterSections } from '../utils/chapter-parser';

/**
 * Convert lesson ID to a valid constant name
 */
function toConstantName(id: string): string {
    return id.toUpperCase().replace(/[^A-Z0-9]+/g, '_');
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

/**
 * Process a single markdown file
 */
function processMarkdownFile(inputPath: string): void {
    const markdownContent = readFileSync(inputPath, 'utf-8');
    const { frontmatter, sections } = splitIntoSections(markdownContent);
    const chapterMeta = extractChapterMeta(frontmatter);
    
    if (!chapterMeta.chapterId) {
        console.warn(`⚠️  No chapter ID found in ${basename(inputPath)}, skipping`);
        return;
    }
    
    console.log(`\n📚 Processing ${basename(inputPath)}: ${chapterMeta.chapterTitle}`);
    console.log(`   Found ${sections.length} section(s)`);
    
    // Use shared parser
    const lessons = parseChapterSections(sections, frontmatter, {
        chapterId: chapterMeta.chapterId,
        type: chapterMeta.type
    });
    
    // Log each lesson
    lessons.forEach(lesson => {
        console.log(`   ✓ ${lesson.id}: ${lesson.title}`);
    });
    
    // Generate output filename from markdown filename
    const mdFilename = basename(inputPath, '.md');
    const outputPath = resolve('data', `${mdFilename}-lessons.ts`);
    const constantName = toConstantName(mdFilename + '_LESSONS');
    const typescriptOutput = formatLessonsAsTypeScript(lessons, constantName);
    
    writeFileSync(outputPath, typescriptOutput, 'utf-8');
    console.log(`   ✅ Wrote ${lessons.length} lessons to data/${mdFilename}-lessons.ts`);
}

/**
 * Main execution: Find and process all markdown files
 */
try {
    const mdFiles = glob.sync('public/data/*.md', { ignore: ['**/test*.md'] });
    
    if (mdFiles.length === 0) {
        console.log('No markdown files found in public/data/');
        process.exit(0);
    }
    
    console.log(`🔄 Parsing ${mdFiles.length} markdown file(s)...`);
    
    for (const mdFile of mdFiles) {
        processMarkdownFile(mdFile);
    }
    
    console.log(`\n✅ Successfully processed ${mdFiles.length} chapter(s)`);
} catch (error) {
    if (error instanceof Error) {
        console.error(`❌ Error: ${error.message}`);
    } else {
        console.error('❌ An unknown error occurred');
    }
    process.exit(1);
}
