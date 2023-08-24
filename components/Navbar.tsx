"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  const [OrganizationName, setOrganizationName] = useState("Organization");
  const pathname = usePathname();
  console.log(pathname);
  useEffect(() => {
    const email = session?.user?.email;
    if (email) {
      const parts = email.split("@");

      if (parts.length === 2) {
        const username = parts[0];

        const domainParts = parts[1].split(".");

        if (domainParts.length >= 2) {
          const subdomain = domainParts[0];

          const result = `${subdomain}`;

          setOrganizationName(result);
        }
      }
    }
  }, [session]);

  if (!session) {
    return null;
  }

  return (
    <header className="w-full z-10 rounded-tl-2xl rounded-none bg-white">
      <nav className="mx-auto flex justify-between items-center px-6 py-4 bg-transparent">
        {pathname == "/dashboard" ? (
          <div className="flex gap-2">
            <Link href="/" className="flex justify-center items-center">
              <Image
                src="/office.svg"
                alt="office"
                width={22}
                height={20}
                className="object-contain"
              />
            </Link>
            <h1 className="nav__title capitalize">{OrganizationName}</h1>
          </div>
        ) : (
          <div></div>
        )}

        <div className="flex gap-2 items-end">
          <h2 className="black-100 text-[13px] font-semibold mb-1 capitalize">
            {session?.user?.name}
          </h2>
          <Link href="/" className="flex justify-center items-center">
            <Image
              src="/user_icon.svg"
              alt="user_icon"
              width={40}
              height={40}
              className="object-contain"
            />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
