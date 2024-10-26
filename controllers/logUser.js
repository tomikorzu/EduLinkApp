import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

export const loginUser = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    const db = getDB();
    if (!emailOrUsername || !password) {
      return res.status(400).json({ message: "Please provide all fields" });
    }
    const user = await db.collection("users").findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(400).json({ message: "Incorrect password" });

    const currentUser = await db
      .collection("users")
      .findOne({ _id: new ObjectId(user._id) });

    return res.status(200).json({
      message: "Login successful with user: " + currentUser.username,
      userId: currentUser._id,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Error logging in" });
  }
};

export const logoutUser = async (req, res) => {
  return res.status(200).json({ message: "Logout successful" });
};
