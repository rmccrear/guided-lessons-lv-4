# Plan: Automate Markdown to TypeScript Conversion

## Overview
Automate the process of converting markdown lesson files to TypeScript and updating `chapters-constants.ts` to use the TS files instead of markdown paths.

## Current State

✅ **Completed:**
- Created `scripts/update-chapter-constants.ts` to automate mode switching
- Added `npm run sync-chapters:dev` - switches to markdown mode (dev)
- Added `npm run sync-chapters:prod` - switches to TypeScript mode (production)
- Established convention: markdown filename === frontmatter id
- Renamed files to match IDs:
  - `sql-joins-relationships.md`
  - `express-server-setup.md`
  - `persistence-with-supabase.md`

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

## Recommended Approach: GitHub Actions

### GitHub Actions Workflow (CI/CD)
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
- Consistent environment for all builds

## Implementation Details

### GitHub Actions Workflow

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
      
      - name: Convert markdown to TypeScript and update chapters
        run: npm run sync-chapters:prod
      
      - name: Commit and push changes
        if: github.ref == 'refs/heads/main' && github.event_name == 'push'
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add data/*.ts
          git diff --staged --quiet || git commit -m "Auto-sync: Convert markdown to TypeScript"
          git push
```

### Update Chapter Constants Script

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

### NPM Scripts

✅ **COMPLETED** - Scripts added to `package.json`

**Current scripts:**
```json
{
  "scripts": {
    "sync-chapters:dev": "tsx scripts/update-chapter-constants.ts dev",
    "sync-chapters:prod": "tsx scripts/update-chapter-constants.ts production"
  }
}
```

**Original plan:**
```json
{
  "scripts": {
    "sync-md-to-ts": "node scripts/sync-markdown-to-ts.js"
  }
}
```

## Implementation Steps

1. **Create GitHub Actions workflow**
   - Create `.github/workflows/` directory
   - Add `sync-markdown-to-ts.yml`
   - Configure to run `npm run sync-chapters:prod`
   - Test with a test PR

2. **Add npm scripts** ✅ DONE
   - Add convenience scripts to `package.json`
   - Document usage

3. **Testing**
   - Test GitHub Actions with PR
   - Verify auto-commit works on main branch
   - Ensure generated files are correct

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

## Recommended: GitHub Actions Only

**Why:**
- More reliable (runs in clean environment)
- Works for all contributors
- No local setup required
- Can be tested without affecting local workflow
- Consistent build environment

**Implementation Order:**
1. Create GitHub Actions workflow ⬅️ NEXT STEP
2. Test with validation only first
3. Enable auto-commit on main branch
4. Monitor and refine as needed

