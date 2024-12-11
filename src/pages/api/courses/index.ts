import { supabase } from "@/utils/supaBaseClient";
import { NextApiRequest, NextApiResponse } from "next";
import { getCourses } from "./coursesService";
import { verifyIsAdmin } from "../jwt/tokens";

export default async function CoursesHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const token = req.headers.authorization;

    const isTokenValid = verifyIsAdmin(token);

    const courses = await getCourses(isTokenValid);

    if (!courses) {
      return res.status(404).json({ error: "Courses not found" });
    }

    return res.status(200).json(courses);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
