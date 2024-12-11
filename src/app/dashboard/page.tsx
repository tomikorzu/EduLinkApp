"use client";

import Loading from "@/shared/components/Loading/Loading";
import { AuthContext } from "@/shared/providers/auth";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const { user, token } = useContext(AuthContext)!;

  useEffect(() => {
    if (!token || !user) {
      router.push("/login");
    }
  });

  if (!user || !user.user) {
    return <Loading />;
  }
  return (
    <main className="bg-gradient-to-l from-[#0b132b] to-[#1c2541] text-[#f1f1f1] min-h-screen md:ml-[200px] ">
      <h1 className="text-3xl font-bold text-[#e2e2e2]">Dashboard pages</h1>
      <ul>{user && <li>{user.user.role}</li>}</ul>
    </main>
  );
}
