"use client";

interface InfoRowProps {
  label: string;
  description: string;
  value: React.ReactNode;
}

export function InfoRow({ label, description, value }: InfoRowProps) {
  return (
    <div className="flex justify-between items-start gap-2 text-xs">
      <div className="flex flex-col min-w-0">
        <span className="font-medium opacity-90">{label}</span>
        <span className="opacity-50 text-[10px]">{description}</span>
      </div>
      <span className="font-mono opacity-80 shrink-0">{value}</span>
    </div>
  );
}
