"use client";

import { Select, SelectItem, SelectProps } from "@heroui/select";
import { SharedSelection } from "@heroui/system";
import { ControllerRenderProps, FieldError } from "react-hook-form";

export interface SelectionOptionItem {
  label: string;
  value: string;
}

interface SelectOptionProps
  extends Omit<SelectProps, "children" | "selectedKeys" | "onSelectionChange"> {
  selectedValue: string;
  selectItems: SelectionOptionItem[];
  field?: ControllerRenderProps<any, any>;
  error?: FieldError;
}

export default function SelectOption({
  selectedValue,
  selectItems,
  field,
  error,
  name,
  ...rest
}: SelectOptionProps) {
  return (
    <Select
      {...rest}
      ref={field?.ref}
      errorMessage={error?.message}
      isInvalid={!!error}
      labelPlacement="outside"
      name={field?.name ?? name}
      selectedKeys={[field?.value ?? selectedValue]}
      variant="bordered"
      onBlur={field?.onBlur}
      onSelectionChange={(keys: SharedSelection) =>
        field?.onChange?.(Array.from(keys as Set<string>)[0])
      }
    >
      {selectItems.map((item) => (
        <SelectItem key={item.value} className="outline-none">
          {item.label}
        </SelectItem>
      ))}
    </Select>
  );
}
