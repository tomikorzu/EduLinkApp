import { getDB } from "../config/db.js";
import bcrypt from "bcrypt";
import { verifyAll, verifyUsername } from "./verifyUser.js";
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
  if (userCheck !== true) {
    return res.status(400).send(userCheck);
  }

  try {
    const db = getDB();
    let userObjectId;

    console.log("Received userId:", userId);

    try {
      userObjectId = new ObjectId(userId);
    } catch (error) {
      console.error("ObjectId conversion error:", error);
      return res.status(400).send("Invalid user ID format");
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
