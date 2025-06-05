import { ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  subtitle?: string;
}

export default function EmptyState({ icon, title, subtitle }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center space-y-4">
      <div className="w-20 h-20 rounded-full bg-muted/10 flex items-center justify-center">
        {icon}
      </div>
      <h2 className="text-lg md:text-3xl font-semibold text-white">{title}</h2>
      {subtitle && (
        <h4 className="text-neutral-400 max-w-md text-base md:text-xl">
          {subtitle}
        </h4>
      )}
    </div>
  );
}
