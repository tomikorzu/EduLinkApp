"use client";

import { useState } from "react";
import { fetchData } from "@/utils/fetch/data";

export default function RegisterPage() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSumbit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetchData(
      "auth/register",
      "POST",
      {
        fullname,
        email,
        password,
      },
      null
    );
    if (res.status === 201) {
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
          type="text"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
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
          Register
        </button>
      </form>
    </main>
  );
}
