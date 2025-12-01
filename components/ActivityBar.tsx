import React, { useRef, useEffect } from 'react';
import { Lesson, LessonStatus } from '../types';
import { Info, Zap } from 'lucide-react';

interface ActivityBarProps {
  lessons: Lesson[];
  currentIndex: number;
  status: Record<string, LessonStatus>;
  onSelect: (lesson: Lesson) => void;
}

export const ActivityBar: React.FC<ActivityBarProps> = ({
  lessons,
  currentIndex,
  status,
  onSelect,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeButtonRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll to active lesson to keep it in view
  useEffect(() => {
    if (activeButtonRef.current && scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const button = activeButtonRef.current;
        
        const containerWidth = container.offsetWidth;
        const buttonLeft = button.offsetLeft;
        const buttonWidth = button.offsetWidth;
        
        // Center the active button
        const scrollPos = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);
        container.scrollTo({ left: scrollPos, behavior: 'smooth' });
    }
  }, [currentIndex]);

  return (
    <div 
        ref={scrollContainerRef}
        className="w-full h-14 bg-gray-900 border-b border-gray-800 flex items-center px-4 gap-3 overflow-x-auto shrink-0 select-none shadow-inner"
        role="navigation"
        aria-label="Lesson Progress"
    >
      {lessons.map((lesson, idx) => {
        const isCompleted = status[lesson.id]?.completed;
        const isActive = idx === currentIndex;
        const isInfo = lesson.type === 'reading' || lesson.type === 'setup';
        const isChallenge = lesson.type === 'challenge';

        return (
          <button
            key={lesson.id}
            ref={isActive ? activeButtonRef : null}
            onClick={() => onSelect(idx)}
            className={`
              relative flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center transition-all duration-200
              ${isActive 
                ? 'bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-500/30 scale-110 z-10' 
                : isCompleted
                  ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-800 hover:bg-emerald-900/60'
                  : 'bg-gray-800 text-gray-500 border border-gray-700 hover:bg-gray-700 hover:text-gray-300'
              }
            `}
            title={lesson.title}
          >
            <span className="text-xs font-mono">{idx + 1}</span>
            
            {/* Icons overlays for lesson types */}
            {(isInfo || isChallenge) && (
              <div className={`
                absolute -top-2 -right-2 rounded-full p-0.5 border bg-gray-900 z-10
                ${isActive ? 'border-indigo-400' : 'border-gray-700'}
              `}>
                  {isInfo && <Info size={10} className="text-blue-400" />}
                  {isChallenge && <Zap size={10} className="text-yellow-400" />}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};