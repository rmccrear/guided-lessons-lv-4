#!/usr/bin/env tsx

import { readFileSync, writeFileSync } from 'fs';
import { resolve, basename, dirname } from 'path';
import { convertCleanMarkdownToLesson } from '../utils/markdown-parser';

const args = process.argv.slice(2);

if (args.length === 0) {
    console.error('Usage: npm run parse-lesson <path-to-markdown-file> [output-path]');
    console.error('Example: npm run parse-lesson ./data/markdown/lesson.md ./data/lesson.ts');
    console.error('If output path is omitted, TypeScript will be printed to stdout');
    process.exit(1);
}

const inputPath = resolve(args[0]);
const outputPath = args[1] ? resolve(args[1]) : null;

/**
 * Convert lesson ID to a valid constant name
 * e.g., "sql-joins-relationships" -> "SQL_JOINS_RELATIONSHIPS"
 */
function toConstantName(id: string): string {
    return id.toUpperCase().replace(/[^A-Z0-9]+/g, '_');
}

/**
 * Format the lesson object as a properly indented TypeScript source
 */
function formatLessonAsTypeScript(lesson: any, constantName: string): string {
    // We'll build the TS manually for better control over formatting
    const lines: string[] = [];
    
    lines.push(`import { Lesson } from '../types';`);
    lines.push('');
    lines.push(`export const ${constantName}: Lesson = {`);
    lines.push(`  id: ${JSON.stringify(lesson.id)},`);
    lines.push(`  title: ${JSON.stringify(lesson.title)},`);
    lines.push(`  description: ${JSON.stringify(lesson.description)},`);
    lines.push(`  type: ${JSON.stringify(lesson.type)},`);
    
    // Format content as a template literal for readability
    lines.push(`  content: \``);
    lines.push(lesson.content.replace(/`/g, '\\`').replace(/\$/g, '\\$'));
    lines.push(`\`,`);
    
    // Format code snippets if present
    if (lesson.codeSnippets && lesson.codeSnippets.length > 0) {
        lines.push(`  codeSnippets: [`);
        lesson.codeSnippets.forEach((snippet: any, index: number) => {
            lines.push(`    {`);
            lines.push(`      language: ${JSON.stringify(snippet.language)},`);
            lines.push(`      summary: ${JSON.stringify(snippet.summary)},`);
            lines.push(`      code: \``);
            lines.push(snippet.code.replace(/`/g, '\\`').replace(/\$/g, '\\$'));
            lines.push(`\`,`);
            lines.push(`      description: ${JSON.stringify(snippet.description)}`);
            lines.push(`    }${index < lesson.codeSnippets.length - 1 ? ',' : ''}`);
        });
        lines.push(`  ]`);
    }
    
    lines.push(`};`);
    lines.push('');
    
    return lines.join('\n');
}

try {
    const markdownContent = readFileSync(inputPath, 'utf-8');
    const lesson = convertCleanMarkdownToLesson(markdownContent);
    const constantName = toConstantName(lesson.id);
    const typescriptOutput = formatLessonAsTypeScript(lesson, constantName);
    
    if (outputPath) {
        writeFileSync(outputPath, typescriptOutput, 'utf-8');
        console.log(`✅ Successfully wrote lesson to ${outputPath}`);
        console.log(`   Constant name: ${constantName}`);
        console.log(`   Lesson ID: ${lesson.id}`);
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
