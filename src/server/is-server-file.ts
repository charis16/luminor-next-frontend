function isServerFile(value: unknown): value is Blob & { name: string } {
  return (
    value !== null &&
    value !== undefined &&
    typeof value === "object" &&
    typeof (value as any).name === "string" &&
    typeof (value as any).arrayBuffer === "function"
  );
}

export { isServerFile };
