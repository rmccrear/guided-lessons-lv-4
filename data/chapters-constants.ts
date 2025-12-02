import { Chapter } from '../types';
import { SQL_INTRO_LESSONS } from './sql-intro-lessons';
import { SQL_JOINS_RELATIONSHIPS_LESSONS } from './sql-joins-lessons';

export const CHAPTERS: Chapter[] = [
  {
    id: 'sql-intro',
    slug: 'sql-intro',
    title: 'SQL Intro',
    description: 'Introduction to SQL fundamentals and querying databases',
    lessons: SQL_INTRO_LESSONS
  },
  {
    id: 'sql-joins',
    slug: 'sql-joins',
    title: 'SQL Joins',
    description: 'Master Foreign Keys and JOINs by building a complete event management schema',
    lessons: SQL_JOINS_RELATIONSHIPS_LESSONS,
    // Optional: Use markdown file directly instead of pre-compiled lessons
    // markdownPath: '/data/sql-join-lesson.md'
  },
  {
    id: 'test-chapter',
    slug: 'test-chapter',
    title: 'Test Chapter',
    description: 'A test chapter demonstrating dynamic markdown loading',
    lessons: [], // Empty - will be loaded from markdown
    markdownPath: '/data/test-chapter.md'
  }
];
