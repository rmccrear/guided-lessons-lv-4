import React from 'react';
import { Chapter } from '../types';
import { BookOpen, ListChecks } from 'lucide-react';

export interface ChapterCardProps {
  chapter: Chapter;
  onOpen?: (chapter: Chapter) => void;
}

export function ChapterCard({ chapter, onOpen }: ChapterCardProps) {
  const lessonCount = chapter.lessons?.length || 0;

  return (
    <div className="group relative rounded-xl border border-gray-700 bg-gray-800/60 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-emerald-400">
            <BookOpen size={20} />
            <h3 className="text-lg font-semibold tracking-tight">{chapter.title}</h3>
          </div>
          <span className="inline-flex items-center gap-1 text-xs text-gray-300 bg-gray-700/70 px-2 py-1 rounded-full">
            <ListChecks size={14} />
            {lessonCount} lessons
          </span>
        </div>
        <p className="text-sm text-gray-300 leading-relaxed">
          {chapter.description}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <div className="text-xs text-gray-400">Slug: {chapter.slug}</div>
          <button
            onClick={() => onOpen?.(chapter)}
            className="px-3 py-1.5 text-sm rounded-lg bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            View Lessons
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChapterCard;
