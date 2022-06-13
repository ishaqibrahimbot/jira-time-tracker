import { FC, useState, useEffect } from "react";
import stringSimilarity from "string-similarity";
import useContext from "../../store/context";

export interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { issues, filteredIssues, setFilteredIssues, setIssues, project } =
    useContext();

  useEffect(() => {
    handleChange(searchQuery);
  }, [issues]);

  const handleChange = (val: string) => {
    setSearchQuery(val);
    if (val === "") {
      setFilteredIssues(issues);
    } else {
      if (issues) {
        const streamlinedIssues = issues
          .filter((issue) => issue.fields.project.key === project)
          .map(
            (issue) =>
              `${issue.key} ${issue.fields.summary} ${issue.fields.creator.displayName}`
          );

        const bestMatch = stringSimilarity.findBestMatch(
          val,
          streamlinedIssues
        );

        console.log("BEST MATCH: ", bestMatch);

        const rankedArray = bestMatch.ratings
          //   .filter((obj) => obj.rating >= 0.03)
          .sort((a, b) => (a.rating < b.rating ? 1 : -1));

        const rankedArrayOfKeys = rankedArray.map(
          (obj) => `${obj.target.split(" ")[0]}`
        );

        const filteredArray = rankedArrayOfKeys.map((key) => {
          const issue = issues.find((issue) => issue.key === key);
          return issue;
        });

        setFilteredIssues(filteredArray);
        console.log("RANKED ARRAY: ", filteredArray);
      }
    }
  };

  return (
    <div className="flex flex-row space-x-6 items-center">
      <h1 className="mt-1">Search: </h1>
      <input
        className="flex-1 font-mono border p-2 rounded-md"
        value={searchQuery}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
