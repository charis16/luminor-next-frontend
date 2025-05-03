function getHeaders() {
  return {
    "Content-Type": "application/json",
  };
}

function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    return res.json().then((data) => {
      throw new Error(data?.error || "Something went wrong");
    });
  }

  return res.json();
}

function toUrl(url: string): string {
  return url.startsWith("http")
    ? url
    : `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}${url}`;
}

export const goFetcher = {
  get: async <T = unknown>(url: string): Promise<T> => {
    const res = await fetch(toUrl(url), {
      method: "GET",
      headers: getHeaders(),
      credentials: "include",
    });

    return handleResponse<T>(res);
  },

  post: async <T = unknown, D = any>(url: string, data: D): Promise<T> => {
    const res = await fetch(toUrl(url), {
      method: "POST",
      headers: getHeaders(),
      credentials: "include",
      body: JSON.stringify(data),
    });

    return handleResponse<T>(res);
  },

  put: async <T = unknown, D = any>(url: string, data: D): Promise<T> => {
    const res = await fetch(toUrl(url), {
      method: "PUT",
      headers: getHeaders(),
      credentials: "include",
      body: JSON.stringify(data),
    });

    return handleResponse<T>(res);
  },

  patch: async <T = unknown, D = any>(url: string, data: D): Promise<T> => {
    const res = await fetch(toUrl(url), {
      method: "PATCH",
      headers: getHeaders(),
      credentials: "include",
      body: JSON.stringify(data),
    });

    return handleResponse<T>(res);
  },

  delete: async <T = unknown, D = any>(url: string, data: D): Promise<T> => {
    const res = await fetch(toUrl(url), {
      method: "DELETE",
      headers: getHeaders(),
      credentials: "include",
      body: JSON.stringify(data),
    });

    return handleResponse<T>(res);
  },
};
