"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CustomButton } from "@/components";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function Page() {
  const { status } = useSession();
  const router = useRouter();
  const [domain, setdomain] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [currentTab, setcurrentTab] = useState("default");

  

  useEffect(() => {
    if (status == "authenticated") {
      router.push("/dashboard");
    }
  }, [status]);

  const handleLogin = async (email, password) => {
    await signIn("credentials", {
      email,
      password,
      domain,
      redirect: false,
    }).then((res) => {
      if (res?.error === null) {
        toast.success("login successful", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        router.push("/dashboard");
      } else {
        toast.error("An error occurred during sign-in.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
  };

  const isDisabled = !email || !password || !domain;

  return (
    <div className="h-screen w-full bg-[#F7FAFB] flex justify-center items-center">
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
        {currentTab == "default" && (
          <div className="bg-white flex justify-center items-center flex-col rounded-[20px]">
            <h2 className="text-2xl font-semibold	mb-8">
              Welcome to Bookend.AI
            </h2>
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
              <span
                className="underline underline-offset-1 cursor-pointer"
                onClick={() => setcurrentTab("contactus")}
              >
                Contact Us
              </span>
            </h3>
          </div>
        )}
        {currentTab == "contactus" && (
          <div className="bg-white flex justify-center items-center flex-col rounded-[20px]">
            <h2 className="text-2xl font-semibold	mb-8 flex w-full justify-start pl-20">
              {" "}
              <Image
                src="/back-icon.svg"
                alt="back-icon"
                width={28}
                height={28}
                className="object-contain mr-16 cursor-pointer"
                onClick={() => setcurrentTab("default")}
              />
              Contact Us
            </h2>
            <div className="input-secondary-container mb-6">
              <h3>Full Name</h3>
              <input
                placeholder="Enter Full name"
                className="input-secondary"
                value={domain}
                onChange={(e) => setdomain(e.target.value)}
              />
            </div>
            <div className="input-secondary-container mb-6">
              <h3>Email</h3>
              <input
                placeholder="Enter email ID"
                className="input-secondary"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className="input-secondary-container mb-6">
              <h3>Domain</h3>
              <input
                placeholder="Enter domain name"
                className="input-secondary"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className="input-secondary-container mb-6 ">
              <h3>Use case</h3>
              <input
                placeholder="Use Case
                Describe your requirements"
                className="input-secondary h-20"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>

            <CustomButton
              title="Submit"
              containerStyles="bg-dark-blue rounded-[8px] gap-2 hover-blue py-2 px-8"
              textStyles="text-[16px] font-medium text-white"
              isDisabled={isDisabled}
              handleClick={async () => {
                await handleLogin(email, password);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
