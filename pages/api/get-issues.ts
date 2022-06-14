// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  issues: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const emailId = process.env.USER_EMAIL;
  if (!emailId) throw new Error("No user email provided in .env");

  const baseUrl = `https://${process.env.HOST}/rest/api/3/`;
  const authToken = process.env.ATLASSIAN_AUTH_TOKEN;
  const url = new URL(
    `search?jql=assignee='${encodeURI(emailId)}'`,
    baseUrl
  ).toString();
  const response = await fetch(url, {
    headers: {
      Authorization: "Basic " + authToken,
    },
  });
  const issues = await response.json();
  res.status(200).json({ issues });
}
