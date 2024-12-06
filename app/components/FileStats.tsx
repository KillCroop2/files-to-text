'use client';

import { formatBytes } from '../utils';

interface FileStatsProps {
  totalFiles: number;
  totalSize: number;
  totalLines: number;
  totalCharacters: number;
  typeBreakdown: Record<string, number>;
}

export default function FileStats({
  totalFiles,
  totalSize,
  totalLines,
  totalCharacters,
  typeBreakdown
}: FileStatsProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-neutral-900/50 rounded-lg p-4">
          <div className="text-neutral-500 text-sm">Total Files</div>
          <div className="text-2xl font-semibold text-neutral-200">{totalFiles}</div>
        </div>
        <div className="bg-neutral-900/50 rounded-lg p-4">
          <div className="text-neutral-500 text-sm">Total Size</div>
          <div className="text-2xl font-semibold text-neutral-200">{formatBytes(totalSize)}</div>
        </div>
        <div className="bg-neutral-900/50 rounded-lg p-4">
          <div className="text-neutral-500 text-sm">Total Lines</div>
          <div className="text-2xl font-semibold text-neutral-200">{totalLines.toLocaleString()}</div>
        </div>
        <div className="bg-neutral-900/50 rounded-lg p-4">
          <div className="text-neutral-500 text-sm">Total Characters</div>
          <div className="text-2xl font-semibold text-neutral-200">{totalCharacters.toLocaleString()}</div>
        </div>
      </div>

      {Object.keys(typeBreakdown).length > 0 && (
        <div className="bg-neutral-900/50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-neutral-500 mb-3">File Types</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-2">
            {Object.entries(typeBreakdown)
              .sort(([, a], [, b]) => b - a)
              .map(([type, count]) => (
                <div key={type} className="flex justify-between items-center">
                  <span className="text-neutral-300">{type}</span>
                  <span className="text-neutral-500 text-sm">{count}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
} 