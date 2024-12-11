"use client";

import { fetchData } from "@/utils/fetch/data";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSumbit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetchData(
      "auth/login",
      "POST",
      { email, password },
      null
    );
    if (res.status === 200) {
      if (res.data.token) {
        const token = res.data.token;
        sessionStorage.setItem("token", token);
      }
    } else {
      console.error(res.data.errors);
    }
  }
  return (
    <main className="flex items-center justify-center min-h-screen bg-[#555]">
      <form onSubmit={handleSumbit} className="bg-[#333] flex flex-col gap-2 ">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-[#2ee01d] text-[#f1f1f1]">
          Login
        </button>
      </form>
    </main>
  );
}
