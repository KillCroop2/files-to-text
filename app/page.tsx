'use client';

import { useState, useCallback } from 'react';
import FileDropZone from './components/FileDropZone';
import SearchBar from './components/SearchBar';
import FileContent from './components/FileContent';
import FileStats from './components/FileStats';
import { getFileType, countLines } from './utils';

interface ProcessedFile {
  name: string;
  content: string;
  size: number;
  lastModified: number;
}

export default function Home() {
  const [processedFiles, setProcessedFiles] = useState<ProcessedFile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopyingAll, setIsCopyingAll] = useState(false);

  const clearFiles = () => {
    setProcessedFiles([]);
    setSearchTerm('');
  };

  const processFileInChunks = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const chunkSize = 64 * 1024; // 64KB chunks
      const reader = new FileReader();
      let offset = 0;
      let result = '';

      const readNextChunk = () => {
        const slice = file.slice(offset, offset + chunkSize);
        reader.readAsText(slice);
      };

      reader.onload = (e) => {
        if (e.target?.result) {
          result += e.target.result;
          offset += chunkSize;
          
          if (offset < file.size) {
            // Process next chunk
            readNextChunk();
          } else {
            // Done reading file
            resolve(result);
          }
        }
      };

      reader.onerror = () => reject(new Error('Error reading file'));
      
      // Start reading the first chunk
      readNextChunk();
    });
  };

  const handleFilesSelected = useCallback(async (files: FileList) => {
    setIsLoading(true);
    const newFiles: ProcessedFile[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const content = await processFileInChunks(file);
        newFiles.push({ 
          name: file.name, 
          content,
          size: file.size,
          lastModified: file.lastModified
        });
      }

      setProcessedFiles(prev => [...prev, ...newFiles]);
    } catch (error) {
      console.error('Error processing files:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  }, []);

  const copyAllFiles = async () => {
    try {
      setIsCopyingAll(true);
      const combinedContent = processedFiles.map(file => {
        const type = getFileType(file.name);
        return `File: ${file.name}
Type: ${type}
Size: ${(file.size / 1024).toFixed(2)} KB
Lines: ${countLines(file.content)}
Last Modified: ${new Date(file.lastModified).toLocaleString()}
----------------------------------------
${file.content}
========================================\n`;
      }).join('\n');

      await navigator.clipboard.writeText(combinedContent);
      setTimeout(() => setIsCopyingAll(false), 2000);
    } catch (err) {
      console.error('Failed to copy all files:', err);
      setIsCopyingAll(false);
    }
  };

  const filteredFiles = processedFiles.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateStats = () => {
    const stats = processedFiles.reduce((acc, file) => {
      acc.totalFiles++;
      acc.totalSize += file.size;
      acc.totalLines += countLines(file.content);
      acc.totalCharacters += file.content.length;
      
      const fileType = getFileType(file.name);
      acc.typeBreakdown[fileType] = (acc.typeBreakdown[fileType] || 0) + 1;
      
      return acc;
    }, {
      totalFiles: 0,
      totalSize: 0,
      totalLines: 0,
      totalCharacters: 0,
      typeBreakdown: {} as Record<string, number>
    });

    return stats;
  };

  const stats = calculateStats();

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center mb-8">Files to Text</h1>
        
        <FileDropZone onFilesSelected={handleFilesSelected} isLoading={isLoading} />
        
        {processedFiles.length > 0 && (
          <div className="space-y-6">
            <div className="flex justify-end gap-2">
              <button
                onClick={clearFiles}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-900/50 
                  hover:bg-red-900/75 transition-colors duration-200 text-red-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear Files
              </button>
            </div>

            <FileStats {...stats} />
            
            <div className="flex justify-between items-center">
              <SearchBar onSearch={setSearchTerm} />
              <button
                onClick={copyAllFiles}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-800 
                  hover:bg-neutral-700 transition-colors duration-200"
              >
                {isCopyingAll ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied All!
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Copy All Files
                  </>
                )}
              </button>
            </div>
            
            <div className="space-y-2">
              {filteredFiles.map((file, index) => (
                <FileContent
                  key={`${file.name}-${index}`}
                  fileName={file.name}
                  content={file.content}
                  searchTerm={searchTerm}
                  size={file.size}
                  lastModified={file.lastModified}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
