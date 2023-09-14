"use client";

import { CustomButton } from "@/components";
import HomeNavbar from "@/components/HomeNavbar";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handleSignInClick = async () => {
    setLoading(true);
    try {
      await signIn("okta", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-start text-white">
      <HomeNavbar />
      <div className="text-lg font-semibold h-[400px] flex flex-col justify-center items-center bg-grey rounded-lg p-16 mt-6 text-center">
        Discovery Page is under Development For User Dashboard <br></br>Login
        Using Okta
        <br></br>
        <CustomButton
          title="Sign in"
          containerStyles="rounded-[8px] py-[8px] px-6 hover-whit mt-4 hover-blue"
          textStyles="text-[15px] font-medium text-white mr-2"
          rightIcon="/arrow_right.svg"
          handleClick={handleSignInClick}
          isDisabled={loading}
        />
      </div>
    </main>
  );
}
