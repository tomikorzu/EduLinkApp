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
