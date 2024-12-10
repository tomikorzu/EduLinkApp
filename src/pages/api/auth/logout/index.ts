import { NextApiRequest, NextApiResponse } from "next";

export default function LogoutHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  } else {
    return res.status(200).json({ message: "Logout successfully" });
  }
}
