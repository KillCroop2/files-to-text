'use client';

import { useCallback, useState, useRef } from 'react';

interface DropZoneProps {
  onFilesSelected: (files: FileList) => void;
  isLoading?: boolean;
}

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

export default function FileDropZone({ onFilesSelected, isLoading = false }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dragCounter = useRef(0);

  const validateFiles = (files: FileList): boolean => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > MAX_FILE_SIZE) {
        setError(`File "${file.name}" is too large. Maximum size is 25MB.`);
        return false;
      }
      
      // Validate file type
      const validTypes = [
        'text/plain', 'text/markdown', 'text/csv', 'application/json',
        'text/yaml', 'text/xml', 'text/javascript', 'text/typescript',
        'text/x-python', 'text/x-java', 'text/x-c', 'text/x-c++',
        'text/x-go', 'text/x-ruby', 'text/x-php', 'text/html', 'text/css'
      ];
      
      const extension = file.name.split('.').pop()?.toLowerCase();
      if (!validTypes.includes(file.type) && 
          !['rs', 'ts', 'js', 'py', 'java', 'cpp', 'c', 'go', 'rb', 'php', 'jsonl', 'json'].includes(extension || '')) {
        setError(`File "${file.name}" is not a supported text file.`);
        return false;
      }
    }
    setError(null);
    return true;
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      if (validateFiles(e.dataTransfer.files)) {
        onFilesSelected(e.dataTransfer.files);
      }
      e.dataTransfer.clearData();
    }
  }, [onFilesSelected]);

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && validateFiles(e.target.files)) {
      onFilesSelected(e.target.files);
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={`group relative border-2 border-dashed rounded-lg p-12 text-center transition-colors duration-200
          ${isDragging 
            ? 'border-neutral-600 bg-neutral-900/50' 
            : 'border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/25'
          } ${isLoading ? 'opacity-50 cursor-wait' : 'cursor-pointer'}`}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        aria-label="Drop zone for file upload"
        role="button"
        tabIndex={0}
      >
        <input
          type="file"
          multiple
          onChange={onFileInputChange}
          className="hidden"
          id="fileInput"
          aria-label="File input"
          accept="text/*,.txt,.md,.json,.jsonl,.yaml,.yml,.xml,.csv,.rs,.ts,.js,.py,.java,.cpp,.c,.go,.rb,.php,.html,.css"
          disabled={isLoading}
        />
        <label htmlFor="fileInput" className={`cursor-pointer flex flex-col items-center gap-6 ${isLoading ? 'cursor-wait' : ''}`}>
          {isLoading ? (
            <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-neutral-500" />
          ) : (
            <svg
              className={`w-20 h-20 transition-colors duration-200 ${isDragging ? 'text-neutral-500' : 'text-neutral-700 group-hover:text-neutral-600'}`}
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M19.35 10.04A7.49 7.49 0 0012 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
            </svg>
          )}
          <div className="space-y-2">
            <p className="text-xl font-medium text-neutral-200">
              {isLoading 
                ? 'Processing files...' 
                : isDragging 
                  ? 'Drop your files here' 
                  : 'Drag and drop your files here'
              }
            </p>
            <p className="text-sm text-neutral-400">
              or <span className="text-neutral-200 hover:text-neutral-100">browse files</span>
            </p>
            <p className="text-xs text-neutral-500">
              Supports text files up to 25MB
            </p>
          </div>
        </label>
      </div>
      {error && (
        <div className="text-red-400 text-sm text-center">
          {error}
        </div>
      )}
    </div>
  );
} 