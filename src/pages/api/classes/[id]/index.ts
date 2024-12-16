import { NextApiRequest, NextApiResponse } from "next";
import { getClassById } from "./getClassByIdService";
import { verifyToken } from "../../jwt/tokens";

export default async function getClassByIdHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const isTokenValid = verifyToken(token);

    if (!isTokenValid) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!id) {
      return res.status(400).json({ error: "Class id is required" });
    }

    const classData = await getClassById(id as string);

    if (!classData) {
      return res.status(404).json({ error: "Classes not found" });
    }

    return res.status(200).json({ classData });
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
