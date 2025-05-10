"use client";

import { Button } from "@heroui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface ButtonBackProps {
  urlBack?: string;
}
export default function ButtonBack({ urlBack }: ButtonBackProps) {
  const router = useRouter();
  const handleBack = () => (urlBack ? router.push(urlBack) : router.back());

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
