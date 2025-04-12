"use client";

import { createContext, useContext, useRef } from "react";

import { FormHandle, HeroVideoContextType } from "../_type";

const HeroVideoContext = createContext<HeroVideoContextType | null>(null);

export function useHeroVideoContext() {
  const ctx = useContext(HeroVideoContext);

  if (!ctx)
    throw new Error(
      "useHeroVideoContext must be used within HeroVideoProvider",
    );

  return ctx;
}

export const HeroVideoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const formRef = useRef<FormHandle>(null);

  return (
    <HeroVideoContext.Provider
      value={{
        formRef,
      }}
    >
      {children}
    </HeroVideoContext.Provider>
  );
};
