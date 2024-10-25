import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

export const loginUser = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    const db = getDB();
    const user = await db.collection("users").findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });
    if (!user) return res.status(404).send("User not found");

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(400).send("Incorrect password");

    const currentUser = await db
      .collection("users")
      .findOne({ _id: new ObjectId(user._id) });

    return res
      .status(200)
      .send("Login successful with user: " + currentUser.username);
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).send("Error logging in");
  }
};
