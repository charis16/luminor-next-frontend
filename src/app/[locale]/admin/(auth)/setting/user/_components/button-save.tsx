"use client";
import { Button } from "@heroui/button";
import { Save } from "lucide-react";

import { useUserContext } from "../_context";

export default function ButtonSave() {
  const { formRef, isSubmitting } = useUserContext();

  const handleSave = () => {
    formRef.current?.submit(); // atau validasi, atau getValues dsb.
  };

  return (
    <Button
      className="w-full md:w-fit"
      isLoading={isSubmitting}
      type="button"
      onPress={handleSave}
    >
      <Save className="size-4 shrink-0" />
      Save
    </Button>
  );
}
