# Plan: Automate Markdown to TypeScript Conversion

## Overview
Automate the process of converting markdown lesson files to TypeScript and updating `chapters-constants.ts` to use the TS files instead of markdown paths.

## Current Manual Process
1. Edit markdown files in `public/data/*.md`
2. Run `npm run parse-chapter` for each file
3. Manually update `chapters-constants.ts` to import TS files and remove `markdownPath`

## Proposed Solution: GitHub Actions Workflow

### Why GitHub Actions?
- ✅ Runs automatically on push/PR
- ✅ Ensures consistency across all contributors
- ✅ Can validate changes before merge
- ✅ Works for both local and CI/CD environments
- ✅ Can be triggered manually if needed

### Alternative: Git Hooks
- ⚠️ Only runs locally (not for all contributors)
- ⚠️ Can be bypassed with `--no-verify`
- ✅ Faster feedback loop
- ✅ Can catch issues before push

## Recommended Approach: Hybrid Solution

### 1. Pre-commit Hook (Local Development)
**Purpose:** Catch issues early, provide fast feedback

**Location:** `.husky/pre-commit` or `.git/hooks/pre-commit`

**Actions:**
- Detect if any `public/data/*.md` files changed
- Run `npm run parse-chapter` for changed files
- Stage the generated TS files
- Optionally: Auto-update `chapters-constants.ts` (or warn if manual update needed)

**Benefits:**
- Fast feedback during development
- Prevents committing outdated TS files
- Can be skipped with `--no-verify` if needed

### 2. GitHub Actions Workflow (CI/CD)
**Purpose:** Ensure consistency, validate on PR, auto-update on merge

**Location:** `.github/workflows/sync-markdown-to-ts.yml`

**Triggers:**
- `push` to main branch
- `pull_request` (for validation)
- `workflow_dispatch` (manual trigger)

**Actions:**
1. Checkout code
2. Setup Node.js
3. Install dependencies
4. Find all `public/data/*.md` files (excluding test files)
5. For each markdown file:
   - Run `npm run parse-chapter` to generate TS file
   - Determine expected TS filename and constant name
6. Auto-update `chapters-constants.ts`:
   - Detect chapters with `markdownPath` pointing to converted files
   - Replace with TS imports
   - Remove `markdownPath` property
7. Commit and push changes (if on main branch)
8. Create PR comment (if on PR branch)

**Benefits:**
- Ensures all markdown files are converted
- Auto-updates chapter constants
- Validates changes in PRs
- Works for all contributors

## Implementation Details

### Step 1: Create Pre-commit Hook

**File:** `.husky/pre-commit` or `.git/hooks/pre-commit`

```bash
#!/bin/sh
# Get list of changed markdown files
CHANGED_MD_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep '^public/data/.*\.md$')

if [ -z "$CHANGED_MD_FILES" ]; then
  exit 0
fi

echo "🔄 Converting markdown files to TypeScript..."

for MD_FILE in $CHANGED_MD_FILES; do
  # Skip test files
  if [[ "$MD_FILE" == *"test"* ]]; then
    continue
  fi
  
  # Determine TS output path
  BASENAME=$(basename "$MD_FILE" .md)
  TS_FILE="data/${BASENAME}-lessons.ts"
  
  # Convert markdown to TypeScript
  npm run parse-chapter "$MD_FILE" "$TS_FILE"
  
  # Stage the generated TS file
  git add "$TS_FILE"
done

echo "✅ Markdown files converted to TypeScript"
```

### Step 2: Create GitHub Actions Workflow

**File:** `.github/workflows/sync-markdown-to-ts.yml`

```yaml
name: Sync Markdown to TypeScript

on:
  push:
    branches: [main]
    paths:
      - 'public/data/*.md'
      - 'data/chapters-constants.ts'
  pull_request:
    paths:
      - 'public/data/*.md'
  workflow_dispatch:

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - run: npm ci
      
      - name: Convert markdown to TypeScript
        run: |
          # Find all markdown files (excluding test files)
          for MD_FILE in public/data/*.md; do
            if [[ "$MD_FILE" == *"test"* ]]; then
              continue
            fi
            
            BASENAME=$(basename "$MD_FILE" .md)
            TS_FILE="data/${BASENAME}-lessons.ts"
            
            echo "Converting $MD_FILE to $TS_FILE"
            npm run parse-chapter "$MD_FILE" "$TS_FILE"
          done
      
      - name: Update chapters-constants.ts
        run: |
          # This would need a script to auto-update the imports
          node scripts/update-chapter-constants.js
      
      - name: Commit and push changes
        if: github.ref == 'refs/heads/main' && github.event_name == 'push'
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add data/*.ts
          git diff --staged --quiet || git commit -m "Auto-sync: Convert markdown to TypeScript"
          git push
```

### Step 3: Create Script to Update Chapter Constants

**File:** `scripts/update-chapter-constants.ts`

**Purpose:** Automatically update `chapters-constants.ts` to:
- Import TS files for chapters that have markdown files
- Remove `markdownPath` properties
- Add `lessons` properties with imported constants

**Logic:**
1. Read `chapters-constants.ts`
2. Find all markdown files in `public/data/`
3. For each markdown file:
   - Check if corresponding TS file exists
   - Check if chapter exists with `markdownPath` pointing to that MD file
   - If yes, update chapter to import TS file instead
4. Write updated file

### Step 4: Add npm Scripts

**File:** `package.json`

```json
{
  "scripts": {
    "sync-md-to-ts": "node scripts/sync-markdown-to-ts.js",
    "pre-commit": "husky run .husky/pre-commit"
  }
}
```

## Alternative: Simpler Approach

### Option A: Pre-push Hook Only
- Run conversion on pre-push
- Auto-update chapter constants
- Commit changes before push
- Simpler, but requires force-push handling

### Option B: GitHub Actions Only
- Skip local hooks
- Let CI handle everything
- Simpler setup, but slower feedback

## Implementation Steps

1. **Create pre-commit hook**
   - Install husky if not already: `npm install --save-dev husky`
   - Create `.husky/pre-commit` script
   - Test locally

2. **Create GitHub Actions workflow**
   - Create `.github/workflows/` directory
   - Add `sync-markdown-to-ts.yml`
   - Test with a test PR

3. **Create update script**
   - Create `scripts/update-chapter-constants.ts`
   - Parse and update `chapters-constants.ts` programmatically
   - Test manually

4. **Add npm scripts**
   - Add convenience scripts to `package.json`
   - Document usage

5. **Testing**
   - Test pre-commit hook with markdown changes
   - Test GitHub Actions with PR
   - Verify auto-commit works on main branch

## Edge Cases to Handle

1. **New markdown files**
   - Need to create new chapter entry in `chapters-constants.ts`
   - May need manual configuration for chapter metadata

2. **Deleted markdown files**
   - Should remove corresponding TS file
   - Should remove chapter entry (or mark as deprecated)

3. **Renamed markdown files**
   - Update TS filename
   - Update chapter constants

4. **Conflicts**
   - Handle merge conflicts in generated files
   - Regenerate after conflict resolution

## Recommended: Start with GitHub Actions

**Why:**
- More reliable (runs in clean environment)
- Works for all contributors
- Can be tested without affecting local setup
- Can add pre-commit hook later if needed

**Implementation Order:**
1. Create GitHub Actions workflow (validation only first)
2. Add auto-update script
3. Enable auto-commit on main branch
4. Optionally add pre-commit hook for faster local feedback

