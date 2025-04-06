"use client";
import { Button } from "@heroui/button";
import { Save } from "lucide-react";

import { useAboutUsContext } from "../_context/about-us-context";

export default function ButtonSave() {
  const { formRef } = useAboutUsContext();

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
