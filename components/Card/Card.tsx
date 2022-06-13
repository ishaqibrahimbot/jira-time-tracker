import { FC, useState, useEffect } from "react";
import { Issue } from "../../types";
import Image from "next/image";
import Description from "../Description";
import Comments from "../Comments";
import User from "../User";
import StopWatch from "../StopWatch";

export interface CardProps {
  issue: Issue;
}

const Card: FC<CardProps> = ({ issue }) => {
  const statusCodeComponents: { [index: string]: any } = {
    Blocked: (
      <p className="border bg-red-400 text-white rounded-md px-4 py-2">
        Blocked
      </p>
    ),
    Open: <p className="border bg-gray-300 rounded-md px-4 py-2">Open</p>,
    Resolved: (
      <p className="border bg-green-700 text-white rounded-md px-4 py-2">
        Resolved
      </p>
    ),
    "We're On It": (
      <p className="border bg-blue-500 text-white rounded-md px-4 py-2">
        We're On It
      </p>
    ),
  };

  return (
    <div className="card floating">
      <div className="flex flex-row items-center justify-end border-b pb-3">
        <h1 className="text-xl font-medium mr-auto font-mono">{issue.key}</h1>
        <div className="w-5 h-5 relative mr-4">
          <Image src={issue.fields.priority.iconUrl} layout="fill" />
        </div>
        {statusCodeComponents[issue.fields.status.name]}
      </div>
      <h1 className="py-2 pb-3">{issue?.fields?.summary}</h1>
      <User user={issue.fields.reporter} />
      <div className="flex flex-row justify-between border-t pt-4 space-x-8 items-center">
        <div>
          <div className="flex flex-row items-center justify-between space-x-4 pb-2 border-b">
            <p className="text-base text-gray-600">Total time estimate:</p>
            <p className="text-lg font-mono">
              {new Date(issue?.fields?.progress?.total * 1000)
                .toISOString()
                .substr(11, 8)}
            </p>
          </div>
          <div className="flex flex-row justify-between items-center space-x-2 mt-2">
            <p className="text-base text-gray-600">Time spent: </p>
            <p className="text-lg font-mono">
              {new Date(issue?.fields?.progress?.progress * 1000)
                .toISOString()
                .substr(11, 8)}
            </p>
          </div>
        </div>
        <StopWatch issue={issue} />
      </div>
      <div className="flex pt-6 flex-col space-y-3">
        <Description issue={issue} />
        <Comments issue={issue} />
      </div>
    </div>
  );
};

export default Card;
