"use client";
import { Button } from "@heroui/button";
import { Save } from "lucide-react";

import { useContactInformationContext } from "../_context";

export default function ButtonSave() {
  const { formRef } = useContactInformationContext();

  const handleSave = () => {
    formRef.current?.submit(); // atau validasi, atau getValues dsb.
  };

  return (
    <Button className="w-full md:w-fit" type="button" onPress={handleSave}>
      <Save className="size-4 shrink-0" />
      Save
    </Button>
  );
}
