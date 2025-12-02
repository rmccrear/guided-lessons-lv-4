import React, { useState } from 'react';
import { Lesson, CodeSnippet } from '../types';
import { ExternalLink, ChevronRight, ChevronLeft, CheckSquare, Square, Lightbulb, Eye, ChevronDown, ChevronUp, Code2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface LessonViewProps {
  lesson: Lesson;
  isCompleted: boolean;
  onToggleComplete: (completed: boolean) => void;
  onNext: () => void;
  onPrev: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // Custom styling for markdown elements
        h1: ({ node, ...props }) => <h1 className="text-3xl md:text-4xl font-bold text-white mt-10 mb-6" {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-white mt-8 mb-4 flex items-center gap-2" {...props} />,
        h3: ({ node, ...props }) => <h3 className="text-xl font-semibold text-indigo-300 mt-6 mb-3" {...props} />,
        h4: ({ node, ...props }) => <h4 className="text-lg font-semibold text-white mt-4 mb-2" {...props} />,
        p: ({ node, ...props }) => <p className="mb-4 leading-relaxed text-gray-300 text-lg" {...props} />,
        ul: ({ node, ...props }) => <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-300" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal pl-6 space-y-2 mb-6 text-gray-300" {...props} />,
        li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
        a: ({ node, ...props }) => (
          <a
            className="text-emerald-400 hover:text-emerald-300 hover:underline decoration-emerald-500/50"
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          />
        ),
        code: ({ node, className, children, ...props }: any) => {
          const inline = !className;
          return inline ? (
            <code className="bg-gray-800 px-1.5 py-0.5 rounded text-indigo-300 font-mono text-sm border border-gray-700" {...props}>
              {children}
            </code>
          ) : (
            <code className="block bg-gray-900 p-4 rounded-lg text-emerald-300 font-mono text-sm overflow-x-auto" {...props}>
              {children}
            </code>
          );
        },
        pre: ({ node, ...props }) => <pre className="bg-gray-900 rounded-lg overflow-x-auto my-4" {...props} />,
        blockquote: ({ node, ...props }) => (
          <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-gray-400 my-4" {...props} />
        ),
        hr: ({ node, ...props }) => <hr className="my-8 border-gray-700" {...props} />,
        strong: ({ node, ...props }) => <strong className="text-white font-bold" {...props} />,
        em: ({ node, ...props }) => <em className="italic text-gray-300" {...props} />,
        img: ({ node, ...props }) => (
          <img className="max-w-full h-auto rounded-lg my-6 border border-gray-700" {...props} />
        ),
        table: ({ node, ...props }) => (
          <div className="my-6 overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-700 bg-gray-800/50" {...props} />
          </div>
        ),
        thead: ({ node, ...props }) => <thead {...props} />,
        tbody: ({ node, ...props }) => <tbody {...props} />,
        tr: ({ node, ...props }) => <tr className="hover:bg-gray-800/30" {...props} />,
        th: ({ node, ...props }) => (
          <th className="border border-gray-700 px-4 py-3 text-left font-semibold text-white bg-gray-900/50" {...props} />
        ),
        td: ({ node, ...props }) => (
          <td className="border border-gray-700 px-4 py-3 text-gray-300" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

const CodeSnippetItem: React.FC<{ snippet: CodeSnippet }> = ({ snippet }) => {
  const [isOpen, setIsOpen] = useState(!snippet.summary);

  const toggle = () => {
    if (snippet.summary) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={`my-6 rounded-xl overflow-hidden border shadow-lg transition-all duration-300 ${
      snippet.summary 
        ? 'border-yellow-600/30 bg-yellow-900/10' 
        : 'bg-black/40 border-gray-700'
    }`}>
      {/* Header / Toggle Button */}
      {snippet.summary ? (
        <button
          onClick={toggle}
          className="w-full flex items-center justify-between p-4 bg-yellow-900/20 hover:bg-yellow-900/30 transition-colors text-yellow-400 group"
        >
          <div className="flex items-center gap-2 font-semibold">
            <Eye size={20} className="group-hover:text-yellow-300" />
            <span>Show Me: {snippet.summary}</span>
          </div>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      ) : (
        <div className="bg-gray-800/80 px-4 py-2 text-xs font-mono text-gray-400 border-b border-gray-700 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Code2 size={14} />
            <span>{snippet.language.toUpperCase()}</span>
          </div>
          <span>Example</span>
        </div>
      )}

      {/* Content */}
      {isOpen && (
        <div className={`animate-fadeIn ${snippet.summary ? 'border-t border-yellow-600/20' : ''}`}>
           {/* Code Block */}
          <div className="p-6 overflow-x-auto font-mono text-sm leading-relaxed text-emerald-300 bg-black/20">
            <pre>{snippet.code}</pre>
          </div>
          
          {/* Description */}
          {snippet.description && (
             <div className={`px-4 py-3 text-sm italic ${
               snippet.summary ? 'text-yellow-200/80 bg-yellow-900/20' : 'text-gray-400 bg-gray-800/30'
             }`}>
                 {snippet.description}
             </div>
          )}
        </div>
      )}
    </div>
  );
};

export const LessonView: React.FC<LessonViewProps> = ({
  lesson,
  isCompleted,
  onToggleComplete,
  onNext,
  onPrev,
  hasPrev,
  hasNext,
}) => {
  
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title Section */}
      <div className="space-y-2 border-b border-gray-800 pb-6">
        <div className="flex items-center gap-2 text-indigo-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-widest px-2 py-1 bg-indigo-500/10 rounded">
                {lesson.type}
            </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white">{lesson.title}</h2>
        <p className="text-xl text-gray-400">{lesson.description}</p>
      </div>

      {/* Main Content */}
      <div className="max-w-none">
        <MarkdownRenderer content={lesson.content} />
      </div>

      {/* Code Snippets List */}
      {lesson.codeSnippets && lesson.codeSnippets.length > 0 && (
        <div className="space-y-4">
          {lesson.codeSnippets.map((snippet, idx) => (
            <CodeSnippetItem key={idx} snippet={snippet} />
          ))}
        </div>
      )}

      {/* Legacy Solution Section (Fallback if data still exists) */}
      {lesson.solution && (
        <div className="my-8 rounded-xl overflow-hidden border border-red-900/50 bg-red-900/10 p-4">
           <p className="text-red-400 text-sm">Dev Note: This lesson uses deprecated 'solution' field. Please migrate to 'codeSnippets'.</p>
        </div>
      )}

      {/* Challenges List */}
      {lesson.challenges && (
        <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-xl p-6 space-y-4 my-8">
            <h3 className="text-xl font-semibold text-indigo-300 flex items-center gap-2">
                <Lightbulb size={24} />
                Thinking Cap Challenges
            </h3>
            <ul className="space-y-3">
                {lesson.challenges.map((challenge, idx) => (
                    <li key={idx} className="flex gap-3 bg-gray-900/50 p-4 rounded-lg text-gray-300">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-bold">
                            {idx + 1}
                        </span>
                        <span>{challenge}</span>
                    </li>
                ))}
            </ul>
        </div>
      )}

      {/* External Link Button */}
      {lesson.externalLink && (
        <div className="mt-8">
          <a
            href={lesson.externalLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold transition-all transform hover:scale-[1.02] shadow-lg shadow-emerald-900/20"
          >
            {lesson.externalLink.label}
            <ExternalLink size={18} />
          </a>
        </div>
      )}

      {/* Action Footer */}
      <div className="pt-12 mt-12 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <button
          onClick={() => onToggleComplete(!isCompleted)}
          className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all w-full md:w-auto justify-center ${
            isCompleted
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/50'
              : 'bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700'
          }`}
        >
          {isCompleted ? <CheckSquare size={20} /> : <Square size={20} />}
          <span className="font-medium">{isCompleted ? 'Completed' : 'Mark as Completed'}</span>
        </button>

        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              hasPrev ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 cursor-not-allowed'
            }`}
          >
            <ChevronLeft size={16} />
            Previous
          </button>
          
          <button
            onClick={onNext}
            disabled={!hasNext}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
              hasNext 
                ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-900/20' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            Next Lesson
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};