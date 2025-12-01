import { describe, it, expect } from 'vitest';
import { convertCleanMarkdownToLesson } from './markdown-parser';

describe('convertCleanMarkdownToLesson', () => {

    // 1. Metadata & Frontmatter Tests
    describe('Frontmatter Parsing', () => {
        it('extracts standard metadata correctly', () => {
            const input = `---
title: Advanced React Patterns
description: Learn about compound components
type: challenge
id: react-patterns-101
---
# Welcome to the lesson
`;
            const result = convertCleanMarkdownToLesson(input);

            expect(result.title).toBe('Advanced React Patterns');
            expect(result.description).toBe('Learn about compound components');
            expect(result.type).toBe('challenge');
            expect(result.id).toBe('react-patterns-101');
            expect(result.content).toBe('# Welcome to the lesson');
        });

        it('ignores extra whitespace in frontmatter', () => {
            const input = `---
title:   Spaced Out   
type:    exercise
---
Content`;
            const result = convertCleanMarkdownToLesson(input);
            expect(result.title).toBe('Spaced Out'); // Should trim values
            expect(result.type).toBe('exercise');
        });
    });

    // 2. Default Values & Edge Cases
    describe('Defaults & Fallbacks', () => {
        it('applies defaults when frontmatter is missing', () => {
            const input = `# Just raw markdown content`;
            const result = convertCleanMarkdownToLesson(input);

            expect(result.title).toBe('Untitled');
            expect(result.type).toBe('reading');
            expect(result.id).toBe('untitled'); // Auto-generated from title
            expect(result.content).toBe('# Just raw markdown content');
        });

        it('auto-generates an ID slug from the title if ID is missing', () => {
            const input = `---
title: Hello World! Lesson 1
---
Content`;
            const result = convertCleanMarkdownToLesson(input);
            // Expect: lowercase, spaces to dashes, special chars removed
            expect(result.id).toBe('hello-world-lesson-1');
        });

        it('falls back to "reading" type for invalid or missing types', () => {
            const input = `---
title: Test
type: invalid-type-name
---
Content`;
            const result = convertCleanMarkdownToLesson(input);
            expect(result.type).toBe('reading');
        });
    });

    // 3. Hidden Code Snippet Extraction
    describe('Hidden Snippet Extraction', () => {
        it('extracts hidden snippets and removes them from content', () => {
            const input = `
# Problem
Here is the problem.

\`\`\`ts:Solution Code
const a = 1;
\`\`\`

End of lesson.
`;
            const result = convertCleanMarkdownToLesson(input);

            // 1. Check Snippet Extraction
            expect(result.codeSnippets).toBeDefined();
            expect(result.codeSnippets).toHaveLength(1);
            expect(result.codeSnippets![0]).toEqual({
                language: 'ts',
                summary: 'Solution Code',
                code: 'const a = 1;',
                description: 'Snippet for: Solution Code'
            });

            // 2. Check Content Cleaning (Snippet should be gone)
            expect(result.content).not.toContain('```ts:Solution Code');
            expect(result.content).toContain('# Problem');
            expect(result.content).toContain('End of lesson.');
        });

        it('handles multiple snippets in one file', () => {
            const input = `
Start
\`\`\`js:Hint 1
console.log('hint');
\`\`\`
Middle
\`\`\`py:Solution
print('done')
\`\`\`
End
`;
            const result = convertCleanMarkdownToLesson(input);
            expect(result.codeSnippets).toHaveLength(2);
            expect(result.codeSnippets![0].language).toBe('js');
            expect(result.codeSnippets![1].language).toBe('py');
        });
    });

    // 4. PATHOLOGICAL & STRESS TESTS
    describe('Pathological & Edge Cases', () => {

        describe('Frontmatter Nightmares', () => {
            it('handles colons inside property values', () => {
                // The parser shouldn't split on the second colon
                const input = `---
title: Phase 1: The Beginning
description: Note: This is tricky
---
Content`;
                const result = convertCleanMarkdownToLesson(input);
                expect(result.title).toBe('Phase 1: The Beginning');
                expect(result.description).toBe('Note: This is tricky');
            });

            it('handles empty property values gracefully', () => {
                const input = `---
title: 
description:
---
Content`;
                const result = convertCleanMarkdownToLesson(input);
                expect(result.title).toBe('Untitled'); // Should fallback
            });

            it('ignores frontmatter that does not start at the very first character', () => {
                // If there is a newline before ---, it's not frontmatter, it's content.
                const input = `
---
title: I am content
---
`;
                const result = convertCleanMarkdownToLesson(input);
                expect(result.title).toBe('Untitled');
                expect(result.content).toContain('title: I am content');
            });

            it('survives malformed frontmatter (no closing dashes)', () => {
                const input = `---
title: Forever Open
Content starts here...`;

                // Behavior depends on implementation, but it shouldn't crash.
                // Ideally, it treats the whole thing as content if the regex doesn't match.
                const result = convertCleanMarkdownToLesson(input);
                expect(result.content).toContain('title: Forever Open');
            });
        });

        describe('ID Generation Stress', () => {
            it('sanitizes dangerous characters and emojis from generated IDs', () => {
                const input = `---
title: I ❤️ React & TypeScript! (v2.0)
---
`;
                const result = convertCleanMarkdownToLesson(input);
                // "I ❤️ React & TypeScript! (v2.0)" -> "i-react-typescript-v2-0"
                // Expectation: non-word chars are stripped/replaced
                expect(result.id).not.toContain('❤️');
                expect(result.id).not.toContain('&');
                expect(result.id).toMatch(/^[a-z0-9-]+$/);
            });

            it('handles titles that are entirely special characters', () => {
                const input = `---
title: ??? !!!
---
`;
                const result = convertCleanMarkdownToLesson(input);
                // Should probably result in an empty string or just dashes, 
                // but crucially, IT SHOULD NOT CRASH.
                expect(result.id).toBeDefined();
            });
        });

        describe('Snippet Regex Vulnerabilities', () => {
            it('handles snippets containing backticks (nested code)', () => {
                // This typically breaks lazy regex matching ([\s\S]*?)
                const input = `
\`\`\`ts:Meta Code
const code = \`console.log("hello")\`;
\`\`\`
`;
                const result = convertCleanMarkdownToLesson(input);
                expect(result.codeSnippets).toHaveLength(1);
                expect(result.codeSnippets![0].code).toContain('`console.log("hello")`');
            });

            it('handles snippets with extra spaces in the header', () => {
                // "ts : Summary" instead of "ts:Summary"
                const input = `
\`\`\`ts :  Spaced Out Summary  
const x = 1;
\`\`\`
`;
                const result = convertCleanMarkdownToLesson(input);
                expect(result.codeSnippets).toHaveLength(1);
                expect(result.codeSnippets![0].summary).toBe('Spaced Out Summary');
            });

            it('ignores standard markdown code blocks (no colon syntax)', () => {
                const input = `
Here is normal code:
\`\`\`ts
console.log('I should stay in content');
\`\`\`
`;
                const result = convertCleanMarkdownToLesson(input);
                // Should NOT extract this as a snippet
                expect(result.codeSnippets).toBeUndefined();
                expect(result.content).toContain("console.log('I should stay in content');");
            });

            it('handles empty code blocks', () => {
                const input = `
\`\`\`js:Empty
\`\`\`
`;
                const result = convertCleanMarkdownToLesson(input);
                expect(result.codeSnippets).toHaveLength(1);
                expect(result.codeSnippets![0].code).toBe('');
            });
        });
    });

});