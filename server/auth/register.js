import db from "../config/users-db.js";
import bcrypt from "bcrypt";

import roles from "../constants/roles.js";

const register = (req, res) => {
  const { username, email, password, fullname } = req.body;

  db.get(
    `SELECT username, email FROM users WHERE username = ? OR email = ?`,
    [username, email],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: "There was a server problem" });
      }

      if (result) {
        if (userExists.username === username) {
          return res.status(409).json({ message: "Username already exists" });
        } else if (userExists.email === email) {
          return res.status(409).json({ message: "Email already exists" });
        }
      }
    }
  );

  const hashedPassword = bcrypt.hash(password, 10);

  db.run(
    `INSERT INTO users (username, email, password, fullname, role) VALUES (?, ?, ?, ?, ?)`,
    [username, email, hashedPassword, fullname, roles.student],
    (err) => {
      if (err) {
        res.status(500).json({ message: "There was a server error" });
      }

      res.status(201).json({
        message: "User added successfully",
        username,
        email,
        fullname,
      });
    }
  );
};

export default register;
