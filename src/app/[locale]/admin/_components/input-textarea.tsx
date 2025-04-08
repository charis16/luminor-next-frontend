"use client";

import { Textarea, TextAreaProps } from "@heroui/input";
import { ControllerRenderProps, FieldError } from "react-hook-form";

interface InputTextAreaProps extends TextAreaProps {
  field?: ControllerRenderProps<any, any>;
  error?: FieldError;
}

export default function InputTextArea({
  field,
  error,
  onChange,
  ...rest
}: InputTextAreaProps) {
  return (
    <Textarea
      {...rest}
      isClearable
      classNames={{
        inputWrapper: error && "bg-danger-50 hover:bg-danger-100",
        input: error && "placeholder:!text-danger-400",
        ...rest.classNames,
      }}
      errorMessage={error?.message}
      isInvalid={!!error}
      labelPlacement="outside"
      size="lg"
      variant="bordered"
      onChange={field?.onChange ?? onChange}
    />
  );
}
