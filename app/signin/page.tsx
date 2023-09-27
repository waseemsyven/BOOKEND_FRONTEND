"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CustomButton } from "@/components";
import { signIn } from "next-auth/react";

function page() {
  const [domain, setdomain] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleLogin = async (email: any, password: any) => {
    await signIn("credentials", {
      email,
      password,
      domain,
      callbackUrl: "/dashboard",
    });
  };

  const isDisabled = !email || !password || !domain;

  return (
    <div className="h-screen w-full bg-[#FAFCFF] flex justify-center items-center">
      <div className="w-[1060px] h-[568px] shadow grid grid-cols-2 rounded-[20px]">
        <div className="bg-[#131A44] flex justify-center items-center rounded-tl-[20px] rounded-bl-[20px]">
          <Image
            src="/bookendailogo.svg"
            alt="logo_bookend"
            width={301}
            height={48}
            className="object-contain py-2"
          />
        </div>
        <div className="bg-white flex justify-center items-center flex-col rounded-[20px]">
          <h2 className="text-2xl font-semibold	mb-8">Welcome to Bookend.AI</h2>
          <div className="input-secondary-container mb-6">
            <h3>Domain Name</h3>
            <input
              placeholder="Enter domain name"
              className="input-secondary"
              value={domain}
              onChange={(e) => setdomain(e.target.value)}
            />
          </div>
          <div className="input-secondary-container mb-6">
            <h3>User Email</h3>
            <input
              placeholder="Enter email ID"
              className="input-secondary"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="input-secondary-container mb-6">
            <h3>Password</h3>
            <input
              placeholder="Enter password"
              type="password"
              className="input-secondary"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <CustomButton
            title="Login"
            containerStyles="bg-dark-blue rounded-[8px] gap-2 hover-blue py-2 px-8"
            textStyles="text-[16px] font-medium text-white"
            isDisabled={isDisabled}
            handleClick={async () => {
              await handleLogin(email, password);
            }}
          />
          <h3 className="text-sm text-[#404040] font-normal mt-8">
            Could not login?{" "}
            <span className="underline underline-offset-1">Contact Us</span>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default page;
