// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  issues: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const emailId = "ishaq.ibrahim@convertdigital.com.au";
  const baseUrl = "https://convertdigital.atlassian.net/rest/api/3/";
  const authToken =
    "aXNoYXEuaWJyYWhpbUBjb252ZXJ0ZGlnaXRhbC5jb20uYXU6RzJqcFZveHlYQ0ttemtxaTdxVmVGMEQ1";
  const url = new URL(
    `search?jql=assignee='${encodeURI(emailId)}'`,
    baseUrl
  ).toString();
  console.log("URL: ", url);
  const response = await fetch(url, {
    headers: {
      Authorization: "Basic " + authToken,
    },
  });
  console.log("RESPONSE: ", response);
  const issues = await response.json();
  res.status(200).json({ issues });
}
