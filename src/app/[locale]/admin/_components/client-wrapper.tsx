// components/ClientWrapper.tsx
"use client";

import React, { useEffect, useState } from "react";

interface ClientWrapperProps {
  children: React.ReactNode;
}

export const ClientWrapper = ({ children }: ClientWrapperProps) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return <>{children}</>;
};
