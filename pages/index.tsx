import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

interface User {
  accountId: string;
  accountType: string;
  active: boolean;
  avatarUrls: Avatar;
  displayName: string;
  emailAddress?: string;
  self: string;
  timeZone: string;
}

interface Avatar {
  "16x16": string;
  "24x24": string;
  "32x32": string;
  "48x48": string;
}

interface Issue {
  expand: string;
  fields: {
    aggregateprogress: {
      progress: number;
      total: number;
      percent: number;
    };
    aggregatetimeestimate: number;
    aggregatetimeoriginalestimate: number;
    aggregatetimespent: number | null;
    assignee: User;
    creator: User;
    description: {
      content: {
        type: "paragraph" | "codeBlock" | "rule" | "mediaSingle";
        attrs?: {
          language?: "json";
          layout?: "align_start";
        };
        content: {
          type: "text" | "inlineCard" | "media";
          text: string;
          attrs?: {
            url?: string;
            collection?: string;
            height?: number;
            width?: number;
            id?: number;
            type?: "file";
          };
          marks?: {
            type: "strong" | "code";
          }[];
        }[];
      }[];
      type: "doc";
      version: number;
    };
    parent: {
      id: string;
      key: string;
      self: string;
      fields: {
        summary: string;
      };
    };
    priority: {
      iconUrl: string;
      id: string;
      name: string;
      self: string;
    };
    progress: {
      percent: number;
      progress: number;
      total: number;
    };
    project: {
      id: string;
      key: string;
      name: string;
      projectTypeKey: string;
      self: string;
      simplified: boolean;
      avatarUrls: Avatar;
    };
    reporter: User;
    resolution?: null;
    summary: string;
    timeestimate: number;
    timeoriginalestimate: number;
    timespent: number | null;
  };
  id: string;
  key: string;
  self: string;
}

const Home: NextPage = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [project, setProject] = useState<string>();

  useEffect(() => {
    const fetchIssues = async () => {
      const response = await fetch("/api/get-issues");
      const issues = await response.json();
      setIssues(issues?.issues?.issues);
      setProject(issues?.issues?.issues[0]?.fields?.project?.key);
    };
    fetchIssues();
  }, []);

  useEffect(() => {
    console.log("ISSUES: ", issues);
  }, [issues]);

  useEffect(() => {
    console.log("PROJECT: ", project);
  }, [project]);

  const projects: { key: string; name: string }[] = [];

  issues &&
    issues.forEach((issue) => {
      if (
        !projects
          .map((project) => project.key)
          .includes(issue?.fields?.project?.key)
      ) {
        projects.push({
          key: issue?.fields?.project?.key,
          name: issue?.fields?.project?.name,
        });
      }
    });

  return (
    <div className="flex flex-col space-y-4 bg-slate-200 h-full w-full p-10">
      <select
        className="w-80 border p-2 rounded-md"
        name="Projects"
        onChange={(e) => setProject(e.target.value)}
        id="projects"
      >
        {projects.map((project) => (
          <option value={project?.key}>{project?.name}</option>
        ))}
      </select>
      <div className="flex flex-row flex-wrap gap-8">
        {issues?.map((issue) => {
          if (issue?.fields?.project?.key === project) {
            return (
              <div className="card">
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
                <p>{"Time spent: " + issue?.fields?.progress?.progress}</p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Home;
