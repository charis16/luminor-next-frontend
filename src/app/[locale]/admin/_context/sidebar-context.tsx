"use client";

import { createContext, useContext, useState } from "react";

import { useIsMounted } from "@/hooks/use-is-mounted";

type SidebarContextType = {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  isMobileOpen: boolean;
  toggleMobile: () => void;
  closeMobile: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isMounted = useIsMounted();

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);
  const toggleMobile = () => setIsMobileOpen((prev) => !prev);
  const closeMobile = () => setIsMobileOpen(false);

  if (!isMounted) return null;

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        toggleSidebar,
        isMobileOpen,
        toggleMobile,
        closeMobile,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context)
    throw new Error("useSidebar must be used within SidebarProvider");

  return context;
}
