import { Lesson, CodeSnippet } from '../types';

export const convertCleanMarkdownToLesson = (rawInput: string): Lesson => {
    let content = rawInput;
    const codeSnippets: CodeSnippet[] = [];

    // 1. Parse Frontmatter
    const frontMatterRegex = /^---\s*([\s\S]*?)\s*---/;
    const frontMatterMatch = content.match(frontMatterRegex);

    let title = "Untitled";
    let description = "";
    let type: Lesson['type'] = 'reading';
    let id = "";

    if (frontMatterMatch) {
        const rawFM = frontMatterMatch[1];
        const getField = (key: string) => rawFM.match(new RegExp(`${key}:\\s*(.*)`))?.[1].trim();

        title = getField('title') || title;
        description = getField('description') || description;
        id = getField('id') || title.toLowerCase().replace(/[^\w]+/g, '-');
        const parsedType = getField('type');
        if (parsedType && ['reading', 'exercise', 'challenge', 'setup'].includes(parsedType)) {
            type = parsedType as Lesson['type'];
        }

        // Remove frontmatter
        content = content.replace(frontMatterRegex, '').trim();
    } else {
        // No frontmatter: generate ID from default title
        id = title.toLowerCase().replace(/[^\w]+/g, '-');
    }

    // 2. Extract "Hidden" Snippets
    // Regex: Looks for ```lang:Summary Text ...code... ```
    // Group 1: Language
    // Group 2: Summary/Button Label
    // Group 3: Code Content
    const hiddenSnippetRegex = /```(\w+):([^\n]+)\n([\s\S]*?)```/g;

    content = content.replace(hiddenSnippetRegex, (match, language, summary, code) => {
        codeSnippets.push({
            language: language.trim(),
            summary: summary.trim(), // The text after the colon
            code: code.trim(),
            description: `Snippet for: ${summary.trim()}`
        });

        // Remove from the visible content
        return '';
    });

    return {
        id,
        title,
        description,
        content, // Now contains only markdown + visible code blocks
        type,
        codeSnippets: codeSnippets.length > 0 ? codeSnippets : undefined
    };
};