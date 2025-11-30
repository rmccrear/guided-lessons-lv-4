import React from 'react';
import { Lesson, LessonStatus } from '../types';
import { CheckCircle2, Circle, Lock, BookOpen, Info, Zap } from 'lucide-react';

interface SidebarProps {
  lessons: Lesson[];
  currentIndex: number;
  status: Record<string, LessonStatus>;
  onSelect: (index: number) => void;
  progress: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  lessons,
  currentIndex,
  status,
  onSelect,
  progress,
}) => {
  return (
    <div className="flex flex-col h-full bg-gray-900 text-gray-300">
      {/* Progress Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Progress</span>
          <span className="text-xs font-bold text-emerald-400">{progress}%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div
            className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Lesson List */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul>
          {lessons.map((lesson, index) => {
            const isCompleted = status[lesson.id]?.completed;
            const isActive = index === currentIndex;
            
            // Determine icon based on lesson type
            let IconComponent = Circle;
            if (lesson.type === 'challenge') IconComponent = Zap;
            else if (lesson.type === 'reading' || lesson.type === 'setup') IconComponent = Info;
            
            return (
              <li key={lesson.id} className="mb-1">
                <button
                  onClick={() => onSelect(index)}
                  className={`w-full text-left px-6 py-3 flex items-start gap-3 transition-colors ${
                    isActive
                      ? 'bg-gray-800 text-white border-r-4 border-emerald-500'
                      : 'hover:bg-gray-800/50 hover:text-white'
                  }`}
                >
                  <div className="mt-1 shrink-0">
                    {isCompleted ? (
                      <CheckCircle2 size={16} className="text-emerald-500" />
                    ) : (
                      <IconComponent 
                        size={16} 
                        className={isActive ? "text-indigo-400" : "text-gray-600"} 
                      />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium leading-tight">{lesson.title}</div>
                    <div className="text-xs text-gray-500 mt-1 line-clamp-1">{lesson.description}</div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 text-xs text-center text-gray-600 border-t border-gray-800">
        Guided Content v1.0
      </div>
    </div>
  );
};