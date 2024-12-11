"use client";

import { createContext, useState } from "react";
import UserAlert from "../components/UserAlert/UserAlert";

interface AlertContextType {
  showAlert: (message: string) => void;
}

export const AlertContext = createContext<AlertContextType | null>(null);

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alert, setAlert] = useState({ message: "", danger: false });

  function showAlert(message: string, danger = false) {
    setAlert({ message, danger });
  }

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert.message && (
        <UserAlert danger={alert.danger} message={alert.message} />
      )}
    </AlertContext.Provider>
  );
}
