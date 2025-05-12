const isBrowser = typeof window !== "undefined";

export const storage = {
  set<T>(key: string, value: T) {
    if (!isBrowser) return;
    try {
      const serialized = JSON.stringify(value);

      localStorage.setItem(key, serialized);
    } catch (err) {
      console.error("Failed to save to localStorage:", err);
    }
  },

  get<T>(key: string): T | null {
    if (!isBrowser) return null;
    try {
      const value = localStorage.getItem(key);

      return value ? (JSON.parse(value) as T) : null;
    } catch (err) {
      console.error("Failed to read from localStorage:", err);

      return null;
    }
  },

  remove(key: string) {
    if (!isBrowser) return;
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error("Failed to remove from localStorage:", err);
    }
  },
};
