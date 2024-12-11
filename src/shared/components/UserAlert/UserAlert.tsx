"use client";

import { useEffect, useState } from "react";
import "./user-alert.css";

export default function UserAlert({
  danger,
  message,
}: {
  danger: boolean;
  message: string;
}) {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  return (
    <>
      {isActive && (
        <div
          className={`alert-menu fade-in ${
            danger === true ? "danger" : "succes"
          } `}
        >
          <i
            className={`fa-solid fa-${danger === true ? "xmark" : "check"}`}
          ></i>
          <p>{message}</p>
        </div>
      )}
    </>
  );
}
