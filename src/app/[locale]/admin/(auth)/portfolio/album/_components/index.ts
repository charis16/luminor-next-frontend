"use client";

import dynamic from "next/dynamic";

export const AlbumData = dynamic(() => import("./album-data"), {
  ssr: false,
});

export const AlbumSearchInput = dynamic(() => import("./album-search-input"), {
  ssr: false,
});

export const ButtonAdd = dynamic(() => import("./button-add"), {
  ssr: false,
});

export const ButtonEdit = dynamic(() => import("./button-edit"), {
  ssr: false,
});

export const SeoForm = dynamic(() => import("./form"), {
  ssr: false,
});
