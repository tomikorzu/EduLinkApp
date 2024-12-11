import type { Metadata } from "next";
import { openSans } from "@/assets/fonts/google";
import "./index.scss";
import { AuthProvider } from "@/shared/providers/auth";
import { AlertProvider } from "@/shared/providers/alert";
import "@fortawesome/fontawesome-free/css/all.min.css";

export const metadata: Metadata = {
  title: "EduLink",
  description: "This is EduLink",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body className={openSans.className}>
        <AlertProvider>
          <AuthProvider>{children}</AuthProvider>
        </AlertProvider>
      </body>
    </html>
  );
}
