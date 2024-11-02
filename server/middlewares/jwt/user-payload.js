import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.SECRET_KEY;

const userPayload = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: "The acces token is required" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });

    req.user = {
      id: decoded.id,
    };

    if (decoded.id != req.params.id) {
      return res.status(403).json({ message: "User not authorized" });
    }

    next();
  });
};

export default userPayload;
