// components/ClientWrapper.tsx
"use client";

import React from "react";

interface ClientWrapperProps {
  children: React.ReactNode;
}

export const ClientWrapper = ({ children }: ClientWrapperProps) => {
  return <>{children}</>;
};
