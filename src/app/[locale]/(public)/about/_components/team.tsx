"use client";
import { Image } from "@heroui/image";

export default function Team() {
  return (
    <div className="flex flex-col gap-6 mt-6 ">
      <div className="w-full flex justify-center items-center">
        <Image
          alt="Team Group"
          className="w-full h-auto max-h-[40vh] md:max-h-[65vh] object-cover"
          isBlurred={false}
          radius="none"
          removeWrapper={true}
          src={"https://fakeimg.pl/1920x1080"} // Ganti dengan URL asli
        />
      </div>

      {/* Grid untuk anggota individu */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="overflow-hidden group cursor-pointer">
            <Image
              alt={`Team Member ${index}`}
              className="w-full h-auto object-contain transition-transform duration-300 transform group-hover:scale-105"
              isBlurred={false}
              radius="none"
              removeWrapper={true}
              src={"https://fakeimg.pl/600x800"} // Ukuran potret individu
            />
          </div>
        ))}
      </div>
    </div>
  );
}
