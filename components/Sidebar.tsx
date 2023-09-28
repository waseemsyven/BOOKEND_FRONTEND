"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const user: any = session?.user;

  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();
  const handleHover = () => {
    setIsHovered(true);
  };

  const handleSignout = () => {
    signOut({ callbackUrl: "/signin" });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const renderSidebarStyles = () => {
    if (isHovered) {
      return "w-[200px] h-screen px-2 py-4 bg-dark-blue flex flex-col duration-200";
    }

    return "w-[80px] h-screen px-2 py-4 bg-dark-blue flex flex-col duration-200";
  };

  if (
    status === "unauthenticated" ||
    pathname === "/" ||
    pathname === "/signin"
  ) {
    return <div>{children}</div>;
  }

  return (
    <div className="flex">
      <div
        className={renderSidebarStyles()}
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseLeave}
      >
        <Link href="/" className="flex justify-center items-center">
          {!isHovered && (
            <Image
              src="/logo_bookend_closed.svg"
              alt="logo_bookend"
              width={32}
              height={32}
              className="object-contain py-2"
            />
          )}
          {isHovered && (
            <Image
              src="/logo_bookend.svg"
              alt="logo_bookend"
              width={132}
              height={22}
              className="object-contain py-2 pb-4"
            />
          )}
        </Link>
        <div className="w-full bg-[#F7FAFB] opacity-30 h-[1px] mt-2"></div>
        <div className="flex flex-col justify-between h-full">
          <div>
            {" "}
            <Link
              href="/dashboard"
              className={`flex ${
                isHovered ? "justify-start" : "justify-center"
              } items-center my-6 px-2 w-full hover:[#2B59C5] rounded-[8px] ${
                pathname.includes("dashboard") ? "bg-[#2B59C5]" : ""
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
              href="/datasets"
              className={`flex ${
                isHovered ? "justify-start" : "justify-center"
              } items-center my-6 px-2 w-full hover:bg-[#2B59C5] rounded-[8px] ${
                pathname === "/datasets" && "bg-[#2B59C5]"
              }`}
            >
              <Image
                src="/database.svg"
                alt="Datasets"
                width={24}
                height={24}
                className="object-contain py-4"
              />
              {isHovered && (
                <h2 className="text-[13px] font-semibold text-white ml-3">
                  Datasets
                </h2>
              )}
            </Link>
          </div>
          <div>
            <Link
              href="/"
              className={`flex ${
                isHovered ? "justify-start" : "justify-center"
              } items-center my-6 px-2 w-full hover:bg-[#2B59C5] rounded-[8px]`}
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
            <div className="w-full bg-[#F7FAFB] opacity-30 h-[1px]"></div>
            <div
              className={`flex ${
                isHovered ? "justify-start" : "justify-center"
              } items-center mt-6 px-2 w-full hover:bg-[#2B59C5] rounded-[8px] cursor-pointer`}
            >
              <Image
                src="/user_icon.svg"
                alt="logo_bookend"
                width={32}
                height={32}
                className="object-contain py-4"
              />
              {isHovered && (
                <h2 className="text-[13px] font-semibold text-white ml-3">
                  {user && user.first_name}
                </h2>
              )}
            </div>
            <div
              className={`flex ${
                isHovered ? "justify-start" : "justify-center"
              } items-center mt-6 px-2 w-full hover:bg-[#2B59C5] rounded-[8px] cursor-pointer`}
              onClick={handleSignout}
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

      <div className="flex flex-col w-full"> {children}</div>
    </div>
  );
};

export default Sidebar;
