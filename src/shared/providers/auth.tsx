"use client";

import { useState, useEffect, createContext } from "react";
import { fetchData } from "@/utils/fetch/data";
import Loading from "../components/Loading/Loading";

interface AuthContextType {
  isAuthenticate: boolean;
  setIsAuthenticate: React.Dispatch<React.SetStateAction<boolean>>;
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  user: object | string | null;
  token: string | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticate, setIsAuthenticate] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [user, setUser] = useState<object | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticate(true);
    }
  }, []);

  async function checkIsAuthenticate() {
    if (!token) {
      setIsLoading(false);
      return;
    }
    try {
      const res = await fetchData("auth/check", "GET", null, {
        Authorization: `Bearer ${token}`,
      });

      if (res.data.user) {
        const user = res.data.user;
        localStorage.setItem("user", JSON.stringify(user));

        if (user.role === "admin") {
          setIsAdmin(true);
        }
        setUser(user);
        setIsAuthenticate(true);
      } else {
        setIsAuthenticate(false);
      }
    } catch (error) {
      console.error(error);
      setIsAuthenticate(false);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      checkIsAuthenticate();
    } else {
      setIsLoading(false);
    }
  }, [token]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticate,
        setIsAuthenticate,
        isAdmin,
        setIsAdmin,
        user,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
