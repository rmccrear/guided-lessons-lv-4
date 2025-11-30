import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { LessonView } from './components/LessonView';
import { AITutor } from './components/AITutor';
import { ActivityBar } from './components/ActivityBar';
import { Lesson, LessonStatus } from './types';
import { LESSONS } from './constants';
import { Menu, X, GraduationCap, MessageSquareText } from 'lucide-react';

export default function App() {
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0);
  const [lessonStatus, setLessonStatus] = useState<Record<string, LessonStatus>>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTutorOpen, setIsTutorOpen] = useState(false);

  // Initialize status on load
  useEffect(() => {
    const initialStatus: Record<string, LessonStatus> = {};
    LESSONS.forEach((lesson) => {
      initialStatus[lesson.id] = { completed: false };
    });
    setLessonStatus(initialStatus);
  }, []);

  const handleLessonSelect = (index: number) => {
    setCurrentLessonIndex(index);
    // On mobile, close sidebar after selection
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const markComplete = (id: string, completed: boolean) => {
    setLessonStatus((prev) => ({
      ...prev,
      [id]: { ...prev[id], completed },
    }));
  };

  const handleNext = () => {
    if (currentLessonIndex < LESSONS.length - 1) {
      handleLessonSelect(currentLessonIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentLessonIndex > 0) {
      handleLessonSelect(currentLessonIndex - 1);
    }
  };

  const currentLesson = LESSONS[currentLessonIndex];
  const progress = Math.round(
    (Object.values(lessonStatus).filter((s: LessonStatus) => s.completed).length / LESSONS.length) * 100
  );

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden font-sans">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-72 bg-gray-800 border-r border-gray-700 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar
          lessons={LESSONS}
          currentIndex={currentLessonIndex}
          status={lessonStatus}
          onSelect={handleLessonSelect}
          progress={progress}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full min-w-0">
        {/* Header */}
        <header className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4 shadow-sm z-10 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg md:hidden"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center gap-2 text-emerald-400">
              <GraduationCap size={24} />
              <h1 className="text-xl font-bold tracking-tight">Learn SQL</h1>
            </div>
          </div>
          
          <button
            onClick={() => setIsTutorOpen(!isTutorOpen)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
              isTutorOpen 
                ? 'bg-indigo-600 border-indigo-500 text-white' 
                : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <MessageSquareText size={18} />
            <span className="hidden sm:inline">AI Tutor</span>
          </button>
        </header>

        {/* Activity Bar */}
        <ActivityBar 
          lessons={LESSONS}
          currentIndex={currentLessonIndex}
          status={lessonStatus}
          onSelect={handleLessonSelect}
        />

        {/* Lesson View Area */}
        <main className="flex-1 overflow-y-auto bg-gray-900 scroll-smooth relative">
          <div className="max-w-4xl mx-auto p-4 md:p-8 pb-24">
            <LessonView
              lesson={currentLesson}
              isCompleted={lessonStatus[currentLesson.id]?.completed || false}
              onToggleComplete={(completed) => markComplete(currentLesson.id, completed)}
              onNext={handleNext}
              onPrev={handlePrev}
              hasPrev={currentLessonIndex > 0}
              hasNext={currentLessonIndex < LESSONS.length - 1}
            />
          </div>
        </main>
      </div>

      {/* AI Tutor Panel */}
      {isTutorOpen && (
        <div className="fixed inset-y-0 right-0 z-40 w-full sm:w-96 bg-gray-800 border-l border-gray-700 shadow-2xl transform transition-transform duration-300 ease-in-out">
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                AI SQL Assistant
              </h3>
              <button 
                onClick={() => setIsTutorOpen(false)}
                className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
               <AITutor contextLesson={currentLesson} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}