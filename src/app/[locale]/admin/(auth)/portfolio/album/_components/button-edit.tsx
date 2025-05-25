"use client";
import { Button } from "@heroui/button";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ButtonEdit({ slug }: { slug: string }) {
  const router = useRouter();
  const handleEdit = (slug: string) =>
    router.push(`/admin/portfolio/album/edit/${slug}`);

  return (
    <Button onPress={() => handleEdit(slug)}>
      <Pencil className="size-4 shrink-0" />
      Edit
    </Button>
  );
}
