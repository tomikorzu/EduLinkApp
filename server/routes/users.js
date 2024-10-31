import express from "express";
import db from "../config/users.js";
import bcrypt from "bcrypt";

import { validateAll } from "../middlewares/validateUsers.js";

const router = express.Router();

router.post("/register", validateAll, async (req, res) => {
  const { username, email, password, fullname } = req.body;

  try {
    const userExists = await new Promise((resolve, reject) => {
      db.get(
        `SELECT username, email FROM users WHERE username = ? OR email = ?`,
        [username, email],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    });

    if (userExists) {
      if (userExists.username === username) {
        return res.status(409).json({ message: "Username already exists" });
      } else if (userExists.email === email) {
        return res.status(409).json({ message: "Email already exists" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO users (username, email, password, fullname) VALUES (?, ?, ?, ?)`,
        [username, email, hashedPassword, fullname],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(this.lastID);
          }
        }
      );
    });

    res.status(201).json({
      message: "User added successfully",
      username,
      email,
      fullname,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "There was a problem in the server",
      error: err.message,
    });
  }
});

export default router;
