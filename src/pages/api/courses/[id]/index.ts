import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "../../jwt/tokens";
import { getClasses, getCourseById } from "./getCourseByIdService";

export default async function getCourseByIdHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;
    const token = req.headers.authorization;

    if (!id) {
      return res.status(400).json({ error: "Course id is required" });
    }

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const isTokenValid = verifyToken(token);

    if (!isTokenValid) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const courseData = await getCourseById(id as string);
    console.log(courseData);
    

    if (!courseData) {
      return res.status(404).json({ error: "Course not found" });
    }

    const classes = await getClasses(id as string);

    if (!classes) {
      return res.status(404).json({ error: "Classes not found" });
    }

    return res.status(200).json({ data: courseData, classes });
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
