import { changePageSetting } from "../utils/mainFunctions.js";
import { navigate } from "../../App.js";

const getUserImage = async (img) => {
  const currentUser = await getCurrentUser();
  const response = await fetch(
    "http://localhost:3000/api/users/671b1d07b6c7a15f6b777215/",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
};
let sections = [
  [
    {
      title: "Home",
      icon: "fa-solid fa-home",
      link: "/",
    },
    {
      title: "DMs",
      icon: "fa-solid fa-comment",
      link: "/chat",
    },
    {
      title: "Activity",
      icon: "fa-solid fa-bell",
      link: "/activity",
    },
    {
      title: "Calendar",
      icon: "fa-solid fa-calendar",
      link: "/calendar",
    },
    {
      title: "To Do List",
      icon: "fa-solid fa-clipboard-list",
      link: "/todolist",
    },
  ],
  [
    {
      title: "Settings",
      icon: "fa-solid fa-cog",
    },
  ],
];

export const asideBar = async () => {
  const userImage = await getUserImage();
  sections[1].push({
    title: "Profile",
    userImage,
  });

  const asideBarNav = document.getElementById("aside-bar-nav");

  sections[0].forEach((section) => {
    const btn = document.createElement("button");
    btn.innerHTML = `<i class="${section.icon}"></i> <span>${section.title}</span>`;
    btn.addEventListener("click", () => navigate(section.link));
    btn.classList.add("aside-bar-btn");
    asideBarNav.appendChild(btn);
  });

  const asideBarUl = document.getElementById("aside-bar-ul");
};
