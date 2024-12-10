import Link from "next/link";

export const metadata = {
  title: "Profile Page",
  description: "Profile page",
};

export default function ProfilePage() {
  return (
    <>
      <h1>Profile Page</h1>
      <Link href={"/"}>dashboard</Link>
    </>
  );
}
