import { changePageSetting } from "../utils/mainFunctions.js";

const socket = io();

// import { allUsers } from "../../api/index.js";

let totalUnreadMsg = 0;

let users = [];

// allUsers.then((users) => {
//   console.log(users);
// });

const fetchUsers = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/users");
    const users = await response.json();
    return users;
  } catch (err) {
    console.error("Error fetching users", err);
  }
};

export const asideMenu = async () => {
  const allUsers = await fetchUsers();
  allUsers.forEach((user) => users.push(user));
  const people = document.getElementById("users");
  updateUsers(users, people);
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", (e) =>
    searchPerson(e.target.value.toLowerCase(), people)
  );

  changePageTitle();
};

const createUserLayout = (user) => {
  const li = document.createElement("li");

  // let unreadMsgValue = getUnreadMessages(user.unreadMsg);

  li.innerHTML = `
      <img src="../assets/img/gm2.jpg" alt="User Image" class="person-image" />
      <div class="message-data">
        <h3 class="person-name">${user.fullname}</h3>
        <span class="last-message">Holaa</span>
      </div>
      <div>
        <span class="last-time">lastTimeMsg</span>
        <span class="unread-messages"></span>
      </div>`;

  const unreadMsg = li.querySelector(".unread-messages");
  if (unreadMsg.textContent === "") {
    unreadMsg.style.display = "none";
  }

  return li;
};

const updateUsers = (userList, peopleElement) => {
  peopleElement.innerHTML = "";
  if (userList.length > 0) {
    userList.forEach((user) => {
      if (user.unreadMsg > 99) user.unreadMsg = "99";
      const li = createUserLayout(user);
      peopleElement.appendChild(li);
    });
  } else {
    peopleElement.innerHTML = `<h2 class="fade-in no-users">No people here!</h2>
    <button id="new-friend">Add a new friend</button>`;
  }
};

const searchPerson = (searchValue, peopleElement) => {
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchValue)
  );
  updateUsers(filteredUsers, peopleElement);
};

const getUnreadMessages = (unreadMsg) => {
  if (unreadMsg <= 0) return "";
  if (unreadMsg > 99) return "99";
  totalUnreadMsg += unreadMsg;
  return unreadMsg;
};

const changePageTitle = () => {
  if (totalUnreadMsg < 1) {
    changePageSetting("Edulink", "/src/assets/img/huergo.png");
  } else if (totalUnreadMsg >= 99) {
    changePageSetting(`(99+) Edulink`, "/src/assets/img/huergo.png");
  } else {
    changePageSetting(
      `(${totalUnreadMsg}) Edulink`,
      "/src/assets/img/huergo.png"
    );
  }
};
