import { NextApiRequest, NextApiResponse } from "next";
import {
  getTeacherById,
  getTeacherPersonalData,
} from "./getTeacherByIdService";

export default async function TeacherHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;

    const teacherData = await getTeacherById(id as string);

    if (!teacherData) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    const { teacher_id: teacherId } = teacherData;

    const personalData = await getTeacherPersonalData(teacherId);

    if (!personalData) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    return res.status(200).json({ teacher: personalData });
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
