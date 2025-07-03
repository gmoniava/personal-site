"use client";
import React, { useState } from "react";

interface TreeProps {
  data: any[];
  expandTogglePosition?: "left" | "right";
}

const Tree = ({ data, expandTogglePosition = "left" }: TreeProps) => (
  <div className="font-sans text-sm leading-snug">
    {data.map((node: any) => (
      <TreeNode key={node.key} node={node} expandTogglePosition={expandTogglePosition} />
    ))}
  </div>
);

const FolderIcon = () => (
  <svg className="w-4 h-4 text-yellow-600 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 7a2 2 0 012-2h5l2 2h7a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
    />
  </svg>
);

const FileIcon = () => (
  <svg className="w-4 h-4 text-blue-500 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
    />
  </svg>
);

interface TreeNodeProps {
  node: any;
  expandTogglePosition: "left" | "right";
}

const TreeNode = ({ node, expandTogglePosition }: TreeNodeProps) => {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;
  const Icon = node.icon || (node.isFolder ? <FolderIcon /> : <FileIcon />);

  const ExpandToggle = () =>
    hasChildren ? (
      <div
        className="text-gray-400 mr-2 select-none"
        onClick={(e) => {
          e.stopPropagation();
          setExpanded(!expanded);
        }}
      >
        {expanded ? "−" : "+"}
      </div>
    ) : (
      <div className="w-4 mr-2" /> // spacing placeholder
    );

  return (
    <div className="pl-4 border-l border-gray-300 p-[1px]">
      <div className="flex items-start cursor-pointer" onClick={() => setExpanded(!expanded)}>
        {expandTogglePosition === "left" && <ExpandToggle />}

        <div className="flex-1 flex items-start">
          <div className="h-4">{Icon}</div>
          <div>
            <div className="font-semibold h-4 text-gray-800">{node.title}</div>
            <div className="text-xs text-gray-500 mt-1">{node.description}</div>
          </div>
        </div>

        {expandTogglePosition === "right" && <ExpandToggle />}
      </div>

      {expanded && hasChildren && <Tree data={node.children} expandTogglePosition={expandTogglePosition} />}
    </div>
  );
};

export default Tree;
