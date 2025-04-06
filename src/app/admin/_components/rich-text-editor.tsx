"use client";

import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Link,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useMemo } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { renderToStaticMarkup } from "react-dom/server";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

interface RichTextEditorProps {
  field: ControllerRenderProps<any, any>;
  label?: string;
  placeholder?: string;
}

export default function RichTextEditor({
  field,
  label,
  placeholder = "Type here...",
}: RichTextEditorProps) {
  const modules = useMemo(() => {
    return {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
      ],
    };
  }, []);

  useEffect(() => {
    if (field.value === null) {
      field.onChange("");
    }

    if (typeof window !== "undefined") {
      const Quill = require("react-quill-new").Quill;
      const icons = Quill.import("ui/icons");

      icons.bold = renderToStaticMarkup(<Bold size={16} />);
      icons.italic = renderToStaticMarkup(<Italic size={16} />);
      icons.underline = renderToStaticMarkup(<Underline size={16} />);
      icons.strike = renderToStaticMarkup(<Strikethrough size={16} />);
      icons.link = renderToStaticMarkup(<Link size={16} />);
      icons.list = renderToStaticMarkup(<List size={16} />);
      icons["list-ordered"] = renderToStaticMarkup(<ListOrdered size={16} />);

      if (icons.header) {
        icons.header["1"] = renderToStaticMarkup(<Heading1 size={16} />);
        icons.header["2"] = renderToStaticMarkup(<Heading2 size={16} />);
        icons.header["3"] = renderToStaticMarkup(<Heading3 size={16} />);
      }
    }
  }, [field]);

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-white">{label}</label>
      )}
      <div className="custom-quill">
        <ReactQuill
          className="text-white"
          modules={modules}
          placeholder={placeholder}
          theme="snow"
          value={field.value}
          onChange={field.onChange}
        />
      </div>
    </div>
  );
}
