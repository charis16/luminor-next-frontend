"use client";

import dynamic from "next/dynamic";

export const AlbumData = dynamic(() => import("./album-data"), {
  ssr: false,
});

export const AlbumSearchInput = dynamic(() => import("./album-search-input"), {
  ssr: true,
});

export const ButtonAdd = dynamic(() => import("./button-add"), {
  ssr: true,
});

export const ButtonEdit = dynamic(() => import("./button-edit"), {
  ssr: true,
});

export const SeoForm = dynamic(() => import("./form"), {
  ssr: false,
});
