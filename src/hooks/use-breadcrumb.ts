// hooks/use-breadcrumb.ts
import { usePathname } from "next/navigation";

export function useBreadcrumb() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);

  const breadcrumbs = parts.map((part, idx) => {
    const href = "/" + parts.slice(0, idx + 1).join("/");

    return {
      label: decodeURIComponent(part).replace(/-/g, " "),
      href,
    };
  });

  return breadcrumbs;
}
