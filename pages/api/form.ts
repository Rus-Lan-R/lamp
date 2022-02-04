import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req);

  if (req.method === "POST") {
  } else {
    res.status(404).end();
  }
};
