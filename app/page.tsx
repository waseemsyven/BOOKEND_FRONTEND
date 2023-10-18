"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { type DefaultSession } from "next-auth";

type UserWithSessionExpiry = {
  session_expiry?: string;
} & DefaultSession["user"];

declare module "next-auth" {
  interface Session {
    user: UserWithSessionExpiry;
  }
}

export default function Home() {
  const router = useRouter();
  const { status, data: sessionData } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/signin");
    },
  });

  const { user: { session_expiry: sessionExpiry = null } = {} } =
    sessionData || {};

  useEffect(() => {
    if (sessionExpiry) {
      const isSiteSessionExpired =
        sessionExpiry || new Date(sessionExpiry) < new Date();
      if (status === "authenticated" && isSiteSessionExpired) {
        signOut();
      }
    }
  }, [sessionExpiry, status]);

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
