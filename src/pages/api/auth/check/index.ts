import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "../../jwt/tokens";

export default async function CheckHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  } else {
    const token = req.headers.authorization;

    const user = verifyToken(token);

    return res.status(200).json({ user });
  }
}
