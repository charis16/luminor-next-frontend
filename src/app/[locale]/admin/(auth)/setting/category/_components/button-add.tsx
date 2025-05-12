"use client";
import { Button } from "@heroui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ButtonAdd() {
  const router = useRouter();
  const handleAddNew = () => router.push("/admin/setting/category/create");

  return (
    <Button className="w-full md:w-fit" type="button" onPress={handleAddNew}>
      <Plus className="size-4" /> Add New
    </Button>
  );
}
