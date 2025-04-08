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

import { useFaqContext } from "../_context";
import { ColumnKey, COLUMNS, Faq } from "../_type";

import ActionDropdown from "@/app/[locale]/admin/_components/action-dropdown";

export default function TableData() {
  const {
    filteredFaq: data,
    pages,
    page,
    setPage,
    isLoading,
  } = useFaqContext();

  const loadingState = isLoading || data?.length === 0 ? "loading" : "idle";

  const renderCell = useCallback((data: Faq, columnKey: ColumnKey) => {
    const cellValue = data[columnKey as keyof Faq];

    switch (columnKey) {
      case "Answer":
        return <p> {data.answer}</p>;
      case "Question":
        return <p> {data.question}</p>;
      case "actions":
        return (
          <ActionDropdown
            actions={["view", "edit", "delete"]}
            onAction={(action) => {
              if (action === "edit") {
                // buka modal, redirect, dll
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
    <Table
      removeWrapper
      aria-label="Example table with client async pagination"
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
          <TableRow key={item?.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey as ColumnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
