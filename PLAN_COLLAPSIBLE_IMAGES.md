# Plan: Collapsible Image Support

## Overview
Add support for collapsible/hidden images in markdown content, similar to the existing "Show Me" code snippet functionality.

## Recommended Approach: ReactMarkdown Component-Based
**Use ReactMarkdown's custom component system** to detect and render collapsible images inline. This approach:
- ✅ Requires no parser changes
- ✅ No type definition changes
- ✅ Works directly with markdown files
- ✅ Generic "Show Me" pattern can be extended to other elements
- ✅ Simpler implementation

## Current State
- Code snippets can be hidden using syntax: ` ```lang:Show Me: Summary Text ...code... ``` `
- These are extracted by `markdown-parser.ts` and rendered as collapsible `CodeSnippetItem` components
- Images are currently rendered directly using ReactMarkdown's `img` component
- We'll extend the `img` component to detect `:Show Me:` pattern in alt text

## Proposed Solution (ReactMarkdown-Based)

### 1. Markdown Syntax
Use a special syntax in the alt text to indicate collapsible images:
```
![alt text:Show Me: Summary Text](/path/to/image.png)
```

**Example:**
```
![A database schema diagram:Show Me: The 3-Way JOIN Schema](/assets/sql-join/sql-movie-casting-actor-join-schema.png)
```

**Pattern:** `![<alt>:Show Me:<summary>](<src>)`
- Everything before `:Show Me:` becomes the image alt text
- Everything after `:Show Me:` becomes the button summary text
- The image path is the standard markdown image src

### 2. Component Updates (`components/LessonView.tsx`)

#### Create `CollapsibleImageItem` Component
- Similar structure to `CodeSnippetItem`
- Toggle button with "Show Me: {summary}" label
- Image displayed when expanded
- Use Image icon from lucide-react (instead of Eye)
- Styling consistent with CodeSnippetItem (yellow theme for collapsible)

#### Update ReactMarkdown `img` Component
- Check if alt text contains `:Show Me:` pattern
- Parse: `alt.match(/^(.+?):Show Me:(.+)$/)`
- If pattern found: render `CollapsibleImageItem` with parsed alt and summary
- If no pattern: render regular `<img>` tag

### 3. Implementation Steps

1. **Create `CollapsibleImageItem` component** in `LessonView.tsx`
   - Props: `src`, `alt`, `summary`
   - State: `isOpen` (defaults to `false` for collapsible)
   - Toggle button with yellow theme
   - Image container with proper styling

2. **Update `img` component** in ReactMarkdown
   - Parse alt text for `:Show Me:` pattern
   - Extract alt and summary from match
   - Conditionally render `CollapsibleImageItem` or regular `<img>`

3. **Update markdown files**
   - Convert images to collapsible format where needed
   - Example: `![alt:Show Me: Schema Diagram](/path/image.png)`

### 4. No Type or Parser Changes Needed!
- Works directly with existing markdown
- No changes to `types.ts`
- No changes to `markdown-parser.ts`
- Images handled inline during rendering

### 5. Styling Details
- Use same yellow theme as CodeSnippetItem for consistency
- Border: `border-yellow-600/30 bg-yellow-900/10`
- Button: `bg-yellow-900/20 hover:bg-yellow-900/30 text-yellow-400`
- Image container: padding and rounded corners
- Animation: fadeIn when expanding
- Image styling: `max-w-full h-auto rounded-lg border border-gray-700`

### 6. Testing
- Test with existing markdown files
- Verify collapsible images render correctly
- Verify regular images still render normally (no `:Show Me:` pattern)
- Test with multiple collapsible images in one lesson
- Verify toggle functionality works
- Test edge cases (missing alt, malformed pattern)

### 7. Migration
- Update `sql-join-lesson.md` to use collapsible syntax for the movie schema diagram:
  ```
  ![A database schema diagram:Show Me: The 3-Way JOIN Schema](/assets/sql-join/sql-movie-casting-actor-join-schema.png)
  ```
- Keep other images as regular (non-collapsible) images

## Alternative Approach (Simpler) - **RECOMMENDED**
Use ReactMarkdown's custom component system to handle "Show Me" images inline:

### Benefits:
- ✅ No parser changes needed
- ✅ Works directly with markdown files
- ✅ Simpler implementation
- ✅ Generic "Show Me" pattern can be reused for other elements
- ✅ Images stay in their natural markdown position

### Implementation:
1. **Update `img` component in ReactMarkdown**
   - Check if `alt` text contains `:Show Me:`
   - Parse pattern: `![alt text:Show Me: summary](src)`
   - If pattern found, render `CollapsibleImageItem` instead of regular `<img>`
   - If no pattern, render regular image

2. **Create `CollapsibleImageItem` component**
   - Similar to `CodeSnippetItem` but for images
   - Extract alt text and summary from parsed pattern
   - Use Image icon from lucide-react
   - Same yellow theme styling

3. **Markdown Syntax** (unchanged)
   ```
   ![alt text:Show Me: Summary Text](/path/to/image.png)
   ```

### Code Structure:
```typescript
img: ({ node, alt, src, ...props }: any) => {
  // Check for "Show Me" pattern in alt text
  const showMeMatch = alt?.match(/^(.+?):Show Me:(.+)$/);
  
  if (showMeMatch) {
    const [, imageAlt, summary] = showMeMatch;
    return (
      <CollapsibleImageItem
        src={src}
        alt={imageAlt.trim()}
        summary={summary.trim()}
      />
    );
  }
  
  // Regular image
  return <img className="..." alt={alt} src={src} {...props} />;
}
```

### Generic "Show Me" Pattern
This approach can be extended to other markdown elements:
- Images: `![alt:Show Me: summary](src)`
- Code blocks: Already implemented
- Future: Tables, blockquotes, etc.

## Implementation Steps (Simplified)

1. **Create `CollapsibleImageItem` component** in `LessonView.tsx`
   - Similar structure to `CodeSnippetItem`
   - Accepts `src`, `alt`, `summary` props
   - Toggle functionality with yellow theme

2. **Update `img` component** in ReactMarkdown
   - Parse alt text for `:Show Me:` pattern
   - Render `CollapsibleImageItem` if pattern found
   - Render regular image otherwise

3. **Update markdown files**
   - Use syntax: `![alt:Show Me: summary](image.png)`
   - Example: `![Schema diagram:Show Me: The 3-Way JOIN Schema](/assets/sql-join/schema.png)`

4. **No parser changes needed!**
   - Works directly with existing markdown
   - No type changes required
   - No data structure changes

