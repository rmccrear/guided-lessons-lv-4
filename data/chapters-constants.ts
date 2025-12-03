import { Chapter } from '../types';
import { SQL_INTRO_LESSONS } from './sql-intro-lessons';

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
    lessons: [],
    markdownPath: '/data/sql-joins-relationships.md'
  },
  {
    id: 'express-rest-server-in-memory',
    slug: 'express-rest-server-in-memory',
    title: 'Express REST Server (In Memory)',
    description: 'Build a complete REST API with Express, from setup to in-memory data management',
    lessons: [],
    markdownPath: '/data/express-server-setup.md'
  },
  {
    id: 'express-supabase',
    slug: 'express-supabase',
    title: 'Express with Supabase',
    description: 'Transition from in-memory storage to a persistent Postgres database using Supabase',
    lessons: [],
    markdownPath: '/data/persistence-with-supabase.md'
  }
];
