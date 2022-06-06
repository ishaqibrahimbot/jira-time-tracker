import React, { createContext, ReactNode, useMemo, useReducer } from "react";
import { Issue } from "../types";

type Maybe<T> = T | undefined;

interface State {
  issues: Maybe<Issue[]>;
  project: Maybe<string>;
}

const initialState: State = {
  issues: undefined,
  project: undefined,
};

type Fn = (...args: any) => void;

interface Context extends State {
  setIssues: Fn;
  setProject: Fn;
}

const Context = createContext<Context | State>(initialState);

type Actions =
  | { type: "SET_ISSUES"; issues: Issue[] }
  | { type: "SET_PROJECT"; project: string };

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case "SET_ISSUES":
      return {
        ...state,
        issues: action.issues,
      };
    case "SET_PROJECT":
      return {
        ...state,
        project: action.project,
      };
    default:
      return {
        ...state,
      };
  }
};

export const ContextProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setIssues = (issues: Issue[]) =>
    dispatch({ type: "SET_ISSUES", issues });

  const setProject = (project: string) =>
    dispatch({ type: "SET_PROJECT", project });

  const value = useMemo(
    () => ({
      ...state,
      setIssues,
      setProject,
    }),
    [state]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useContext = () => {
  const context = React.useContext(Context);
  return context as Context;
};

export default useContext;
