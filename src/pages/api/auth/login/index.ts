import { runMiddleware } from "@/utils/middlewares/runMiddleware";
import { NextApiRequest, NextApiResponse } from "next";
import { loginMiddleware, validateErrors } from "./loginMiddleware";
import { createToken } from "../../jwt/tokens";
import { getUser } from "./loginService";

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
    try {
      const user = await getUser(req.body.email);

      const token = createToken(user);
      return res.status(200).json({ message: "Logged successfully!", token });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error server occurred while logging in" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
