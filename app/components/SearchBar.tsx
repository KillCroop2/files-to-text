'use client';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search in files..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg
          placeholder-neutral-500 text-neutral-200
          focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:border-transparent
          transition-all duration-200"
        aria-label="Search in files"
      />
      <svg
        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
} 