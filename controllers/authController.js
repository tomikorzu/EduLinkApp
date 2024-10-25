import { getDB } from "../config/db.js";
import bcrypt from "bcrypt";
import {
  verifyAll,
  verifyUsername,
  verifyEmail,
  veriyPassword,
  verifyFullname,
} from "./verifyUser.js";
import { ObjectId } from "mongodb";

export const addUser = async (req, res) => {
  const { username, email, password, fullname } = req.body;

  const userCheck = verifyAll(username, email, password, fullname);

  return await createUser(res, userCheck, username, email, password, fullname);
};

const createUser = async (
  res,
  userCheck,
  username,
  email,
  password,
  fullname
) => {
  if (userCheck !== true) {
    return res.status(400).send(userCheck);
  } else {
    try {
      const db = getDB();
      const existingEmail = await db.collection("users").findOne({
        $or: [{ email }],
      });
      const existingUser = await db.collection("users").findOne({
        $or: [{ username }],
      });
      if (existingEmail) {
        return res.status(409).send("The email already exist");
      } else if (existingUser) {
        return res.status(409).send("The username already exist");
      } else {
        const result = await hashPassword(
          db,
          username,
          email,
          password,
          fullname
        );
        return res.status(201).send({
          message: "User created successfully",
          userId: result.insertedId,
        });
      }
    } catch (error) {
      console.error("Error signing up", error);
      res.status(500).send("Error signing up");
    }
  }
};

const hashPassword = async (db, username, email, password, fullname) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    username,
    email,
    password: hashedPassword,
    fullname,
    firstSignUp: new Date(),
    status: "active",
  };

  return await db.collection("users").insertOne(newUser);
};

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
