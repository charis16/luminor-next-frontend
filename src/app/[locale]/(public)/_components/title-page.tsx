"use client";

import { useIsMobile } from "@/hooks/use-mobile";

export interface TitlePageProps {
  title: string;
  subtitle: string;
}

export default function TitlePage({ title, subtitle }: TitlePageProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="flex flex-col items-center justify-center pt-20 gap-2">
        <p className="text-gray-500 text-sm uppercase mt-4 relative whitespace-nowrap">
          {title}
        </p>
        <div className="w-3/4 h-[1px] bg-gray-600" />
        <p className="text-gray-400 text-4xl font-bold uppercase tracking-wide relative whitespace-nowrap">
          {subtitle}
        </p>
      </div>
    );
  }

  return (
    <div className="fixed left-0 top-0 h-full w-[120px] flex flex-col items-center justify-center">
      <div className="absolute left-1/2 top-0 h-full w-[1px] bg-gray-600" />

      <p className="text-gray-500 text-sm uppercase absolute left-[40%] bottom-[40%] -rotate-90 origin-center transform -translate-x-1/2 whitespace-nowrap">
        {title}
      </p>

      {/* Subtitle (Big Text) */}
      <p className="text-gray-400 text-4xl font-bold uppercase tracking-wide absolute left-[70%] bottom-[50%] -rotate-90 origin-center transform -translate-x-1/2 whitespace-nowrap">
        {subtitle}
      </p>
    </div>
  );
}
