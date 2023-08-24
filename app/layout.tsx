import "./globals.css";
import type { Metadata } from "next";
import { NextAuthProvider } from "./providers";
import { Navbar, Sidebar } from "@/components";

export const metadata: Metadata = {
  title: "Bookend",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <Sidebar>
            <Navbar />
            {children}
          </Sidebar>
        </NextAuthProvider>
      </body>
    </html>
  );
}
