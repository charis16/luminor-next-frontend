"use client";

import { useEffect, useRef, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
} from "lucide-react";
import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import { cn } from "@heroui/theme";

import MyReactQuill from "./react-quill";

interface RichTextEditorProps {
  id: string;
  field: ControllerRenderProps<any, any>;
  label?: string;
  placeholder?: string;
  isInvalid?: boolean;
  errorMessage?: string;
}

export default function RichTextEditor({
  id,
  field,
  label,
  placeholder = "Type here...",
  isInvalid,
  errorMessage,
}: RichTextEditorProps) {
  const editorRef = useRef<any>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (field.value === null) {
      field.onChange("");
    }
  }, [field]);

  const formatText = (command: string, value: any = true) => {
    const editor = editorRef.current?.getEditor();

    if (editor) {
      editor.format(command, value);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          className={cn(
            "text-sm font-medium",
            isInvalid ? "text-heroui-danger" : "text-white",
          )}
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <div
        className={cn(
          "custom-quill flex flex-col gap-2 bg-heroui-default-100 overflow-hidden rounded-md p-2 rounded-md transition-all duration-150",
          isInvalid && "!bg-danger-50 hover:!border-danger-100 is-invalid",
          isFocused && "border-2 border-white",
        )}
      >
        <div className={cn("flex flex-wrap gap-1")}>
          <Select
            aria-label="Heading Format"
            className={cn("w-[120px]")}
            classNames={{
              mainWrapper: "border-none ",
              trigger: `border-none bg-transparent`,
            }}
            defaultSelectedKeys={["normal"]}
            placeholder="Select Heading"
            radius="full"
            size="sm"
            onSelectionChange={(keys) => {
              const val = Array.from(keys)[0];

              if (val === "normal") {
                formatText("header", false);
              } else {
                formatText("header", Number(val));
              }
            }}
          >
            <SelectItem key="normal">Normal</SelectItem>
            <SelectItem key="1">H1</SelectItem>
            <SelectItem key="2">H2</SelectItem>
            <SelectItem key="3">H3</SelectItem>
          </Select>
          <Button
            isIconOnly
            className="border-none"
            radius="full"
            size="sm"
            type="button"
            variant="ghost"
            onPress={() => formatText("bold")}
          >
            <Bold size={16} />
          </Button>
          <Button
            isIconOnly
            className="border-none"
            radius="full"
            size="sm"
            type="button"
            variant="ghost"
            onPress={() => formatText("italic")}
          >
            <Italic size={16} />
          </Button>
          <Button
            isIconOnly
            className="border-none"
            radius="full"
            size="sm"
            type="button"
            variant="ghost"
            onPress={() => formatText("underline")}
          >
            <Underline size={16} />
          </Button>
          <Button
            isIconOnly
            className="border-none"
            radius="full"
            size="sm"
            type="button"
            variant="ghost"
            onPress={() => formatText("strike")}
          >
            <Strikethrough size={16} />
          </Button>
          <Button
            isIconOnly
            className="border-none"
            radius="full"
            size="sm"
            type="button"
            variant="ghost"
            onPress={() => formatText("list", "ordered")}
          >
            <ListOrdered size={16} />
          </Button>
          <Button
            isIconOnly
            className="border-none"
            radius="full"
            size="sm"
            type="button"
            variant="ghost"
            onPress={() => formatText("list", "bullet")}
          >
            <List size={16} />
          </Button>
        </div>
        <MyReactQuill
          ref={editorRef}
          classNames={{
            placeholder: "text-heroui-default-300",
          }}
          modules={{ toolbar: false }}
          placeholder={placeholder}
          theme="snow"
          value={field.value}
          onBlur={() => setIsFocused(false)}
          onChange={field.onChange}
          onFocus={() => setIsFocused(true)}
        />
      </div>

      {isInvalid && (
        <span className="text-xs text-heroui-danger p-1">{errorMessage}</span>
      )}
    </div>
  );
}
