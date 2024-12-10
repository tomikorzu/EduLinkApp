import type { Metadata } from "next";
import { openSans } from "@/assets/fonts/google";
import "./index.scss";

import { AuthProvider } from "@/shared/providers/auth";

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
      <AuthProvider>
        <body className={openSans.className}>{children}</body>
      </AuthProvider>
    </html>
  );
}
