"use client";
import { Button } from "@heroui/button";
import { Save } from "lucide-react";

import { useUserContext } from "../_context";

export default function ButtonSave() {
  const { formRef } = useUserContext();

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
