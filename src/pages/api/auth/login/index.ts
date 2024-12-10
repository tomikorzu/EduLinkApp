import { NextApiRequest, NextApiResponse } from "next";

export default async function LoginRegister(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    return res.status(200).json({ message: "Login is here" });
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
