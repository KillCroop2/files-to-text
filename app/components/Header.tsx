'use client';

export default function Header() {
  return (
    <header className="w-full border-b border-neutral-800 bg-neutral-900/50">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-lg font-medium text-neutral-200">
              Files to Text
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
} 