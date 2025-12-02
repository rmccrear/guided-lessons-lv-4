export interface CodeSnippet {
  language: string;
  code: string;
  description?: string;
  summary?: string; // If present, snippet is hidden behind a "Show Me: {summary}" button
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string; // Markdown-like or structured text
  type: 'reading' | 'exercise' | 'challenge' | 'setup';
  externalLink?: {
    url: string;
    label: string;
  };
  challenges?: string[];
  codeSnippets?: CodeSnippet[]; // Changed from single codeSnippet
  // solution field is deprecated in favor of codeSnippets with summaries, 
  // but kept optional in interface if needed for legacy, though we will migrate data.
  solution?: {
    code?: string;
    explanation?: string;
  };
}

export interface Chapter {
  id: string;
  slug: string;
  title: string;
  description: string;
  lessons: Lesson[];
  markdownPath?: string; // Optional: Path to markdown file to parse lessons dynamically
}

export interface LessonStatus {
  completed: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}