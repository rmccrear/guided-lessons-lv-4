import { Chapter } from '../types';
import { SQL_INTRO_LESSONS } from './sql-intro-lessons';
import { SQL_JOINS_RELATIONSHIPS_LESSONS } from './sql-joins-relationships-lessons';
import { EXPRESS_SERVER_SETUP_LESSONS } from './express-server-setup-lessons';
import { PERSISTENCE_WITH_SUPABASE_LESSONS } from './persistence-with-supabase-lessons';
import { DEPLOY_WITH_DIGITAL_OCEAN_LESSONS } from './deploy-with-digital-ocean-lessons';

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
    markdownPath: '/data/sql-joins-relationships.md'
  },
  {
    id: 'express-rest-server-in-memory',
    slug: 'express-rest-server-in-memory',
    title: 'Express REST Server (In Memory)',
    description: 'Build a complete REST API with Express, from setup to in-memory data management',
    lessons: EXPRESS_SERVER_SETUP_LESSONS,
    markdownPath: '/data/express-server-setup.md'
  },
  {
    id: 'express-supabase',
    slug: 'express-supabase',
    title: 'Express with Supabase',
    description: 'Transition from in-memory storage to a persistent Postgres database using Supabase',
    lessons: PERSISTENCE_WITH_SUPABASE_LESSONS,
    markdownPath: '/data/persistence-with-supabase.md'
  },
  {
    id: 'deploy-node-do-console',
    slug: 'deploy-node-do-console',
    title: 'Deploying Node.js via DigitalOcean Console',
    description: 'Deploy a Node.js application to a Droplet using the browser-based terminal, Git, and PM2',
    lessons: DEPLOY_WITH_DIGITAL_OCEAN_LESSONS,
    markdownPath: '/data/deploy-with-digital-ocean.md'
  }
];
