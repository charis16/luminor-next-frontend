"use client";

import dynamic from "next/dynamic";

export const ButtonAdd = dynamic(() => import("./button-add"), {
  ssr: false,
});

export const ButtonSave = dynamic(() => import("./button-save"), {
  ssr: false,
});

export const CategorySearchInput = dynamic(
  () => import("./category-search-input"),
  {
    ssr: false,
  },
);

export const Form = dynamic(() => import("./form"), {
  ssr: false,
});

export const TableData = dynamic(() => import("./table-data"), {
  ssr: false,
});
