"use client";

import dynamic from "next/dynamic";

export const ButtonSave = dynamic(() => import("./button-save"), {
  ssr: true,
});

export const Form = dynamic(() => import("./form"), {
  ssr: true,
});
