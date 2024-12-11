"use client";

import SideBarItem from "./SideBarItem";
import { sidebarSections } from "./sidebarSections";
import { useContext } from "react";
import LogoutBtn from "./components/LogoutBtn/LogoutBtn";
import { AuthContext } from "@/shared/providers/auth";
import CreateCourseBtn from "./components/CreateCourse/CreateCourseBtn";
import JoinCourseBtn from "./components/JoinCourse/JoinCourseBtn";

export default function SideBar() {
  const { user } = useContext(AuthContext);

  const isAdmin = user?.user.role === "admin";

  function handleTask() {}

  return (
    <header className="fixed md:left-0 bg-[#333] text-[#f1f1f1] md:top-0 md:bottom-0 md:w-[200px]">
      {user && user.user.role === "admin" ? (
        <i className="fa-solid fa-user-tie"></i>
      ) : (
        <i className="fa-solid fa-user"></i>
      )}
      {user && isAdmin ? <CreateCourseBtn /> : <JoinCourseBtn />}
      <nav>
        <ul className="flex flex-col">
          {sidebarSections.map((item, index: number) => {
            return (
              <SideBarItem
                key={index}
                icon={item.icon}
                title={item.title}
                path={item.path}
              />
            );
          })}
        </ul>
      </nav>
      <LogoutBtn />
    </header>
  );
}
