import { NextApiRequest, NextApiResponse } from "next";
import { joinCourse } from "./joinCourseService";

export default async function JoinCourseHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { courseName, courseCode } = req.body;

    if (!courseName || !courseCode) {
      return res
        .status(400)
        .json({ error: "Course name and code are required" });
    }

    const isJoinded = await joinCourse(courseName, courseCode);

    if (isJoinded === true) {
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
