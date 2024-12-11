import { runMiddleware } from "@/utils/middlewares/runMiddleware";
import { NextApiRequest, NextApiResponse } from "next";
import { loginMiddleware, validateErrors } from "./loginMiddleware";

export default async function LoginHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await runMiddleware(req, res, [...loginMiddleware]);

    const errorsMessages = validateErrors(req);

    if (errorsMessages) {
      return res.status(400).json({ errors: errorsMessages });
    }

    return res.status(200).json({ message: "Logged successfully!" });
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
