import express from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import { connectDB } from "../config/db.js";
// import authRoutes from "../routes/authRoutes.js";
import { getDB } from "../config/db.js";
import bcrypt from "bcrypt";

// sign
import {
  addUser,
  updateUsername,
  updateEmail,
  updatePassword,
  updateFullname,
} from "../controllers/authController.js";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const staticRoot = join(__dirname, "../public");

app.use(express.static(staticRoot));
app.use(express.json());

// app.use("/api/auth", authRoutes);

const indexHandler = (req, res) => {
  res.sendFile(join(staticRoot, "index.html"));
};

const getAllUsers = async () => {
  try {
    const db = getDB();

    const existingUser = (await db.collection("users").find({}).toArray()).map(
      (user) => {
        return {
          username: user.username,
          fullname: user.fullname,
        };
      }
    );
    return existingUser;
  } catch (err) {
    console.log(err, "Error fetching users");
  }
};

app.get("/api/users", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    console.log(err, "Error fetching users");
  }
});

app.post("/api/users", (req, res) => addUser(req, res));

app.put("/api/users/:userId/username", (req, res) => updateUsername(req, res));
app.put("/api/users/:userId/email", (req, res) => updateEmail(req, res));
app.put("/api/users/:userId/password", (req, res) => updatePassword(req, res));
app.put("/api/users/:userId/fullname", (req, res) => updateFullname(req, res));

// app.put("/api/users", (req, res) => {
//   if (req.body.username) {
//     updateUsername(req, res);
//   } else if (req.body.password) {
//     updatePassword(req, res);
//   } else if (req.body.fullname) {
//     updateFullname(req, res);
//   } else if (req.body.email) {
//     updateEmail(req, res);
//   } else
//     res
//       .status(400)
//       .send("Please provide a username, email, password, or fullname");
// });

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
