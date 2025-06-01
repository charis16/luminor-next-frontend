"use client";

import { Pagination } from "@heroui/pagination";
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
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

import { useCategoryContext } from "../_context";
import { ColumnKey, COLUMNS } from "../_type";
import { useDeleteCategory } from "../_hooks/use-delete-category";

import ActionDropdown from "@/app/[locale]/admin/_components/action-dropdown";
import { useAuth } from "@/app/[locale]/admin/_context/auth-context";
import { CategoryDetail } from "@/types/category-lists";
import { ConfirmDialog } from "@/app/[locale]/admin/_components/confirmation-dialog";
import { showToast } from "@/utils/show-toast";
import { EnumRole } from "@/types/enums";

export default function TableData() {
  const {
    categories: data,
    pages,
    page,
    setPage,
    isLoading,
    onRefetch,
  } = useCategoryContext();
  const { user: authUser } = useAuth();
  const { mutate: deleteCategory } = useDeleteCategory();
  const loadingState = isLoading ? "loading" : "idle";
  const router = useRouter();
  const locale = useLocale();
  const [selectedId, setSelectedId] = useState<CategoryDetail["uuid"]>("");

  const isOpen = selectedId !== "";

  const renderCell = useCallback(
    (data: CategoryDetail, columnKey: ColumnKey) => {
      const cellValue = data[columnKey as keyof CategoryDetail];

      switch (columnKey) {
        case "category":
          return <p> {data.name}</p>;
        case "actions":
          return (
            <ActionDropdown
              actions={
                authUser?.role.toLowerCase() === EnumRole.Admin.toLowerCase()
                  ? ["edit", "delete"]
                  : ["edit"]
              }
              onAction={(action) => {
                if (action === "edit") {
                  router.push(
                    `/${locale}/admin/setting/category/edit/${data.uuid}`,
                  );
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
    },
    [],
  );

  return (
    <>
      <Table
        fullWidth
        isHeaderSticky
        removeWrapper
        aria-label="category table"
        classNames={{
          base: "max-h-[480px] overflow-scroll xs:max-w-[350px] lg:max-w-full md:max-h-[700x]",
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
          deleteCategory(
            { uuid: selectedId },
            {
              onSuccess: () => {
                showToast({
                  type: "success",
                  title: "Delete Category",
                  description: "Category has been deleted successfully",
                });

                setSelectedId("");
                onRefetch();
              },
              onError: (error) => {
                showToast({
                  type: "success",
                  title: "Delete Category",
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
