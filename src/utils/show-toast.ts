import { addToast } from "@heroui/toast";

type ToastType = "success" | "warning" | "danger" | "info";

interface ShowToastOptions {
  type: ToastType;
  title?: string;
  timeout?: number;
  description?: string;
}

export function showToast({
  type,
  title,
  timeout = 1000,
  description,
}: ShowToastOptions) {
  // Map ToastType to valid color values for addToast
  const colorMap: Record<
    ToastType,
    | "success"
    | "warning"
    | "danger"
    | "default"
    | "foreground"
    | "primary"
    | "secondary"
  > = {
    success: "success",
    warning: "warning",
    danger: "danger",
    info: "primary", // Map "info" to "primary"
  };

  addToast({
    title: title,
    description: description,
    color: colorMap[type],
    timeout,
  });
}
