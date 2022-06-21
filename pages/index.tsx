import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Card, ProjectSelector, SearchBar } from "../components";
import useContext from "../store/context";
import { Issue } from "../types";
import Masonry from "react-masonry-css";

const Home: NextPage = () => {
  const {
    issues,
    filteredIssues,
    setIssues,
    project,
    setProject,
    setFilteredIssues,
  } = useContext();

  useEffect(() => {
    const fetchIssues = async () => {
      const response = await fetch("/api/get-issues");
      const issues = await response.json();
      setIssues(issues?.issues?.issues);
      setFilteredIssues(issues?.issues?.issues);
      setProject(issues?.issues?.issues[0]?.fields?.project?.key);
    };
    fetchIssues();
  }, []);

  useEffect(() => {
    window.addEventListener("message", (event) => {
      if (event.origin !== "https://jira-time-tracker.vercel.app") return;
      console.log("RECEIVED A MESSAGE: ", event);
    });
  }, []);

  return (
    <div className="flex flex-col space-y-8 bg-slate-100 h-full w-full p-16">
      {/* Add assignee here, e.g. 'Ishaq's tickets' */}
      <h1 className="text-3xl mx-auto font-semibold">Jira Time Tracker</h1>
      <button
        onClick={() =>
          window.postMessage("reload", "https://jira-time-tracker.vercel.app")
        }
      >
        Send Message
      </button>
      <div className="floating card flex flex-row items-center justify-center space-x-10">
        <div className="w-1/2">
          <ProjectSelector />
        </div>
        <div className="w-1/2">
          <SearchBar />
        </div>
        {/* <div className="grid grid-cols-2 gap-8"> */}
      </div>
      <Masonry
        className="flex space-x-8"
        columnClassName="space-y-8"
        breakpointCols={2}
      >
        {filteredIssues?.map((issue) => {
          if (issue?.fields?.project?.key === project) {
            // console.log("ISSUE: ", issue);
            return <Card key={issue.key} issue={issue} />;
          }
        })}
      </Masonry>
      {/* </div> */}
    </div>
  );
};

export default Home;
