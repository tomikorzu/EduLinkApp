"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { AuthContext } from "@/shared/providers/auth";

export default function HomePage() {
  const router = useRouter();
  const { user } = useContext(AuthContext)!;

  return <h1>about Page</h1>;
}
