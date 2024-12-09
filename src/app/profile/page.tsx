import MainLayout from "@/layouts/MainLayout";
import Link from "next/link";

export const metadata = {
  title: "Profile Page",
  description: "Profile page",
};

export default function ProfilePage() {
  return (
    <MainLayout>
      <h1>Profile Page</h1>
      <Link href={"/dashboard"}>dashboard</Link>
    </MainLayout>
  );
}
