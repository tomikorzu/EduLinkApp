import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET as string;

export function createToken(user: object) {
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  const token = jwt.sign({ user }, secret, {
    expiresIn: "1h",
  });
  return token;
}

export function verifyToken(token: string | undefined) {
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  try {
    if (token) {
      const tokenToVerify = token.split(" ")[1];

      const decoded = jwt.verify(tokenToVerify, secret);
      return decoded;
    } else {
      return "Token is not provided";
    }
  } catch (error) {
    console.error(error, "Error verifying token");
    return null;
  }
}

export function decodeToken(token: string) {
  return jwt.decode(token);
}
