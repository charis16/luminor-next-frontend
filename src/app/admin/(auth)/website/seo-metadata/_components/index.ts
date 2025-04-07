"use client";

import dynamic from "next/dynamic";

export const ButtonSave = dynamic(() => import("./button-save"), {
  ssr: false,
});

export const Form = dynamic(() => import("./form"), {
  ssr: false,
});
