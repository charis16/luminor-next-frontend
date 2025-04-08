"use client";

import dynamic from "next/dynamic";

// Export semua komponen dengan ssr: false
export const ActionDropdown = dynamic(() => import("./action-dropdown"), {
  ssr: false,
});

export const ButtonBack = dynamic(() => import("./button-back"), {
  ssr: false,
});

export const DropzoneInput = dynamic(
  () => import("./dropzone").then((mod) => mod.default), // named export
  { ssr: false },
);

export const InputSearch = dynamic(() => import("./input-search"), {
  ssr: false,
});

export const InputText = dynamic(() => import("./input-text"), {
  ssr: false,
});

export const InputTextArea = dynamic(() => import("./input-textarea"), {
  ssr: false,
});

export const ReactQuillEditor = dynamic(() => import("./react-quill"), {
  ssr: false,
});

export const RichTextEditor = dynamic(() => import("./rich-text-editor"), {
  ssr: false,
});

export const FormTagInput = dynamic(() => import("./tag-input"), {
  ssr: false,
});

export const TitlePage = dynamic(() => import("./title-page"), {
  ssr: false,
});

export const UserDropdown = dynamic(() => import("./user-dropdown"), {
  ssr: false,
});

export { default as Sidebar } from "./sidebar";
export { default as Header } from "./header";
