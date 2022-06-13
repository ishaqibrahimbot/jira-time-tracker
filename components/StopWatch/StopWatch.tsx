import { FC, useState, useEffect, useRef } from "react";
import useContext from "../../store/context";
import { Issue } from "../../types";

export interface StopWatchProps {
  issue: Issue;
}

const StopWatch: FC<StopWatchProps> = ({ issue }) => {
  const [seconds, setSeconds] = useState(0);
  const [start, setStart] = useState(false);
  const [timeSaved, setTimeSaved] = useState(false);
  const [timeStarted, setTimeStarted] = useState<string>();

  const { setIssues } = useContext();

  const intervalId = useRef<any>();

  useEffect(() => {
    if (start) {
      intervalId.current = setInterval(() => {
        setSeconds((prevValue) => prevValue + 1);
      }, 1000);
      setTimeSaved(false);
      setTimeStarted(new Date().toISOString());
    } else if (!start && intervalId) {
      clearInterval(intervalId.current);
    }

    return () => clearInterval(intervalId.current);
  }, [start]);

  const handleAddWorklog = async () => {
    console.log("ISSUE KEY: ", issue.key);
    const response = await fetch("/api/issue/add-worklog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        issueKey: issue.key,
        timeSpent: seconds,
        timeStarted,
      }),
    });

    const worklogResponse = await response.json();

    console.log("WORKLOG: ", worklogResponse);

    const updateResponse = await fetch("/api/get-issues");
    const issues = await updateResponse.json();
    setIssues(issues?.issues?.issues);

    setTimeSaved(true);
    setTimeStarted(undefined);
    setSeconds(0);
  };

  return (
    <div
      className={`${
        start
          ? "bg-green-700 text-white"
          : timeSaved
          ? "bg-gray-200 text-black"
          : seconds === 0
          ? "bg-gray-200 text-black"
          : "bg-yellow-400 text-black"
      } border border-slate-600 rounded-lg w-fit p-4 h-full flex flex-col space-y-2 items-center`}
    >
      <p className="font-mono text-xl">
        {new Date(seconds * 1000).toISOString().substr(11, 8)}
      </p>

      <div className="flex flex-row space-x-2">
        <button
          className="w-16 text-sm h-8 py-1 border border-slate-600 bg-blue-200 text-black hover:bg-blue-100 rounded-md"
          onClick={() => setStart(true)}
        >
          Start
        </button>
        <button
          className="w-16 text-sm h-8 py-1 border border-slate-600 bg-red-300 text-black hover:bg-red-200 rounded-md"
          onClick={() => setStart(false)}
        >
          Stop
        </button>
        <button
          className="w-16 text-sm h-8 py-1 border border-slate-600 bg-gray-300 text-black hover:bg-white rounded-md"
          onClick={() => {
            if (start) setStart(false);
            setSeconds(0);
          }}
        >
          Reset
        </button>
      </div>
      <button
        onClick={() => handleAddWorklog()}
        disabled={seconds < 60 || timeSaved || start}
        className="button w-full disabled:bg-gray-300 disabled:text-gray-500 flex justify-center"
      >
        Update
      </button>
    </div>
  );
};

export default StopWatch;
