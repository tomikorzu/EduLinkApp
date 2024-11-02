import db from "../../config/users-db.js";
import bcrypt from "bcrypt";

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const id = req.params.id;

  const result = await isValidPassword(req, res, id, oldPassword, newPassword);

  if (result) {
    const isPasswordChanged = await applyChange(req, res, id, newPassword);

    if (isPasswordChanged) {
      return res
        .status(200)
        .json({ message: "Password changed successful", id });
    } else {
      return;
    }
  }
};

async function isValidPassword(req, res, id, oldPassword, newPassword) {
  if (!oldPassword || !newPassword) {
    return res
      .status(400)
      .json({ message: "All the fields must be completed" });
  }

  if (!/^.{8,}$/.test(newPassword)) {
    return res
      .status(400)
      .json({ message: "The new password must be at least 8 characters" });
  }
  if (!/^(?=.*[A-Z]).+$/.test(newPassword)) {
    return res.status(400).json({
      message: "The new password must contain at least one uppercase letter",
    });
  }
  if (!/^\S+$/.test(newPassword)) {
    return res
      .status(400)
      .json({ message: "The new password cannot contain spaces" });
  }

  return new Promise((resolve) => {
    db.get(`SELECT password FROM users WHERE id = ?`, id, async (err, row) => {
      if (err) {
        res.status(500).json({ message: "There was a server error" });
        return resolve(false);
      }

      if (!row) {
        res.status(404).json({ message: "User not found" });
        return resolve(false);
      }

      bcrypt.compare(oldPassword, row.password, (err, result) => {
        if (err) {
          res.status(500).json({ message: "There was a sever error" });
          return resolve(false);
        }

        if (!result) {
          res.status(401).json({ message: "Password not match" });
          return resolve(false);
        }

        bcrypt.compare(oldPassword, newPassword, (err) => {
          if (err) {
            res.status(500).json({ message: "There was a server error" });
            return resolve(false);
          }

          if (oldPassword === newPassword) {
            res.status(409).json({
              message: "The new password can not be the same that the older",
            });
            return resolve(false);
          }

          resolve(true);
        });
      });
    });
  });
}

async function applyChange(req, res, id, newPassword) {
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  return new Promise((resolve) => {
    db.run(
      `UPDATE users SET password = ? WHERE id = ?`,
      [hashedPassword, id],
      (err) => {
        if (err) {
          res.status(500).json({ message: "There was a sever error" });
          return resolve(false);
        }
        resolve(true);
      }
    );
  });
}

export default changePassword;
