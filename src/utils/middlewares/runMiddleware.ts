import { NextApiRequest, NextApiResponse } from "next";

export function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  middlewares: any[]
) {
  return new Promise<void>((resolve, reject) => {
    const next = (error?: any) => {
      if (error) {
        return reject(error);
      }
      if (middlewares.length === 0) {
        return resolve();
      }
      const middleware = middlewares.shift();
      middleware!(req, res, next);
    };
    next();
  });
}
