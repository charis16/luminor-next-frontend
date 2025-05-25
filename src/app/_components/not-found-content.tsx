"use client";

import Lottie from "lottie-react";
import Link from "next/link";
import { Button } from "@heroui/button";

import notFoundAnimation from "../../public/lottie/not-found.json";

interface NotFoundContentProps {
  urlBack?: string;
}

export default function NotFoundContent({ urlBack }: NotFoundContentProps) {
  return (
    <div className="flex h-screen items-center justify-center bg-black text-white px-4">
      <div className="text-center space-y-4 max-w-md">
        <Lottie animationData={notFoundAnimation} loop={true} />

        <Link href={urlBack ?? "/"}>
          <Button size="lg" variant="shadow">
            Go Back
          </Button>
        </Link>
      </div>
    </div>
  );
}
