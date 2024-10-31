import express from "express";
import db from "../config/users.js";
import bcrypt from "bcrypt";

import { validateAll } from "../middlewares/validateUsers.js";

const router = express.Router();

router.post("/register", validateAll, async (req, res) => {
  const { username, email, password, fullname } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.run(
      `INSERT INTO users (username, email, password, fullname) VALUES (?, ?, ?, ?)`,
      [username, email, hashedPassword, fullname],
      (err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "There was a problem in the server" });
        }
        res.status(201).json({
          message: "User added successfully",
          id: this.lastID,
          username,
          email,
          hashedPassword,
          fullname,
        });
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Error hashing password" });
  }
});

export default router;
