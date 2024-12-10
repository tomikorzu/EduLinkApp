"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSumbit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ fullname, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    return data;
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
