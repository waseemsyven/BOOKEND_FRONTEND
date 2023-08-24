"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();
  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    if (!session && status !== "loading") {
      router.push("/");
    }
  }, [session]);

  const handleSignOut = async () => {
    await signOut();
  };

  const renderSidebarStyles = () => {
    if (isHovered) {
      return "w-[200px] h-screen px-2 py-4 bg-dark-blue flex flex-col duration-75";
    }

    return "w-[80px] h-screen px-2 py-4 bg-dark-blue flex flex-col duration-75";
  };

  if (!session && status === "unauthenticated") {
    return <div className="flex flex-col w-full">{children}</div>;
  }

  return (
    <div className="flex">
      <div
        className={renderSidebarStyles()}
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseLeave}
      >
        <Link href="/" className="flex justify-center items-center">
          <Image
            src="/logo_bookend.svg"
            alt="logo_bookend"
            width={32}
            height={32}
            className="object-contain py-2"
          />
          {isHovered && (
            <h2 className="text-[22px] font-bold text-white m-2">Bookend</h2>
          )}
        </Link>
        <div className="border border-white w-[100%] mt-2"></div>
        <div className="flex flex-col justify-between h-full">
          <div>
            {" "}
            <Link
              href="/dashboard"
              className={`flex ${
                isHovered ? "justify-start" : "justify-center"
              } items-center my-6 px-2 w-full hover:bg-grey rounded-[8px] ${
                pathname === "/dashboard" && "bg-grey"
              }`}
            >
              <Image
                src="/gauge.svg"
                alt="logo_bookend"
                width={24}
                height={24}
                className="object-contain py-4"
              />
              {isHovered && (
                <h2 className="text-[13px] font-semibold text-white ml-3">
                  Dashboard
                </h2>
              )}
            </Link>{" "}
            <Link
              href="/org-management"
              className={`flex ${
                isHovered ? "justify-start" : "justify-center"
              } items-center my-6 px-2 w-full hover:bg-grey rounded-[8px]`}
            >
              <Image
                src="/network.svg"
                alt="network"
                width={24}
                height={24}
                className="object-contain py-4"
              />
              {isHovered && (
                <h2 className="text-[13px] font-semibold text-white ml-3">
                  Org Management
                </h2>
              )}
            </Link>{" "}
            <Link
              href="/models"
              className={`flex ${
                isHovered ? "justify-start" : "justify-center"
              } items-center my-6 px-2 w-full hover:bg-grey rounded-[8px] ${
                pathname === "/models" && "bg-grey"
              }`}
            >
              <Image
                src="/plugin.svg"
                alt="logo_bookend"
                width={24}
                height={24}
                className="object-contain py-4"
              />
              {isHovered && (
                <h2 className="text-[13px] font-semibold text-white ml-3">
                  Models
                </h2>
              )}
            </Link>
          </div>
          <div>
            <Link
              href="/"
              className={`flex ${
                isHovered ? "justify-start" : "justify-center"
              } items-center my-6 px-2 w-full hover:bg-grey rounded-[8px]`}
            >
              <Image
                src="/question.svg"
                alt="logo_bookend"
                width={24}
                height={24}
                className="object-contain py-4"
              />
              {isHovered && (
                <h2 className="text-[13px] font-semibold text-white ml-3">
                  Help & Support
                </h2>
              )}
            </Link>
            <div
              className={`flex ${
                isHovered ? "justify-start" : "justify-center"
              } items-center mt-6 px-2 w-full hover:bg-grey rounded-[8px] cursor-pointer`}
              onClick={() => handleSignOut()}
            >
              <Image
                src="/logout.svg"
                alt="logo_bookend"
                width={24}
                height={24}
                className="object-contain py-4"
              />
              {isHovered && (
                <h2 className="text-[13px] font-semibold text-white ml-3">
                  Logout
                </h2>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full">{children}</div>
    </div>
  );
};

export default Sidebar;
