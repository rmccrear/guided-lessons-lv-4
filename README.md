# SQL Guided Learning

A React-based interactive curriculum designed for coding bootcamp students. This application guides users through SQL basics using SQL Zoo, Supabase implementation, and advanced data aggregation challenges.

## Features

*   **Interactive Curriculum**: Step-by-step lessons ranging from basic SELECT statements to complex aggregations.
*   **Progress Tracking**: visually tracks completed lessons.
*   **AI Tutor**: Integrated Google Gemini AI assistant to help explain concepts and debug queries.
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
*   **Styling**: Tailwind CSS
*   **Icons**: Lucide React
*   **AI**: Google GenAI SDK (`@google/genai`)
*   **Build Tool**: Vite
