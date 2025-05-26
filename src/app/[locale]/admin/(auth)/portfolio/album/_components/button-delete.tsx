"use client";
import { Button } from "@heroui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";

import { useAlbumContext } from "../_context";
import { useDeleteAlbum } from "../_hooks/use-delete-album";

import { ConfirmDialog } from "@/app/[locale]/admin/_components/confirmation-dialog";
import { showToast } from "@/utils/show-toast";

export default function ButtonDelete({ uuid }: { uuid: string }) {
  const { onRefetch } = useAlbumContext();
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending } = useDeleteAlbum();

  return (
    <>
      <Button className="bg-red-600" onPress={() => setIsOpen(true)}>
        <Trash2 className="size-4 shrink-0" />
        Delete
      </Button>
      <ConfirmDialog
        isOpen={isOpen}
        loading={isPending}
        onClose={() => setIsOpen(false)}
        onConfirm={() =>
          mutate(
            { uuid: uuid },
            {
              onSuccess: () => {
                showToast({
                  type: "success",
                  title: "Album deleted",
                  description: "Album has been deleted successfully",
                });

                setIsOpen(false);
                onRefetch();
              },
              onError: (error) => {
                showToast({
                  type: "danger",
                  title: "Error deleting Album",
                  description: error.message,
                });
              },
            },
          )
        }
      />
    </>
  );
}
