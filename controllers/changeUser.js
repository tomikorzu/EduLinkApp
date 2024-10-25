import bcrypt from "bcrypt";
import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

import {
  verifyUsername,
  verifyEmail,
  veriyPassword,
  verifyFullname,
} from "./verifyUser.js";

export const updateUsername = async (req, res) => {
  const { username } = req.body;
  const { userId } = req.params;

  const userCheck = verifyUsername(username);
  if (userCheck !== true) return res.status(400).send(userCheck);

  try {
    const db = getDB();
    const userObjectId = new ObjectId(userId);

    const currentUser = await db
      .collection("users")
      .findOne({ _id: userObjectId });
    if (!currentUser) return res.status(404).send("User not found");
    if (currentUser.username === username) {
      return res
        .status(400)
        .send("New username cannot be the same as the current username");
    }

    const existingUser = await db.collection("users").findOne({ username });
    if (existingUser && existingUser._id.toString() !== userId) {
      return res.status(409).send("The username already exists");
    }

    const result = await db
      .collection("users")
      .updateOne({ _id: userObjectId }, { $set: { username } });

    if (result.matchedCount > 0) {
      return res.status(200).send("Username updated successfully");
    } else {
      return res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error updating username:", error);
    return res.status(500).send("Error updating username");
  }
};

export const updateEmail = async (req, res) => {
  const { email } = req.body;
  const { userId } = req.params;

  const userCheck = verifyEmail(email);
  if (userCheck !== true) return res.status(400).send(userCheck);

  try {
    const db = getDB();
    const userObjectId = new ObjectId(userId);

    const currentUser = await db
      .collection("users")
      .findOne({ _id: userObjectId });
    if (!currentUser) return res.status(404).send("User not found");
    if (currentUser.email === email) {
      return res
        .status(400)
        .send("New email cannot be the same as the current email");
    }

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser && existingUser._id.toString() !== userId) {
      return res.status(409).send("The email already exists");
    }

    const result = await db
      .collection("users")
      .updateOne({ _id: userObjectId }, { $set: { email } });

    if (result.matchedCount > 0) {
      return res.status(200).send("Email updated successfully");
    } else {
      return res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error updating email:", error);
    return res.status(500).send("Error updating email");
  }
};

export const updatePassword = async (req, res) => {
  const { password } = req.body;
  const { userId } = req.params;

  const userCheck = veriyPassword(password);
  if (userCheck !== true) return res.status(400).send(userCheck);

  try {
    const db = getDB();
    const userObjectId = new ObjectId(userId);

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db
      .collection("users")
      .updateOne({ _id: userObjectId }, { $set: { password: hashedPassword } });

    if (result.matchedCount > 0) {
      return res.status(200).send("Password updated successfully");
    } else {
      return res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).send("Error updating password");
  }
};

export const updateFullname = async (req, res) => {
  const { fullname } = req.body;
  const { userId } = req.params;

  const userCheck = verifyFullname(fullname);
  if (userCheck !== true) return res.status(400).send(userCheck);

  try {
    const db = getDB();
    const userObjectId = new ObjectId(userId);

    const currentUser = await db
      .collection("users")
      .findOne({ _id: userObjectId });
    if (!currentUser) return res.status(404).send("User not found");
    if (currentUser.fullname === fullname) {
      return res
        .status(400)
        .send("New fullname cannot be the same as the current fullname");
    }

    const result = await db
      .collection("users")
      .updateOne({ _id: userObjectId }, { $set: { fullname } });

    if (result.matchedCount > 0) {
      return res.status(200).send("Fullname updated successfully");
    } else {
      return res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error updating fullname:", error);
    return res.status(500).send("Error updating fullname");
  }
};

export const updateProfilePicture = async (req, res) => {
  const { image } = req.body;
  const { userId } = req.params;

  try {
    const db = getDB();
    const userObjectId = new ObjectId(userId);

    const currentUser = await db
      .collection("users")
      .findOne({ _id: userObjectId });
    if (!currentUser) return res.status(404).send("User not found");
    if (currentUser.image === image) {
      return res
        .status(400)
        .send(
          "New profile picture cannot be the same as the current profile picture"
        );
    }

    const result = await db
      .collection("users")
      .updateOne({ _id: userObjectId }, { $set: { image } });

    if (result.matchedCount > 0) {
      return res.status(200).send("Profile picture updated successfully");
    } else {
      return res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error updating profile picture:", error);
    return res.status(500).send("Error updating profile picture");
  }
};
