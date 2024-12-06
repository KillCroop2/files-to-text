export function getFileType(fileName: string): string {
  const extension = fileName.split('.').pop()?.toLowerCase() || '';
  const typeMap: { [key: string]: string } = {
    rs: 'Rust',
    ts: 'TypeScript',
    tsx: 'TypeScript React',
    js: 'JavaScript',
    jsx: 'JavaScript React',
    py: 'Python',
    java: 'Java',
    cpp: 'C++',
    c: 'C',
    go: 'Go',
    rb: 'Ruby',
    php: 'PHP',
    html: 'HTML',
    css: 'CSS',
    json: 'JSON',
    jsonl: 'JSON Lines',
    md: 'Markdown',
    txt: 'Plain Text',
    yml: 'YAML',
    yaml: 'YAML',
    xml: 'XML',
    sql: 'SQL',
    sh: 'Shell Script',
    bash: 'Bash Script',
    ps1: 'PowerShell',
    bat: 'Batch File',
    r: 'R',
    swift: 'Swift',
    kt: 'Kotlin',
    dart: 'Dart',
    lua: 'Lua',
    ex: 'Elixir',
    exs: 'Elixir Script',
  };
  return typeMap[extension] || 'Plain Text';
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleString();
}

export function countLines(str: string): number {
  return str.split(/\r\n|\r|\n/).length;
} 