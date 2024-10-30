import express from "express";
import db from "../config/users.js";

import { validateAll } from "../middlewares/validateUsers.js";

const router = express.Router();

router.post("/", validateAll, (req, res) => {
  const { username, email, password, fullname } = req.body;
  db.run(
    `INSERT INTO users (username, email, password, fullname) VALUES (?, ?, ?, ?)`,
    [username, email, password, fullname],
    (err) => {
      if (err) {
        res.status(500).json({ message: "There was a problem in the server" });
      }
      res.status(201).json({
        message: "User added successfully",
        id: this.lastId,
        username,
        email,
        password,
        fullname,
      });
    }
  );
});

export default router;
