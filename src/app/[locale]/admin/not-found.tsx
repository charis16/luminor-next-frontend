// app/admin/not-found.tsx

import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function AdminNotFound() {
  return (
    <div className="flex h-screen items-center justify-center bg-black text-white px-4">
      <div className="text-center space-y-4 max-w-md">
        <AlertTriangle className="mx-auto h-12 w-12 text-yellow-400" />
        <h1 className="text-3xl font-bold">404 - Admin Page Not Found</h1>
        <p className="text-gray-400">
          The admin page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link
          className="inline-block mt-4 px-6 py-2 bg-white text-black font-medium rounded hover:bg-gray-200 transition"
          href="/admin"
        >
          Go back to Admin Dashboard
        </Link>
      </div>
    </div>
  );
}
