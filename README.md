# Guided Learning for Level 4

A React-based interactive curriculum designed for coding bootcamp students. This application guides users through SQL fundamentals, Express REST API development, and database integration with Supabase.

## Features

*   **Interactive Curriculum**: Step-by-step lessons from SQL basics to building full-stack Express applications.
*   **Dynamic Markdown Loading**: Lessons load from markdown files in development, compiled to TypeScript for production.
*   **Progress Tracking**: Visually tracks completed lessons.
*   **AI Tutor**: Integrated Google Gemini AI assistant to help explain concepts and debug code.
*   **Multiple Chapter Types**: Reading material, exercises, challenges, and setup guides.
*   **Responsive Design**: Works on desktop and mobile.

## Prerequisites

*   Node.js (v18 or higher recommended)
*   npm

## Getting Started

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run Locally**
    ```bash
    npm run dev
    ```
    The application should now be running at `http://localhost:5173` (or similar).

## Building for Production

To create a production build:

```bash
npm run build
```

This will generate a `dist` folder containing the static assets ready for deployment.

### Development vs Production Modes

**Development Mode** (default):
- Lessons load dynamically from markdown files in `public/data/`
- Hot module replacement (HMR) for instant updates
- Edit markdown files and see changes immediately

**Production Mode**:
- Lessons compiled to TypeScript at build time for better performance
- Use `npm run sync-chapters:prod` before building to convert markdown to TypeScript

**Switching Between Modes:**
```bash
# Development mode (markdown loading)
npm run sync-chapters:dev

# Production mode (TypeScript imports)
npm run sync-chapters:prod
```

## Deployment to GitHub Pages

This repository includes a GitHub Action (`.github/workflows/deploy.yml`) that automatically builds and deploys the application to GitHub Pages whenever you push to the `main` branch.

### ⚠️ Important Configuration

**1. Vite Base Path**
For the app to load correctly on GitHub Pages (e.g., `https://username.github.io/repo-name/`), you must set the base path in your `vite.config.ts`:

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/<YOUR-REPO-NAME>/', // Replace with your repository name
})
```

**2. Google Gemini API Key**
The AI Tutor feature requires a Google GenAI API Key.
*   **Local Development**: Create a `.env` file in the root and add `API_KEY=your_key_here`.
*   **Production**: Since this is a static client-side app, environment variables are embedded during build time. You must provide the API key securely or configure a proxy backend if you wish to keep the key private. For a simple demo, you can assume the user provides it or hardcode a restricted key.

## Tech Stack

*   **Framework**: React 19
*   **Routing**: React Router v7
*   **Styling**: Tailwind CSS
*   **Markdown**: react-markdown with remark-gfm
*   **Icons**: Lucide React
*   **AI**: Google GenAI SDK (`@google/genai`)
*   **Build Tool**: Vite
*   **TypeScript**: Full type safety

## Project Structure

```
├── components/          # React components
│   ├── ActivityBar.tsx  # Progress tracking sidebar
│   ├── AITutor.tsx      # AI assistant component
│   ├── LessonView.tsx   # Lesson content renderer
│   └── Sidebar.tsx      # Chapter navigation
├── data/                # Generated TypeScript lesson files
│   ├── chapters-constants.ts  # Chapter configuration
│   └── *-lessons.ts     # Compiled lessons (generated)
├── public/data/         # Source markdown files
│   ├── sql-joins-relationships.md
│   ├── express-server-setup.md
│   └── persistence-with-supabase.md
├── scripts/             # Build and automation scripts
│   ├── parse-chapter.ts        # Convert markdown to TypeScript
│   └── update-chapter-constants.ts  # Switch dev/prod modes
├── services/            # API integrations
│   └── geminiService.ts
└── hooks/               # Custom React hooks
    └── useMarkdownChapter.ts  # Dynamic markdown loader
```

## Adding New Chapters

1. **Create markdown file** in `public/data/` with frontmatter:
   ```markdown
   ---
   id: my-new-chapter
   title: My New Chapter
   type: exercise
   description: Chapter description
   ---
   ```

2. **Filename convention**: Use the same name as the `id` field
   - Example: `my-new-chapter.md` with `id: my-new-chapter`

3. **Add to chapters-constants.ts**:
   ```typescript
   {
     id: 'my-chapter-id',
     slug: 'my-chapter-slug',
     title: 'My Chapter Title',
     description: 'Chapter description',
     lessons: [],
     markdownPath: '/data/my-new-chapter.md'
   }
   ```

4. **Update mapping** in `scripts/update-chapter-constants.ts` if slug differs from id:
   ```typescript
   const MD_FILE_TO_CHAPTER_ID: Record<string, string> = {
     'my-new-chapter.md': 'my-chapter-id',
   };
   ```

5. **Convert to production** (optional):
   ```bash
   npm run sync-chapters:prod
   ```
