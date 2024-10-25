import express from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import { connectDB } from "../config/db.js";

// signup
import { addUser } from "../controllers/addUser.js";

// update
import {
  updateUsername,
  updateEmail,
  updatePassword,
  updateFullname,
  updateProfilePicture,
} from "../controllers/changeUser.js";

// delete
import { deleteUser, deleteProfilePicture } from "../controllers/deleteUser.js";

// get
import { getUserById, getAllUsers } from "../controllers/getUsers.js";

// login
import { loginUser, logoutUser } from "../controllers/logUser.js";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const staticRoot = join(__dirname, "../public");

app.use(express.static(staticRoot));
app.use(express.json());

const indexHandler = (req, res) => {
  res.sendFile(join(staticRoot, "index.html"));
};

// GET
app.get("/api/users/:userId", (req, res) => getUserById(req, res));
app.get("/api/users", (req, res) => getAllUsers(req, res));

// Login
app.post("/api/users/login", (req, res) => loginUser(req, res));

// Logout
app.post("/api/users/logout", (req, res) => logoutUser(req, res));

// Signup
app.post("/api/users", (req, res) => addUser(req, res));

// Update
app.put("/api/users/:userId/username", (req, res) => updateUsername(req, res));
app.put("/api/users/:userId/email", (req, res) => updateEmail(req, res));
app.put("/api/users/:userId/password", (req, res) => updatePassword(req, res));
app.put("/api/users/:userId/fullname", (req, res) => updateFullname(req, res));
app.put("/api/users/:userId/profile-picture", (req, res) =>
  updateProfilePicture(req, res)
);

// Delete
app.delete("/api/users/:userId", (req, res) => deleteUser(req, res));
app.delete("/api/users/:userId/profile-picture", (req, res) =>
  deleteProfilePicture(req, res)
);

// ********* ISSUES ********* //

// Password
app.post("/api/users/forgot-password", (req, res) => forgotPassword(req, res));
app.post("/api/users/reset-password", (req, res) => resetPassword(req, res));

// status
app.put("/api/users/:userId/status", (req, res) => updateUserStatus(req, res));

// requestFriend and acceptFriend
app.post("/api/users/:userId/friends", (req, res) => requestFriend(req, res));
app.put("/api/users/:userId/friends/accept", (req, res) => acceptFriend(req, res));

// getFriends
app.get("/api/users/:userId/friends", (req, res) => getFriends(req, res));

// getFriendRequests
app.get("/api/users/:userId/friend-requests", (req, res) =>
  getFriendRequests(req, res)
);

// blockPerson
app.put("/api/users/:userId/block", (req, res) => blockPerson(req, res));

// deleteFriend
app.delete("/api/users/:userId/friends", (req, res) => deleteFriend(req, res));

//  deleteFriendRequest
app.delete("/api/users/:userId/friend-requests", (req, res) =>
  deleteFriendRequest(req, res)
);

// showBlocked
app.get("/api/users/:userId/blocked", (req, res) => showBlocked(req, res));

// showActivity
app.get("/api/users/:userId/activity", (req, res) => showActivity(req, res));

// showMessages
app.get("/api/users/:userId/messages", (req, res) => showMessages(req, res));

// showNotifications
app.get("/api/users/:userId/notifications", (req, res) =>
  showNotifications(req, res)
);

// showSettings
app.get("/api/users/:userId/settings", (req, res) => showSettings(req, res));

// showUser
app.get("/api/users/:userId/user", (req, res) => showUser(req, res));

// showUserStatus
app.get("/api/users/:userId/user-status", (req, res) =>
  showUserStatus(req, res)
);

// showUsers
app.get("/api/users/search", (req, res) => searchUsers(req, res));

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("chat message", (m) => {
    console.log("A user message:", m);
  });
});

app.get(/.?/, indexHandler);

connectDB().then(() => {
  server.listen(process.env.PORT, () => {
    console.log(
      `Server is running on url http://localhost:${process.env.PORT}`
    );
  });
});
