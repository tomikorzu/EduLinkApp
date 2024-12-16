import { NextApiRequest, NextApiResponse } from "next";
import { createTask } from "./createTaskService";

export default async function CreateTaskHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { id } = req.query;
    const { title, description, dueDate, teacher_id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Class id is required" });
    }

    if (!title || !description || !dueDate) {
      return res
        .status(400)
        .json({ error: "Title, description and due date are required" });
    }

    const isTaskCreated = await createTask(
      id as string,
      title,
      description,
      dueDate,
      teacher_id as string
    );

    if (!isTaskCreated) {
      return res.status(400).json({ error: "Task not created" });
    }

    return res.status(201).json({ message: "Task created successfully" });
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
