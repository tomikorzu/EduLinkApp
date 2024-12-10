import type { Metadata } from "next";
import { openSans } from "@/assets/fonts/google";
import "./index.scss";

export const metadata: Metadata = {
  title: "EduLink",
  description: "This ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={openSans.className}>{children}</body>
    </html>
  );
}
