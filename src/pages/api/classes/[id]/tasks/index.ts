import { NextApiRequest, NextApiResponse } from "next";
import { getTasks } from "./getTasksService";

export default async function GetTasksHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;

    const tasks = await getTasks(id as string);

    if (!tasks) {
      return res.status(404).json({ error: "Tasks not found" });
    }
    return res.status(200).json({ tasks });
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
