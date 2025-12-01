import React, { useMemo } from 'react';
import { Chapter } from '../types';
import { CHAPTERS } from '../data/chapters-constants';
import ChapterCard from './ChapterCard';
import { Menu } from 'lucide-react';

export interface CourseProps {
  chapters?: Chapter[];
  onOpenChapter?: (chapter: Chapter) => void;
}

/**
 * Course layout: left nav with chapter titles, main panel with all ChapterCards.
 */
export function Course({ chapters, onOpenChapter }: CourseProps) {
  const list = useMemo(() => chapters ?? CHAPTERS, [chapters]);

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      {/* Sidebar / Nav */}
      <aside className="w-64 shrink-0 border-r border-gray-700 bg-gray-800 hidden md:flex md:flex-col">
        <div className="h-14 border-b border-gray-700 flex items-center gap-2 px-4">
          <Menu size={18} className="text-gray-300" />
          <span className="font-semibold tracking-tight">Chapters</span>
        </div>
        <nav className="flex-1 overflow-y-auto p-2 space-y-1">
          {list.map((c) => (
            <button
              key={c.id}
              type="button"
              className="block w-full text-left px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
              title={c.title}
              onClick={() => onOpenChapter?.(c)}
            >
              {c.title}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-10">
          <header className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-emerald-400">Course Overview</h1>
            <p className="text-sm md:text-base text-gray-300 mt-1">Browse chapters and jump into lessons.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {list.map((c) => (
              <section key={c.id} id={c.slug} className="scroll-mt-20">
                <ChapterCard chapter={c} onOpen={onOpenChapter} />
              </section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Course;
