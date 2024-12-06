'use client';

import { useState } from 'react';
import { formatBytes, formatDate } from '../utils';

interface FileContentProps {
  fileName: string;
  content: string;
  searchTerm: string;
  size: number;
  lastModified: number;
}

export default function FileContent({ 
  fileName, 
  content, 
  searchTerm,
  size,
  lastModified 
}: FileContentProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const highlightContent = (text: string, term: string) => {
    if (!term) return text;

    const parts = text.split(new RegExp(`(${term})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === term.toLowerCase() ? 
        <mark key={i} className="bg-yellow-500/20 text-yellow-200">{part}</mark> : 
        part
    );
  };

  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 overflow-hidden">
      <div 
        className="flex items-center justify-between px-4 py-3 bg-neutral-900 cursor-pointer hover:bg-neutral-800/50 transition-colors duration-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <svg
            className={`w-5 h-5 text-neutral-500 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <div>
            <h3 className="text-lg font-medium text-neutral-200">{fileName}</h3>
            <div className="text-sm text-neutral-500">
              {formatBytes(size)} • {formatDate(lastModified)}
            </div>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            copyToClipboard();
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-neutral-800 
            hover:bg-neutral-700 transition-colors duration-200"
        >
          {isCopied ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="border-t border-neutral-800">
          <div className="p-4 overflow-x-auto">
            <pre className="text-sm text-neutral-300 whitespace-pre-wrap break-words font-mono">
              {highlightContent(content, searchTerm)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
} 