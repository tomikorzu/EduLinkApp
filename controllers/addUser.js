import { getDB } from "../config/db.js";
import bcrypt from "bcrypt";

import { verifyAll } from "./verifyUser.js";

export const defaultImage = "./assets/gm2.jpg";

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
    return res.status(400).json({ message: userCheck });
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
        return res.status(409).json({ message: "The email already exist" });
      } else if (existingUser) {
        return res.status(409).json({ message: "The username already exist" });
      } else {
        const result = await hashPassword(
          db,
          username,
          email,
          password,
          fullname
        );
        return res.status(201).json({
          message: "User created successfully",
          userId: result.insertedId,
        });
      }
    } catch (error) {
      console.error("Error signing up", error);
      res.status(500).json({ message: "Error signing up" });
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
    image: defaultImage,
  };

  return await db.collection("users").insertOne(newUser);
};
