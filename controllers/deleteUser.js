import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";

import { defaultImage } from "./addUser.js";

export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const db = getDB();
    const userObjectId = new ObjectId(userId);

    const result = await db
      .collection("users")
      .deleteOne({ _id: userObjectId });

    if (result.deletedCount > 0) {
      return res.status(200).send("User deleted successfully");
    } else {
      return res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).send("Error deleting user");
  }
};

export const deleteProfilePicture = async (req, res) => {
  const { userId } = req.params;

  try {
    const db = getDB();
    const userObjectId = new ObjectId(userId);

    const currentUser = await db
      .collection("users")
      .findOne({ _id: userObjectId });
    if (!currentUser) return res.status(404).send("User not found");
    if (currentUser.image === defaultImage) {
      return res.status(400).send("User does not have a profile picture");
    }

    const result = await db
      .collection("users")
      .updateOne({ _id: userObjectId }, { $set: { image: defaultImage } });

    if (result.matchedCount > 0) {
      return res.status(200).send("Profile picture deleted successfully");
    } else {
      return res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error deleting profile picture:", error);
    return res.status(500).send("Error deleting profile picture");
  }
};
