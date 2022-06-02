import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

interface User {
  accountId: string;
  accountType: string;
  active: boolean;
  avatarUrls: {};
  displayName: string;
  emailAddress?: string;
  self: string;
  timeZone: string;
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
  };
  id: string;
  key: string;
  self: string;
}

const Home: NextPage = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      const response = await fetch("/api/hello");
      const issues = await response.json();
      setIssues(issues?.issues?.issues);
    };
    fetchIssues();
  }, []);

  useEffect(() => {
    console.log("ISSUES: ", issues);
  }, [issues]);

  return (
    <div className="flex flex-col space-y-4">
      {issues?.map((issue) => {
        return <p>{JSON.stringify(issue)}</p>;
      })}
    </div>
  );
};

export default Home;
