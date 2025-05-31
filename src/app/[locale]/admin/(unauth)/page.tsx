import { Image } from "@heroui/image";
import NextImage from "next/image";

import FormLogin from "./_components/form-login";
export default function AdminPage() {
  return (
    <div className="flex justify-center items-center min-h-dvh">
      <div className="flex flex-col md:flex-row max-w-5xl mx-auto w-full justify-center  ">
        <div className="flex flex-col items-center justify-center flex-1 md:border-r-1 gap-2  w-full md:w-1/2">
          <div className="relative size-14 md:size-40">
            <Image
              fill
              alt="Luminor"
              as={NextImage}
              className="object-contain" // Bisa juga object-cover tergantung tujuan
              isBlurred={false}
              removeWrapper={true}
              src="/images/logo.png"
            />
          </div>
          <h2 className="text-white text-3xl font-semibold uppercase tracking-wider">
            Luminor
          </h2>
        </div>
        <div className="flex-1  w-full md:w-1/2">
          <FormLogin />
        </div>
      </div>
    </div>
  );
}
