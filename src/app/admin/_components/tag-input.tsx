"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@heroui/theme";
import { ControllerRenderProps } from "react-hook-form";

interface FormTagInputProps {
  id: string;
  field: ControllerRenderProps<any, any>;
  label?: string;
  placeholder?: string;
  isInvalid?: boolean;
  errorMessage?: string;
}

export default function FormTagInput({
  id,
  field,
  label,
  placeholder = "Add tags...",
  isInvalid,
  errorMessage,
}: FormTagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAddTag = () => {
    const trimmed = inputValue.trim();

    if (trimmed && !field.value.includes(trimmed)) {
      field.onChange([...field.value, trimmed]);
    }
    setInputValue("");
  };

  const handleRemoveTag = (index: number) => {
    const newTags = [...field.value];

    newTags.splice(index, 1);
    field.onChange(newTags);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddTag();
    } else if (e.key === "Backspace" && inputValue === "") {
      handleRemoveTag(field.value.length - 1);
    }
  };

  return (
    <div className="flex flex-col gap-1">
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
          "heroui-input-wrapper flex flex-wrap gap-2 px-3 py-2 min-h-[42px] items-center",
          isInvalid && "ring-1 ring-heroui-danger",
        )}
      >
        {field.value?.map((tag: string, index: number) => (
          <div
            key={index}
            className="flex items-center gap-1 bg-heroui-default-300 text-white text-sm rounded px-2 py-1"
          >
            {tag}
            <button
              className="text-xs hover:text-red-400"
              type="button"
              onClick={() => handleRemoveTag(index)}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}

        <input
          className="bg-transparent text-sm text-white outline-none flex-1 min-w-[120px] placeholder:text-heroui-default-400"
          id={id}
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {isInvalid && (
        <span className="text-xs text-heroui-danger mt-1">{errorMessage}</span>
      )}
    </div>
  );
}
