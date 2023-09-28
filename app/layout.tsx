import "./globals.css";
import type { Metadata } from "next";
import { NextAuthProvider } from "./providers";
import { Sidebar } from "@/components";
import { NextUiProvider } from "./nextUiProvider";
import ToastProvider from "./toastProvider";
import "react-toastify/dist/ReactToastify.css";

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
        <ToastProvider>
          <NextAuthProvider>
            <NextUiProvider>
              <Sidebar>{children}</Sidebar>
            </NextUiProvider>
          </NextAuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
