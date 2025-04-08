"use client";
import { Input } from "@heroui/input";
import { Search } from "lucide-react";

type InputSearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function InputSearch({
  value,
  onChange,
  placeholder = "Type to search...",
}: InputSearchProps) {
  return (
    <div className="flex justify-end">
      <Input
        isClearable
        className="max-w-lg"
        classNames={{
          innerWrapper: "bg-transparent",
        }}
        placeholder={placeholder}
        radius="lg"
        startContent={<Search className="size-4" />}
        value={value}
        onValueChange={onChange}
      />
    </div>
  );
}
