'use client';

import { formatBytes, formatDate } from '../utils';

interface FileContent {
  name: string;
  content: string;
  size: number;
  type: string;
  extension: string;
  lastModified: number;
  lines: number;
  characters: number;
}

interface FileCardProps {
  file: FileContent;
  copiedIndex: number | null;
  onCopy: () => void;
}

export default function FileCard({ file, copiedIndex, onCopy }: FileCardProps) {
  const isCopied = copiedIndex !== null;

  return (
    <div className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 border-b border-neutral-800 gap-2">
        <div className="space-y-1">
          <h2 className="text-lg font-medium text-neutral-200">
            {file.name}
          </h2>
          <div className="flex flex-wrap gap-x-4 text-sm text-neutral-400">
            <span>{file.type} (.{file.extension})</span>
            <span aria-hidden="true">•</span>
            <span>{formatBytes(file.size)}</span>
            <span aria-hidden="true">•</span>
            <span>{file.lines.toLocaleString()} lines</span>
            <span aria-hidden="true">•</span>
            <span>{file.characters.toLocaleString()} chars</span>
            <span aria-hidden="true">•</span>
            <span>{formatDate(file.lastModified)}</span>
          </div>
        </div>
        <button
          onClick={onCopy}
          className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 whitespace-nowrap
            ${isCopied ? 'bg-neutral-700 text-neutral-200' : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200'}`}
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
              <span>Copy Text</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-6 text-sm font-mono bg-neutral-950 text-neutral-200 overflow-x-auto border-t border-neutral-800">
        {file.content}
      </pre>
    </div>
  );
} 