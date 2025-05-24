"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Spinner } from "@heroui/spinner";
import { useCallback, useState } from "react";
import { useLocale } from "next-intl";
import { Pagination } from "@heroui/pagination";
import { useRouter } from "next/navigation";

import { useFaqContext } from "../_context";
import { ColumnKey, COLUMNS } from "../_type";
import { useDeleteFaq } from "../_hooks/use-delete-faq";

import ActionDropdown from "@/app/[locale]/admin/_components/action-dropdown";
import { FaqDetail } from "@/types/faq-lists";
import { useAuth } from "@/app/[locale]/admin/_context/auth-context";
import { ConfirmDialog } from "@/app/[locale]/admin/_components/confirmation-dialog";
import { showToast } from "@/utils/show-toast";

export default function TableData() {
  const locale = useLocale();
  const { user: authUser } = useAuth();
  const {
    faq: data,
    pages,
    page,
    setPage,
    isLoading,
    onRefetch,
  } = useFaqContext();
  const [selectedId, setSelectedId] = useState<FaqDetail["uuid"]>("");
  const { mutate: deleteFaq } = useDeleteFaq();
  const router = useRouter();
  const loadingState = isLoading || data?.length === 0 ? "loading" : "idle";
  const isOpen = selectedId !== "";
  const renderCell = useCallback((data: FaqDetail, columnKey: ColumnKey) => {
    const cellValue = data[columnKey as keyof FaqDetail];

    switch (columnKey) {
      case "Answer":
        if (locale === "en") {
          return <p> {data.answer_en}</p>;
        }

        return <p> {data.answer_id}</p>;

      case "Question":
        if (locale === "en") {
          return <p> {data.question_en}</p>;
        }

        return <p> {data.question_id}</p>;
      case "actions":
        return (
          <ActionDropdown
            actions={authUser?.role === "admin" ? ["edit", "delete"] : ["edit"]}
            onAction={(action) => {
              if (action === "edit") {
                router.push(`/${locale}/admin/website/faq/edit/${data.uuid}`);
              }
              if (action === "delete") {
                setSelectedId(data.uuid);
              }
            }}
          />
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <Table
        fullWidth
        isHeaderSticky
        removeWrapper
        aria-label="category table"
        classNames={{
          base: "max-h-[480px] overflow-scroll max-w-[350px] md:max-w-full md:max-h-[700x]",
        }}
        rowHeight={10}
      >
        <TableHeader columns={[...COLUMNS]}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              className="!text-white !font-semibold text-base"
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        {data.length === 0 ? (
          <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
        ) : (
          <TableBody
            items={data}
            loadingContent={
              <Spinner
                classNames={{ label: "text-foreground mt-4" }}
                color="white"
                variant="simple"
              />
            }
            loadingState={loadingState}
          >
            {(item) => (
              <TableRow key={item?.uuid}>
                {(columnKey) => (
                  <TableCell>
                    {renderCell(item, columnKey as ColumnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        )}
      </Table>
      {pages > 1 && (
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="default"
            page={page}
            size="sm"
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      )}
      <ConfirmDialog
        isOpen={isOpen}
        loading={false}
        onClose={() => setSelectedId("")}
        onConfirm={() =>
          deleteFaq(
            { uuid: selectedId },
            {
              onSuccess: () => {
                showToast({
                  type: "success",
                  title: "Faq deleted",
                  description: "Faq has been deleted successfully",
                });

                setSelectedId("");
                onRefetch();
              },
              onError: (error) => {
                showToast({
                  type: "danger",
                  title: "Error deleting Faq",
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
