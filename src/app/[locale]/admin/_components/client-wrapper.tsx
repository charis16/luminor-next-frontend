// components/ClientWrapper.tsx
"use client";

import React from "react";

import { useIsMounted } from "@/hooks/use-is-mounted";

interface ClientWrapperProps {
  children: React.ReactNode;
}

export const ClientWrapper = ({ children }: ClientWrapperProps) => {
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return <>{children}</>;
};
