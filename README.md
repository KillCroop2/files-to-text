# Files to Text

A modern web application built with Next.js 15 that converts various file types to text with a beautiful, responsive UI. Perfect for quickly viewing and copying text-based files.

## Features

- 🚀 **Fast File Processing**: Handles large files (up to 25MB) with chunk-based processing
- 🔍 **Search Functionality**: Search across all loaded files in real-time
- 📊 **File Statistics**: View aggregate stats including total size, lines, and file types
- 💾 **Multiple File Types**: Supports various text-based formats:
  - Programming: TypeScript, JavaScript, Python, Java, C++, Go, Ruby, PHP, etc.
  - Data: JSON, JSONL, YAML, XML, CSV
  - Markup: HTML, CSS, Markdown
  - Plain text and more
- 📋 **Copy Options**: 
  - Copy individual files
  - Copy all files with metadata headers
  - Real-time copy feedback
- 🎨 **Modern UI/UX**:
  - Dark theme optimized for readability
  - Responsive design
  - Collapsible file views
  - Drag and drop support
  - Loading states and animations

## Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Geist Font](https://vercel.com/font) - Typography

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/troland/files-to-text.git
cd files-to-text
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Upload Files**:
   - Drag and drop files onto the upload area
   - Click to browse and select files
   - Multiple files supported

2. **View Files**:
   - Click on file headers to expand/collapse content
   - View file metadata (size, lines, type)
   - Search within files using the search bar

3. **Copy Content**:
   - Use individual copy buttons for each file
   - Use "Copy All Files" to copy everything with headers
   - Content includes metadata for easy reference

## Development

The project uses Next.js with TypeScript. Key directories:

```
files-to-text/
├── app/
│   ├── components/    # React components
│   ├── utils.ts      # Utility functions
│   ├── layout.tsx    # Root layout
│   └── page.tsx      # Main page
├── public/           # Static assets
└── package.json      # Dependencies
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Author

Tóth Roland - [troland.hu](https://troland.hu)

## Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework
- [Vercel](https://vercel.com/) for Geist font
- All contributors and users of this project
