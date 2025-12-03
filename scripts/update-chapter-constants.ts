#!/usr/bin/env tsx

import { readFileSync, writeFileSync } from 'fs';
import { resolve, basename } from 'path';
import { glob } from 'glob';

// Convention: chapter.slug must match the markdown filename (without .md)
// This allows us to eliminate brittle filename→chapter ID mappings.

/**
 * Map markdown filename to expected constant name
 * Filename (without .md) should match the frontmatter id
 */
function getConstantName(mdFilename: string): string {
  const mdFile = basename(mdFilename, '.md');
  // Convert kebab-case to UPPER_SNAKE_CASE
  return mdFile
    .toUpperCase()
    .replace(/-/g, '_')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2') + '_LESSONS';
}

/**
 * Map markdown filename to TS import path
 * The generated TS file uses the markdown filename (without .md) + '-lessons.ts'
 */
function getTSImportPath(mdFilename: string): string {
  const mdFile = basename(mdFilename, '.md');
  return `./${mdFile}-lessons`;
}

/**
 * Read and parse chapters-constants.ts
 */
function readChaptersConstants(): string {
  const filePath = resolve('data/chapters-constants.ts');
  return readFileSync(filePath, 'utf-8');
}

/**
 * Update chapters-constants.ts to use TS imports (production mode)
 */
function updateToTSMode(): void {
  const content = readChaptersConstants();
  const mdFiles = glob.sync('public/data/*.md', { ignore: ['**/test*.md'] });
  
  let updatedContent = content;
  const newImports: string[] = [];
  const existingConstants = new Set<string>();
  
  // Extract existing import constants
  const importRegex = /import\s+\{\s*([^}]+)\s*\}\s+from/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const constantName = match[1].trim();
    existingConstants.add(constantName);
  }
  
  // Process each markdown file
  for (const mdFile of mdFiles) {
    const mdFilename = basename(mdFile);
    const mdSlug = basename(mdFile, '.md');
    
    const constantName = getConstantName(mdFilename);
    const importPath = getTSImportPath(mdFilename);
    const importStatement = `import { ${constantName} } from '${importPath}';`;
    
    // Add import if not already present
    if (!existingConstants.has(constantName)) {
      newImports.push(importStatement);
    }
    
    // Find chapter object and replace its properties section
    // Find chapter object by matching slug to md filename
    const chapterRegex = new RegExp(
      `(\\{\\s*id:\\s*['"][^'"]*['"],\\s*slug:\\s*['"]${mdSlug}['"],\\s*title:\\s*['"][^'"]*['"],\\s*description:\\s*['"][^'"]*['"])([^}]*)(\\})`,
      'gs'
    );
    
    updatedContent = updatedContent.replace(chapterRegex, (match, header, properties, closeBrace) => {
      // Replace entire properties section with just the lessons constant
      return `${header},\n    lessons: ${constantName}\n  ${closeBrace}`;
    });
  }
  
  // Add new imports after the Chapter import
  if (newImports.length > 0) {
    const typeImportMatch = content.match(/import\s+\{[^}]*Chapter[^}]*\}\s+from[^;]+;/);
    if (typeImportMatch) {
      const insertPos = typeImportMatch.index! + typeImportMatch[0].length;
      updatedContent = 
        updatedContent.slice(0, insertPos) + '\n' +
        newImports.join('\n') +
        updatedContent.slice(insertPos);
    }
  }
  
  // Clean up any duplicate empty lines
  updatedContent = updatedContent.replace(/\n\n\n+/g, '\n\n');
  
  // Write updated file
  const filePath = resolve('data/chapters-constants.ts');
  writeFileSync(filePath, updatedContent, 'utf-8');
  console.log('✅ Updated chapters-constants.ts to use TypeScript imports (production mode)');
  console.log(`   Added ${newImports.length} new import(s)`);
}

/**
 * Update chapters-constants.ts to use markdownPath (dev mode)
 */
function updateToDevMode(): void {
  const content = readChaptersConstants();
  const mdFiles = glob.sync('public/data/*.md', { ignore: ['**/test*.md'] });
  
  let updatedContent = content;
  const importsToRemove = new Set<string>();
  
  // Process each markdown file
  for (const mdFile of mdFiles) {
    const mdFilename = basename(mdFile);
    const mdSlug = basename(mdFile, '.md');
    
    const constantName = getConstantName(mdFilename);
    const markdownPath = `/data/${mdFilename}`;
    
    // Mark import for removal
    importsToRemove.add(constantName);
    
    // Find chapter object - more flexible regex that handles multiline
    const chapterRegex = new RegExp(
      `(\\{[^}]*slug:\\s*['"]${mdSlug}['"][^}]*?)(?:lessons:\\s*(?:${constantName}|\\[\\]))?([^}]*?)(\\})`,
      'gs'
    );
    
    updatedContent = updatedContent.replace(chapterRegex, (match, before, middle, closeBrace) => {
      // Remove any existing lessons or markdownPath properties
      let cleaned = before + middle;
      cleaned = cleaned.replace(/\s*,?\s*lessons:\s*[A-Z_]+/g, '');
      cleaned = cleaned.replace(/\s*,?\s*markdownPath:\s*['"][^'"]*['"]/g, '');
      
      // Ensure proper comma before new properties
      if (!cleaned.trimEnd().endsWith(',')) {
        cleaned = cleaned.trimEnd() + ',';
      }
      
      // Add dev mode properties
      return `${cleaned}\n    lessons: [],\n    markdownPath: '${markdownPath}'\n  ${closeBrace}`;
    });
  }
  
  // Remove imports for constants we're no longer using
  for (const constantName of importsToRemove) {
    // Remove the entire import line
    const importLineRegex = new RegExp(
      `import\\s*\\{\\s*${constantName}\\s*\\}\\s*from\\s*['"][^'"]+['"];?\\s*\n`,
      'g'
    );
    updatedContent = updatedContent.replace(importLineRegex, '');
    
    // Also handle imports with multiple items (rare but possible)
    const multiImportRegex = new RegExp(
      `(import\\s*\\{[^}]*),\\s*${constantName}\\s*([^}]*\\}\\s*from)`,
      'g'
    );
    updatedContent = updatedContent.replace(multiImportRegex, '$1$2');
    
    updatedContent = updatedContent.replace(
      new RegExp(`(import\\s*\\{[^}]*)\\s*${constantName}\\s*,([^}]*\\}\\s*from)`, 'g'),
      '$1$2'
    );
  }
  
  // Clean up any duplicate empty lines
  updatedContent = updatedContent.replace(/\n\n\n+/g, '\n\n');
  
  // Write updated file
  const filePath = resolve('data/chapters-constants.ts');
  writeFileSync(filePath, updatedContent, 'utf-8');
  console.log('✅ Updated chapters-constants.ts to use markdown paths (dev mode)');
  console.log(`   Converted ${importsToRemove.size} chapter(s) to markdown mode`);
}

// Main execution
const args = process.argv.slice(2);
const mode = args[0] || 'production';

if (mode === 'dev' || mode === 'development') {
  updateToDevMode();
} else {
  updateToTSMode();
}
