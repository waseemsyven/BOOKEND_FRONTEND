import "./globals.css";
import type { Metadata } from "next";
import { NextAuthProvider } from "./providers";

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
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
