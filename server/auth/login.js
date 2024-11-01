import db from "../config/users-db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.SECRET_KEY;

export const login = (req, res) => {
  const { emailOrUsername, password } = req.body;

  db.get(
    `SELECT id, username,email,password FROM users WHERE username = ? OR email = ?`,
    [emailOrUsername, emailOrUsername],
    async (err, row) => {
      if (err) {
        return res.status(500).json({ message: "There was a server error" });
      }

      if (!row) {
        return res.status(404).json({ message: "User not found" });
      }

      const result = new Promise((resolve) => {
        bcrypt.compare(password, row.password, (err, result) => {
          if (err) {
            res.status(500).json({ message: "There was a server error" });
            resolve(false);
          }

          if (!result) {
            res.status(401).json({ message: "Incorrect password" });
            resolve(false);
          }
          resolve(true);
        });
      });

      if (await result) {
        const token = jwt.sign({ emailOrUsername, id: row.id }, secretKey);
        return res.status(200).json({ message: "Login successful", token });
      }
    }
  );
};
