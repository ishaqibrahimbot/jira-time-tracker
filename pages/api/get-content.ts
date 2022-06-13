// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  url: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.body;
  const baseUrl = `https://${process.env.HOST}/rest/api/2/attachment/content/${id}`;
  const authToken = process.env.ATLASSIAN_AUTH_TOKEN;
  const response = await fetch(baseUrl, {
    headers: {
      Authorization: "Basic " + authToken,
    },
  });

  const url = response.url;
  res.status(200).json({ url });
}
