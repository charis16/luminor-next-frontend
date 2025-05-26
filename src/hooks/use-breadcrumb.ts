import { usePathname } from "next/navigation";

export function useBreadcrumb() {
  const pathname = usePathname();
  const parts = pathname
    .split("/")
    .filter(Boolean)
    .filter(
      (part) =>
        !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
          part,
        ), // filter part yang UUID
    );

  const breadcrumbs = parts.map((part, idx) => {
    const href = "/" + parts.slice(0, idx + 1).join("/");

    return {
      label: decodeURIComponent(part).replace(/-/g, " "),
      href,
    };
  });

  return breadcrumbs;
}
