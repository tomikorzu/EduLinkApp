"use client";

import { useState, useEffect, createContext } from "react";

import { fetchData } from "@/utils/fetch/data";

import Loading from "../components/Loading/Loading";

export const AuthContext = createContext<{
  isAuthenticate: boolean;
  setIsAuthenticate: React.Dispatch<React.SetStateAction<boolean>>;
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticate, setIsAuthenticate] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    setToken(storedToken);
  }, []);

  async function checkIsAuthenticate() {
    try {
      const res = await fetchData("auth/check", "GET", null, {
        Authorization: `Bearer ${token}`,
      });

      //   if (response.data.user) {
      //     const user = response.data.user;
      //     localStorage.setItem("user", JSON.stringify(user));
      //   }

      if (res.status === 200) {
        // if (response.data.user.role.toLowerCase() === "admin") {
        //   setIsAdmin(true);
        // }
        setIsAuthenticate(true);
      } else {
        setIsAuthenticate(false);
      }
    } catch (error) {
      console.error(error);
      setIsAuthenticate(false);
    }
  }

  useEffect(() => {
    if (token) {
      checkIsAuthenticate();
    }
  }, [token]);

  if (isAuthenticate === null) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticate, setIsAuthenticate, isAdmin, setIsAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
}
