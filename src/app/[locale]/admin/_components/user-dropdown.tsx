import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { LogOut, Settings } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";

export default function UserDropdown({
  collapsed = false,
}: {
  collapsed?: boolean;
}) {
  const isMobile = useIsMobile();

  return (
    <div className="w-full px-4 py-4">
      <Dropdown placement={isMobile ? "top" : "left"}>
        <DropdownTrigger
          classNames={{
            trigger: "border-none",
          }}
        >
          <Button className="w-full justify-start gap-3 bg-transparent hover:bg-foreground-200 text-white py-6 rounded-md">
            <Avatar
              alt="Profile"
              fallback="SC"
              radius="full"
              size="sm"
              src="/profile.jpg"
            />
            {!collapsed && (
              <div className="flex flex-col text-left leading-tight">
                <span className="text-sm font-medium">shadcn</span>
                <span className="text-xs text-gray-400">m@example.com</span>
              </div>
            )}
          </Button>
        </DropdownTrigger>

        <DropdownMenu className="w-56" variant="faded">
          <DropdownSection showDivider title="Account">
            <DropdownItem
              key="setting"
              startContent={<Settings className="w-4 h-4" />}
            >
              Settings
            </DropdownItem>
          </DropdownSection>
          <DropdownSection>
            <DropdownItem
              key="logout"
              className="text-red-500"
              startContent={<LogOut className="w-4 h-4" />}
            >
              Log out
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
