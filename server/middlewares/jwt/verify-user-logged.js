import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.SECRET_KEY;

const verifyUserLogged = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(400).json({ message: "You are not logged" });
  }

  const onlyToken = token.split(" ")[1];

  jwt.verify(onlyToken, secretKey, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

export default verifyUserLogged;
