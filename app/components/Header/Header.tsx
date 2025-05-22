import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <header className=" flex flex-col items-center justify-center gap-y-2.5 ">
      <h1 className="font-bold text-4xl xl:text-5xl text-red-700">AnimeCity</h1>
      <Link href="/" className="  rounded-full ">
        <Image
          src="/img/logo.webp"
          width={130}
          height={130}
          className="object-contain rounded-full"
          alt="Logo"
        />
      </Link>
    </header>
  );
};
