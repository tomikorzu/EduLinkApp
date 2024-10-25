import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

export const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const db = getDB();
    const userObjectId = new ObjectId(userId);

    const user = await db.collection("users").findOne({ _id: userObjectId });
    if (!user) return res.status(404).send("User not found");

    return res.status(200).send(user);
  } catch (error) {
    console.error("Error getting user by ID:", error);
    return res.status(500).send("Error getting user by ID");
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const db = getDB();

    const users = await db.collection("users").find().toArray();

    return res.status(200).send(users);
  } catch (error) {
    console.error("Error getting all users:", error);
    return res.status(500).send("Error getting all users");
  }
};
