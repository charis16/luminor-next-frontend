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
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

import { ColumnKey, COLUMNS } from "../_type";
import { useUserContext } from "../_context";

import ActionDropdown from "@/app/[locale]/admin/_components/action-dropdown";
import { User } from "@/types/user-lists";

export default function TableData() {
  const { users: data, pages, page, setPage, isLoading } = useUserContext();
  const router = useRouter();
  const locale = useLocale();

  const loadingState = isLoading || data?.length === 0 ? "loading" : "idle";

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
            actions={["view", "edit", "delete"]}
            onAction={(action) => {
              if (action === "edit") {
                router.push(`/${locale}/admin/setting/user/edit/${data.uuid}`);
              }
              if (action === "delete") {
                // konfirmasi delete
              }
              if (action === "view") {
                // tampilkan detail
              }
            }}
          />
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[100px] ">
        <Table
          isHeaderSticky
          removeWrapper
          aria-label="team table"
          bottomContent={
            pages > 1 ? (
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
            ) : null
          }
          className="table-fixed w-full max-w-1 md:max-w-full"
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
        </Table>
      </div>
    </div>
  );
}
