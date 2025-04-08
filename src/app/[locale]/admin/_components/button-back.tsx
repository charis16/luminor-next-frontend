"use client";

import { Button } from "@heroui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ButtonBack() {
  const router = useRouter();
  const handleBack = () => router.back();

  return (
    <Button
      isIconOnly
      radius="full"
      type="button"
      variant="ghost"
      onPress={handleBack}
    >
      <ChevronLeft />
    </Button>
  );
}
