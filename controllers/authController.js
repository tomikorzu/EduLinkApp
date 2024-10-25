import { getDB } from "../config/db.js";
import bcrypt from "bcrypt";
import { verifyUser } from "./verifyUser.js";

export const addUser = async (req, res) => {
  const { username, email, password, fullname } = req.body;

  const userCheck = verifyUser(username, email, password, fullname);

  if (userCheck !== true) {
    return res.status(400).send(userCheck);
  } else {
    try {
      const db = getDB();
      const existingUser = await db.collection("users").findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        return res.status(409).send("The username or email already exist");
      } else {
        const result = await hashPassword(
          db,
          username,
          email,
          password,
          fullname
        );
        res.status(201).send({
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
  };

  return await db.collection("users").insertOne(newUser);
};
