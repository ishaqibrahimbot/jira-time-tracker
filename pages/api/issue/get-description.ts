// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  issue: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { issueKey } = req.body;
  const baseUrl = `https://${process.env.HOST}/rest/api/2/issue/${issueKey}?expand=renderedFields`;
  const authToken = process.env.ATLASSIAN_AUTH_TOKEN;
  const response = await fetch(baseUrl, {
    headers: {
      Authorization: "Basic " + authToken,
    },
  });
  const issue = await response.json();
  res.status(200).json({ issue });
}
