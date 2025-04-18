"use client";
import { Button } from "@heroui/button";
import { Save } from "lucide-react";

import { useFaqContext } from "../_context";

export default function ButtonSave() {
  const { formRef } = useFaqContext();

  const handleSave = () => {
    formRef.current?.submit(); // atau validasi, atau getValues dsb.
  };

  return (
    <Button className="w-full md:w-fit" type="button" onPress={handleSave}>
      <Save className="size-4" />
      Save
    </Button>
  );
}
