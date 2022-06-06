import { FC, useState, useEffect } from "react";
import { Issue } from "../../types";
import Image from "next/image";
import Description from "../Description";
import Comments from "../Comments";

export interface CardProps {
  issue: Issue;
}

const Card: FC<CardProps> = ({ issue }) => {
  return (
    <div className="card floating">
      <h1>{issue?.fields?.summary}</h1>
      <div className="flex flex-row space-x-2 items-center">
        <h3>{issue?.fields?.reporter?.displayName}</h3>
        <div>
          <Image
            src={issue?.fields?.reporter?.avatarUrls?.["48x48"]}
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
      </div>
      <p>
        {"Total time estimate: " +
          issue?.fields?.progress?.total / 60 / 60 +
          "hrs"}
      </p>
      <p>
        {"Time spent: " + issue?.fields?.progress?.progress / 60 / 60 + "hrs"}
      </p>
      <div className="flex pt-6 flex-col space-y-3">
        <Description issue={issue} />
        <Comments issue={issue} />
      </div>
    </div>
  );
};

export default Card;
