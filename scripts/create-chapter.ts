#!/usr/bin/env tsx
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get arguments from command line
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('❌ Error: Please provide a chapter name');
  console.log('\nUsage: npm run create-chapter "Chapter Name"');
  console.log('Example: npm run create-chapter "Deploy with Render"');
  process.exit(1);
}

const chapterName = args.join(' ');

// Generate slug from chapter name
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

const slug = slugify(chapterName);
const filename = `${slug}.md`;
const filepath = path.join(__dirname, '../public/data', filename);

// Check if file already exists
if (fs.existsSync(filepath)) {
  console.error(`❌ Error: Chapter file already exists: ${filename}`);
  process.exit(1);
}

// Create markdown stub
const markdownStub = `---
id: ${slug}
title: ${chapterName}
type: exercise
description: TODO: Add a description for this chapter
---

# ${chapterName}

TODO: Add an introduction to this chapter.

## Section 1

TODO: Add content for this section.

### Instructions

1. TODO: Add step 1
2. TODO: Add step 2
3. TODO: Add step 3

## Section 2

TODO: Add content for the next section.

## Challenge: Apply Your Knowledge

**Goal:** TODO: Define the challenge goal.

### The Task

TODO: Describe what the learner needs to accomplish.

### Instructions

1. TODO: Add instruction 1
2. TODO: Add instruction 2

## Lesson Complete! 🎉

**Congratulations!** You have completed this lesson.

### Summary

You learned the following skills:

- TODO: Add skill 1
- TODO: Add skill 2
- TODO: Add skill 3

### Next Steps

TODO: Suggest what to explore next.
`;

// Write the file
fs.writeFileSync(filepath, markdownStub, 'utf-8');
console.log(`✅ Created chapter stub: public/data/${filename}`);

// Now update chapters-constants.ts
const constantsPath = path.join(__dirname, '../data/chapters-constants.ts');
const constantsContent = fs.readFileSync(constantsPath, 'utf-8');

// Create the new chapter entry
const newChapterEntry = `  {
    id: '${slug}',
    slug: '${slug}',
    title: '${chapterName}',
    description: 'TODO: Add a description for this chapter',
    lessons: [],
    markdownPath: '/data/${filename}'
  }`;

// Find the last chapter entry and add after it
const lastBracketIndex = constantsContent.lastIndexOf('}');
const beforeLastBracket = constantsContent.substring(0, lastBracketIndex + 1);
const afterLastBracket = constantsContent.substring(lastBracketIndex + 1);

// Check if we need to add a comma before the new entry
const needsComma = !beforeLastBracket.trim().endsWith(',');
const updatedContent = beforeLastBracket + (needsComma ? ',' : '') + '\n' + newChapterEntry + afterLastBracket;

fs.writeFileSync(constantsPath, updatedContent, 'utf-8');
console.log(`✅ Added chapter to: data/chapters-constants.ts`);

console.log('\n📝 Next steps:');
console.log(`   1. Edit public/data/${filename} to add your content`);
console.log(`   2. Run 'npm run dev' to see your chapter in dev mode`);
console.log(`   3. Run 'npm run sync-chapters:prod' when ready to build for production`);
