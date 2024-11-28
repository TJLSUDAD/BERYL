export interface FileNode {
  name: string;
  path: string;
  content?: string;
  language?: string;
  isDirectory: boolean;
  isExpanded?: boolean;
  children?: FileNode[];
  lastModified?: string;
}