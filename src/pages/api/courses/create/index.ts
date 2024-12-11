import { NextApiRequest, NextApiResponse } from "next";
import { createCourse } from "./createCourseService";
import { getUserByToken, verifyIsAdmin } from "../../jwt/tokens";

export default async function createCourseHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { courseName, courseCode, courseDescription, courseVisibility } =
      req.body;
    const token = req.headers.authorization;

    const isTokenValid = verifyIsAdmin(token);

    if (!isTokenValid) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const creator = getUserByToken(token);
    if (creator === null) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const creator_id = creator.id;
    try {
      const result = await createCourse(
        courseName,
        courseCode,
        courseDescription,
        creator_id,
        courseVisibility
      );
      return res
        .status(201)
        .json({ message: "Course created successfully", data: result });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
