import { FC, useState, useEffect } from "react";
import useContext from "../../store/context";

export interface ProjectSelectorProps {}

const ProjectSelector: FC<ProjectSelectorProps> = () => {
  const { project, setProject, issues } = useContext();

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
    <div className="flex flex-row space-x-6 items-center">
      <h1 className="mt-1">Select Project: </h1>
      <select
        className="flex-1 font-mono border p-2 rounded-md"
        name="Projects"
        value={project}
        onChange={(e) => setProject(e.target.value)}
        id="projects"
      >
        {projects.map((project) => (
          <option value={project?.key}>{project?.name}</option>
        ))}
      </select>
    </div>
  );
};

export default ProjectSelector;
