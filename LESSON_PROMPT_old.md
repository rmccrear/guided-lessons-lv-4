# Prompt for Creating Lessons (React/constants.ts Format)

Use this prompt template to create lessons and levels for the SQL Guided Learning app. The content is stored in `constants.ts` as an array of TypeScript objects.

## Data Structure Reference

Your output must match this TypeScript interface:

```typescript
interface CodeSnippet {
  language: string;     // e.g., 'sql', 'text', 'javascript'
  code: string;         // The code block content
  description?: string; // context displayed below code
  summary?: string;     // IF PRESENT: Creates a "Show Me: [Summary]" toggle button.
                        // IF ABSENT: Code is always visible.
}

interface Lesson {
  id: string;           // Unique slug (e.g., 'select-basics')
  title: string;        // Main title
  description: string;  // Subtitle/Brief description for the sidebar
  type: 'reading' | 'exercise' | 'challenge' | 'setup';
  content: string;      // Markdown string. Use `\n` for newlines in code, or template literals.
  
  // Optional Fields
  externalLink?: {
    url: string;
    label: string;
  };
  challenges?: string[]; // Array of strings for "Thinking Cap" discussion questions.
                         // These are rendered as a numbered list in a distinct visual box.
  codeSnippets?: CodeSnippet[];
}
```

## Prompt Template

Copy and paste the following to an AI to generate compatible content:

---

**System Instruction:**
You are a curriculum developer for a SQL Guided Learning React app. Create lesson content formatted as TypeScript objects for the `constants.ts` file.

**Style Guide:**
1. **Content Markdown**: The `content` field supports Markdown.
   - Use `**Bold**` for headers like **Goal**, **User Story**, **Instructions**.
   - Use bullet points or numbered lists for steps.
   - Keep the tone encouraging and step-by-step.
2. **User Stories**: Include a user story in the `content` string (e.g., "As a developer, I want...").
3. **Show Me / Hints**: Use the `codeSnippets` array.
   - If it is a solution or a hint the user needs to click to reveal, provide a `summary` property (e.g., `summary: "Solution: Count Entrees"`).
   - If it is an example they should see immediately, omit the `summary` property.
4. **Types**:
   - `reading`: Informational only.
   - `setup`: Environment configuration or data entry.
   - `exercise`: Active coding tasks.
   - `challenge`: Harder problems, often marked with a thunderbolt icon.
5. **Challenge Design**:
   - For `type: 'challenge'`, rely primarily on the `challenges` array to pose questions.
   - **Minimize Code Snippets**: Challenge levels should test knowledge, not just copy-paste.
   - Avoid visible code snippets (without `summary`) in challenge levels unless absolutely necessary for syntax reference.
   - If providing solutions, ALWAYS hide them behind a `summary`.

**Output Format Example:**

```javascript
{
  id: 'advanced-aggregates',
  title: 'Advanced Aggregates',
  description: 'Grouping data for analysis.',
  type: 'exercise',
  content: `
**Goal:** Learn how to group results by category.

**User Story:** As a data analyst, I want to see the count of dishes by type so I can balance the menu.

---

**Instructions:**
1. Open the SQL Editor in Supabase.
2. Use the \`GROUP BY\` clause to group dishes by \`type_of_dish\`.
3. Count the number of rows in each group.

**Check:**
* You should see a list of dish types (entree, side, dessert).
* Each type should have a number next to it.
`,
  codeSnippets: [
    {
      language: 'sql',
      code: "SELECT type_of_dish, COUNT(*) \nFROM potluck_dinners \nGROUP BY type_of_dish;",
      description: "Groups rows by dish type and counts them.",
      summary: "Solution: Group By Type" // This makes it a hidden toggle
    }
  ],
  challenges: [
    "How would you filter to show only types with more than 3 dishes?",
    "Can you order the results from highest count to lowest?"
  ]
}
```

---

## Lesson Types & Visuals

- **Info/Reading/Setup**: Renders with an `Info` (i) icon in the navigation.
- **Challenge**: Renders with a `Zap` (thunderbolt) icon.
- **Exercise**: Standard circular indicator.

## Special Content Sections

You can simulate the Jekyll structure using Markdown within the `content` string:

**Diving Deeper**:
Just add a header in the markdown:
`content: "... \n\n### 🔍 Diving Deeper\n\nWhy does this work? ..."`

**Verification/Check**:
Add a check section at the bottom of the content:
`content: "... \n\n### ✅ Check\n1. You have created the table.\n2. You have inserted data."`