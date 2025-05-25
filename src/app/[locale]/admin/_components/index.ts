"use client";

import dynamic from "next/dynamic";

export { ClientWrapper } from "./client-wrapper";
// Export semua komponen dengan ssr: true
export const ActionDropdown = dynamic(() => import("./action-dropdown"), {
  ssr: true,
});

export const ButtonBack = dynamic(() => import("./button-back"), {
  ssr: true,
});

export const DropzoneInput = dynamic(
  () => import("./dropzone").then((mod) => mod.default), // named export
  { ssr: true },
);

export const InputSearch = dynamic(() => import("./input-search"), {
  ssr: true,
});

export const InputText = dynamic(() => import("./input-text"), {
  ssr: true,
});

export const InputTextArea = dynamic(() => import("./input-textarea"), {
  ssr: true,
});

export const ReactQuillEditor = dynamic(() => import("./react-quill"), {
  ssr: false,
});

export const RichTextEditor = dynamic(() => import("./rich-text-editor"), {
  ssr: false,
});

export const FormTagInput = dynamic(() => import("./tag-input"), {
  ssr: true,
});

export const TitlePage = dynamic(() => import("./title-page"), {
  ssr: true,
});

export const UserDropdown = dynamic(() => import("./user-dropdown"), {
  ssr: true,
});

export const SelectOption = dynamic(() => import("./select-option"), {
  ssr: true,
});

export const Sidebar = dynamic(() => import("./sidebar"), {
  ssr: true,
});

export const Header = dynamic(() => import("./header"), {
  ssr: true,
});

export const LanguageSwitcher = dynamic(() => import("./language-switcher"), {
  ssr: true,
});
