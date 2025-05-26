// utils/blob-url.ts
const fileBlobMap = new Map<File, string>();

export function getBlobUrl(file: File): string {
  if (!fileBlobMap.has(file)) {
    const url = URL.createObjectURL(file);

    fileBlobMap.set(file, url);
  }

  return fileBlobMap.get(file)!;
}

export function revokeAllBlobUrls() {
  // Since WeakMap doesn't have forEach or clear, we need to track keys separately.
  // To fix this, we need to keep a Set of keys.
  // For now, you can only revoke known URLs, but not clear the WeakMap.
  // Alternatively, you can refactor to use Map instead of WeakMap if clearing is required.
  // Here is a fix using Map:

  // Replace WeakMap with Map at the top:
  // const fileBlobMap = new Map<File, string>();

  // Then this code works:
  fileBlobMap.forEach((url, file) => {
    URL.revokeObjectURL(url);
    fileBlobMap.delete(file);
  });
}
