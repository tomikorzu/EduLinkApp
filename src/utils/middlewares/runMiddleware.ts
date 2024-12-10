import { NextApiRequest, NextApiResponse } from "next";

type Middleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: (error?: Error | null) => void
) => void;

export function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  middlewares: Middleware[]
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const next = (error?: Error | null) => {
      if (error) {
        return reject(error);
      }

      if (middlewares.length === 0) {
        return resolve();
      }

      const middleware = middlewares.shift();

      if (middleware) {
        middleware(req, res, next);
      } else {
        resolve();
      }
    };

    next();
  });
}
