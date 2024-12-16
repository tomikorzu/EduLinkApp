import { NextApiRequest, NextApiResponse } from "next";
import { joinCourse } from "./joinCourseService";
import { getUserByToken, verifyToken } from "../../jwt/tokens";

export default async function JoinCourseHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { courseName, courseCode } = req.body;
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const isTokenValid = verifyToken(token);

    if (!isTokenValid) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = getUserByToken(token);

    if (!courseName || !courseCode) {
      return res
        .status(400)
        .json({ error: "Course name and code are required" });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isJoinded = await joinCourse(courseName, courseCode, user);

    if (isJoinded) {
      return res
        .status(200)
        .json({ message: `Joined to ${courseName} successfully` });
    } else {
      return res.status(400).json({ error: isJoinded });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
