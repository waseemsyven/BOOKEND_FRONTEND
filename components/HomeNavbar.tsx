import React from "react";
import Link from "next/link";
import Image from "next/image";

function HomeNavbar() {
  return (
    <div className="w-full justify-between items-center p-4 bg-grey">
      <Link href="/" className="flex justify-center items-center">
        <Image
          src="/logo_bookend.svg"
          alt="logo_bookend"
          width={32}
          height={32}
          className="object-contain py-2"
        />
        <h2 className="text-[22px] font-bold text-white m-2">Bookend</h2>
      </Link>
    </div>
  );
}

export default HomeNavbar;
