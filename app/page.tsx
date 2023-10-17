"use client";
import { CustomButton } from "@/components";
import Link from "next/link";
import Image from "next/image";
import HomeNavbar from "@/components/HomeNavbar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/signin");
    },
  });

  useEffect(() => {
    router.push("./dashboard");
  });

  return (
    <main className="flex flex-col items-center justify-center text-white h-screen bg-white">
      <div className="bg-[#131A44] flex justify-center items-center rounded-[20px] h-[400px] w-[600px]">
        <Image
          src="/bookendailogo.svg"
          alt="logo_bookend"
          width={301}
          height={48}
          className="object-contain"
        />
      </div>
    </main>
  );
}
