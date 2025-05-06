import { Image } from "@heroui/image";

import { ClientWrapper } from "../_components";

import FormLogin from "./_components/form-login";

export default function AdminPage() {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="flex flex-col md:flex-row max-w-5xl mx-auto w-full justify-center  ">
        <div className="flex flex-col items-center justify-center flex-1 md:border-r-1 gap-2  w-full md:w-1/2">
          <Image
            alt="Luminor"
            className="size-14 md:size-40" // Original size for desktop
            isBlurred={false}
            removeWrapper={true}
            src="/logo.png"
          />
          <h2 className="text-white text-3xl font-semibold uppercase tracking-wider">
            Luminor
          </h2>
        </div>
        <div className="flex-1  w-full md:w-1/2">
          <ClientWrapper>
            <FormLogin />
          </ClientWrapper>
        </div>
      </div>
    </div>
  );
}
