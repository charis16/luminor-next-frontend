"use client";

import { Input, type InputProps } from "@heroui/input";
import { ControllerRenderProps, FieldError } from "react-hook-form";

interface InputTextProps extends InputProps {
  field?: ControllerRenderProps<any, any>;
  error?: FieldError;
}

export default function InputText({
  field,
  error,
  value,
  onChange,
  onBlur,
  name,
  ...rest
}: InputTextProps) {
  return (
    <Input
      {...rest}
      ref={field?.ref}
      className="scroll-mb-32"
      classNames={{
        inputWrapper: error && "bg-danger-50 hover:bg-danger-100",
        input: error && "placeholder:!text-danger-400",
        ...rest.classNames,
      }}
      errorMessage={error?.message}
      isInvalid={!!error}
      labelPlacement="outside"
      name={field?.name ?? name}
      value={field?.value ?? value}
      variant="bordered"
      onBlur={field?.onBlur ?? onBlur}
      onChange={field?.onChange ?? onChange}
      onFocus={(e) => {
        setTimeout(() => {
          if (e.currentTarget) {
            e.currentTarget.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }, 200);
      }}
    />
  );
}
