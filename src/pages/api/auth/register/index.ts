import { NextApiRequest, NextApiResponse } from "next";
import { createToken } from "../../jwt/tokens";
import { validateErrors, registerMiddleware } from "./registerMiddleware";
import bcrypt from "bcrypt";
import { registerUser } from "./registerService";
import { runMiddleware } from "@/utils/middlewares/runMiddleware";

export default async function RegisterHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { fullname, email, password } = req.body;

    await runMiddleware(req, res, [...registerMiddleware]);

    const errorsMessages = validateErrors(req);

    if (errorsMessages) {
      return res.status(400).json({ errors: errorsMessages });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      // const randomCode = Math.floor(100000 + Math.random() * 900000).toString();

      const user = await registerUser(fullname, email, hashedPassword);

      if (!user) {
        return res.status(500).json({ error: "user couldn't be inserted" });
      }

      const token = createToken(user);

      return res
        .status(201)
        .json({ message: "Registered successfully!", token });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error server occurred while registering" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
