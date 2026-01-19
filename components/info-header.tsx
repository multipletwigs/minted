"use client";

import { blockPatterns } from "@/lib/patterns";

interface InfoHeaderProps {
  title: string;
  description: string;
  patternIndex?: number;
}

export function InfoHeader({ title, description, patternIndex = 0 }: InfoHeaderProps) {
  const pattern = blockPatterns[patternIndex % blockPatterns.length];

  return (
    <div className="flex flex-col gap-1 px-4 pt-4 pb-3 font-mono">
      <div className="flex items-center gap-2">
        <span className="text-xs opacity-30">{pattern.slice(0, 8)}</span>
        <span className="text-sm font-bold uppercase tracking-widest">{title}</span>
      </div>
      <span className="text-xs opacity-60">{description}</span>
      <div
        className="h-px mt-2 opacity-30"
        style={{
          backgroundImage: "linear-gradient(to right, currentColor 50%, transparent 50%)",
          backgroundSize: "12px 1px",
        }}
      />
    </div>
  );
}
