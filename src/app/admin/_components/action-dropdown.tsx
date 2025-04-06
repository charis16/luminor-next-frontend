"use client";

import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { EllipsisVertical } from "lucide-react";

type ActionType = "view" | "edit" | "delete";

type ActionDropdownProps = {
  actions?: ActionType[];
  onAction?: (action: ActionType) => void;
};

const ACTION_LABELS: Record<ActionType, string> = {
  view: "View",
  edit: "Edit",
  delete: "Delete",
};

export default function ActionDropdown({
  actions = ["view", "edit", "delete"],
  onAction,
}: ActionDropdownProps) {
  return (
    <div className="relative flex justify-center items-center gap-2">
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly size="sm" variant="light">
            <EllipsisVertical className="text-white" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu onAction={(key) => onAction?.(key as ActionType)}>
          {actions.map((action) => (
            <DropdownItem key={action} className="outline-none">
              {ACTION_LABELS[action]}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
