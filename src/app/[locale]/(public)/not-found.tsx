// app/admin/not-found.tsx

import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center bg-black text-white px-4">
      <div className="text-center space-y-4 max-w-md">
        <AlertTriangle className="mx-auto h-12 w-12 text-yellow-400" />
        <h1 className="text-3xl font-bold">404 - Page Not Found</h1>

        <Link
          className="inline-block mt-4 px-6 py-2 bg-white text-black font-medium rounded hover:bg-gray-200 transition"
          href="/"
        >
          Go back
        </Link>
      </div>
    </div>
  );
}
