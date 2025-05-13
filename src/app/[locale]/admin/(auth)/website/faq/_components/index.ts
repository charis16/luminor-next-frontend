"use client";

import dynamic from "next/dynamic";

export const ButtonAdd = dynamic(() => import("./button-add"), {
  ssr: true,
});

export const ButtonSave = dynamic(() => import("./button-save"), {
  ssr: true,
});

export const Form = dynamic(() => import("./form"), {
  ssr: true,
});

export const TableData = dynamic(() => import("./table-data"), {
  ssr: true,
});

export const FaqSearchInput = dynamic(() => import("./faq-search-input"), {
  ssr: true,
});
