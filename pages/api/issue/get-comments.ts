// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  comments: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { issueKey } = req.body;
  const baseUrl = new URL(
    `https://${process.env.HOST}/rest/api/2/issue/${issueKey}/comment`
  );
  baseUrl.searchParams.append("expand", "renderedBody");
  baseUrl.searchParams.append("orderBy", "created");

  const authToken = process.env.ATLASSIAN_AUTH_TOKEN;
  const response = await fetch(baseUrl.href, {
    headers: {
      Authorization: "Basic " + authToken,
    },
  });
  const comments = await response.json();
  res.status(200).json({ comments });
}
