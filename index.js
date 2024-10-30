import express from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { createServer } from "http";
import userRouter from "./server/routes/users.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.static("./public"));

app.use("/users", userRouter);

const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("chat message", (m) => {
    console.log("A user message:", m);
  });
});

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
