import db from "../config/users.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    const userExist = await new Promise((resolve, reject) => {
      db.get(
        `SELECT username,email,password FROM users WHERE username = ? OR email = ?`,
        [emailOrUsername, emailOrUsername],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    });

    if (!userExist) {
      return res.status(404).json({ message: "Username or email not found" });
    }

    const passwordMatch = await bcrypt.compare(password, userExist.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "There was a problem in the server",
      error: err.message,
    });
  }
};
