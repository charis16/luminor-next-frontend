"use client";

import { createContext, useContext, useRef } from "react";

import { AboutUsContextType, FormHandle } from "../_type";

const AboutUsContext = createContext<AboutUsContextType | null>(null);

export function useAboutUsContext() {
  const ctx = useContext(AboutUsContext);

  if (!ctx)
    throw new Error("AboutUsContext must be used within AboutUsProvider");

  return ctx;
}

export const AboutUsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const formRef = useRef<FormHandle>(null);

  return (
    <AboutUsContext.Provider
      value={{
        aboutUsBriefHomeEn: "",
        aboutUsBriefHomeId: "",
        aboutUsEn: "",
        aboutUsId: "",
        formRef,
      }}
    >
      {children}
    </AboutUsContext.Provider>
  );
};
