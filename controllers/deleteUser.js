import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";

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
