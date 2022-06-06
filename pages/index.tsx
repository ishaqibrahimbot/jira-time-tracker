import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Card, ProjectSelector } from "../components";
import useContext from "../store/context";
import { Issue } from "../types";

const Home: NextPage = () => {
  const { issues, setIssues, project, setProject } = useContext();

  useEffect(() => {
    const fetchIssues = async () => {
      const response = await fetch("/api/get-issues");
      const issues = await response.json();
      setIssues(issues?.issues?.issues);
      setProject(issues?.issues?.issues[0]?.fields?.project?.key);
    };
    fetchIssues();
  }, []);

  return (
    <div className="flex flex-col space-y-4 bg-slate-100 h-full w-full p-16">
      <ProjectSelector />
      <div className="flex flex-col gap-y-8">
        {issues?.map((issue) => {
          if (issue?.fields?.project?.key === project) {
            console.log("ISSUE: ", issue);
            return <Card issue={issue} />;
          }
        })}
      </div>
    </div>
  );
};

export default Home;
