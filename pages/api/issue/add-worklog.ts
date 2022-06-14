// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { format, parseISO } from "date-fns";

type Data = {
  worklog: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { issueKey, timeStarted, timeSpent } = req.body;
  const baseUrl = new URL(
    `https://${process.env.HOST}/rest/api/3/issue/${issueKey}/worklog`
  );

  const body = {
    timeSpentSeconds: timeSpent,
    started: format(parseISO(timeStarted), "yyyy-MM-dd'T'HH:mm:ss.SSSXX"),
  };

  const authToken = process.env.ATLASSIAN_AUTH_TOKEN;
  const response = await fetch(baseUrl.href, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + authToken,
    },
    body: JSON.stringify(body),
  });
  const worklog = await response.json();
  res.status(200).json({ worklog });
}
