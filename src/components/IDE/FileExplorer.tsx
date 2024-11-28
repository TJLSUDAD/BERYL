import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { File, Folder, ChevronRight, ChevronDown } from 'lucide-react';
import { setActiveFile } from '../../store/slices/ideSlice';
import type { RootState } from '../../store';
import type { FileNode } from '../../types';

interface FileTreeProps {
  node: FileNode;
  level?: number;
}

function FileTree({ node, level = 0 }: FileTreeProps) {
  const dispatch = useDispatch();
  const activeFile = useSelector((state: RootState) => state.ide.activeFile);

  const handleFileClick = (file: FileNode) => {
    if (!file.isDirectory) {
      dispatch(setActiveFile(file));
    }
  };

  const indent = level * 8;
  const isActive = activeFile?.path === node.path;

  return (
    <div>
      <div
        className={`flex items-center py-0.5 px-2 cursor-pointer text-[10px] hover:bg-gray-50
          ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
        style={{ paddingLeft: `${indent + 8}px` }}
        onClick={() => handleFileClick(node)}
      >
        {node.isDirectory ? (
          <>
            {node.isExpanded ? (
              <ChevronDown className="w-3 h-3 text-gray-400 mr-1" />
            ) : (
              <ChevronRight className="w-3 h-3 text-gray-400 mr-1" />
            )}
            <Folder className="w-3 h-3 text-gray-400 mr-1" />
          </>
        ) : (
          <File className="w-3 h-3 text-gray-400 mr-1" />
        )}
        <span className="truncate">{node.name}</span>
      </div>
      
      {node.isDirectory && node.isExpanded && node.children?.map((child) => (
        <FileTree key={child.path} node={child} level={level + 1} />
      ))}
    </div>
  );
}

export function FileExplorer() {
  const { fileTree } = useSelector((state: RootState) => state.ide);

  return (
    <div className="h-full overflow-y-auto border-l border-gray-200">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-3 py-2">
        <h2 className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
          Files
        </h2>
      </div>
      <div className="py-1">
        {fileTree.map((node) => (
          <FileTree key={node.path} node={node} />
        ))}
      </div>
    </div>
  );
}