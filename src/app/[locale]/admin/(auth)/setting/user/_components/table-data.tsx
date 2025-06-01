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
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Pagination } from "@heroui/pagination";

import { ColumnKey, COLUMNS } from "../_type";
import { useUserContext } from "../_context";
import { useDeleteUser } from "../_hooks/use-delete-user";

import ActionDropdown from "@/app/[locale]/admin/_components/action-dropdown";
import { User } from "@/types/user-lists";
import { ConfirmDialog } from "@/app/[locale]/admin/_components/confirmation-dialog";
import { useAuth } from "@/app/[locale]/admin/_context/auth-context";
import { showToast } from "@/utils/show-toast";
import { EnumRole } from "@/types/enums";

export default function TableData() {
  const {
    users: data,
    pages,
    page,
    setPage,
    isLoading,
    onRefetch,
  } = useUserContext();
  const router = useRouter();
  const locale = useLocale();
  const { user: authUser } = useAuth();
  const [selectedId, setSelectedId] = useState<User["uuid"]>("");
  const { mutate: deleteUser } = useDeleteUser();

  const loadingState = isLoading ? "loading" : "idle";
  const isOpen = selectedId !== "";
  const renderCell = useCallback((data: User, columnKey: ColumnKey) => {
    const cellValue = data[columnKey as keyof User];

    switch (columnKey) {
      case "name":
        return <p> {data.name}</p>;
      case "email":
        return <p> {data.email}</p>;
      case "role":
        return <p> {data.role}</p>;
      case "actions":
        return (
          <ActionDropdown
            actions={
              authUser?.role.toLowerCase() === EnumRole.Admin.toLowerCase() &&
              authUser?.uuid !== data.uuid
                ? ["edit", "delete"]
                : ["edit"]
            }
            onAction={(action) => {
              if (action === "edit") {
                router.push(`/${locale}/admin/setting/user/edit/${data.uuid}`);
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
        aria-label="user table"
        classNames={{
          base: "max-h-[480px] overflow-scroll xs:max-w-[350px] md:max-w-full md:max-h-[700x]",
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
          deleteUser(
            { uuid: selectedId },
            {
              onSuccess: () => {
                showToast({
                  type: "success",
                  title: `User deleted`,
                  description: "User has been deleted successfully",
                });

                setSelectedId("");
                onRefetch();
              },
              onError: (error) => {
                showToast({
                  type: "success",
                  title: `User deleted`,
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
