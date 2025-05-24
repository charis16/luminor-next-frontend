"use client";

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
import { useRouter } from "next/navigation";

import { useAuth } from "../_context/auth-context";

import { useIsMobile } from "@/hooks/use-mobile";
import { useLogout } from "@/hooks/use-logout";
import { showToast } from "@/utils/show-toast";

export default function UserDropdown({
  collapsed = false,
}: {
  collapsed?: boolean;
}) {
  const isMobile = useIsMobile();
  const { mutate } = useLogout();
  const router = useRouter();
  const { user, onSetUser } = useAuth();

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        onSetUser(null);
        router.push("/admin");
      },
      onError: (err: { message?: string }) => {
        showToast({
          type: "danger",
          title: "Logout",
          description: err.message || "Logout gagal",
        });
      },
    });
  };

  return (
    <div className="w-full px-4 py-4">
      <Dropdown placement={isMobile ? "top" : "left"}>
        <DropdownTrigger
          classNames={{
            trigger: "border-none",
          }}
        >
          <Button className="w-full justify-start items-center gap-3 bg-transparent hover:bg-foreground-200 text-white py-2 rounded-md !h-auto">
            <Avatar
              alt="Profile"
              className="shrink-0"
              fallback="SC"
              radius="full"
              size="sm"
              src={user?.photo}
            />
            {!collapsed && (
              <div className="flex flex-col text-left leading-tight min-w-0">
                <span className="text-sm font-medium truncate">
                  {user?.name}
                </span>
                <span className="text-xs text-gray-400 truncate">
                  {user?.email}
                </span>
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
              onPress={handleLogout}
            >
              Log out
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
