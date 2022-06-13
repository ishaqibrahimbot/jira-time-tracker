import { FC, useState, useEffect } from "react";
import { Comment, Issue } from "../../types";
import { motion, AnimatePresence } from "framer-motion";
import parse from "html-react-parser";
import Spinner from "../Spinner";
import User from "../User";

export interface CommentsProps {
  issue: Issue;
}

const Comments: FC<CommentsProps> = ({ issue }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  return (
    <div>
      <button
        onClick={async () => {
          setLoading(true);
          if (comments.length === 0 && !show) {
            const response = await fetch("/api/issue/get-comments", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ issueKey: issue.key }),
            });

            const fetchedComments = await response.json();

            setComments(fetchedComments?.comments?.comments);
          }
          setLoading(false);
          setShow((prevValue) => !prevValue);
        }}
        className="button"
      >
        {show ? "Hide Comments" : "Show Comments"}
      </button>
      <AnimatePresence>
        {loading && (
          <div className="w-full mt-3 flex justify-center">
            <Spinner />
          </div>
        )}
        {show ? (
          comments?.length > 0 ? (
            comments?.map((comment) => {
              return (
                <div className="py-4 px-10 border overflow-auto relative rounded-lg mt-6 flex flex-col space-y-4">
                  <div className="border-b pb-2">
                    <User user={comment.author} />
                    <p className="text-sm text-gray-700">
                      {new Date(comment.created).toLocaleString()}
                    </p>
                  </div>
                  {parse(comment.renderedBody)}
                </div>
              );
            })
          ) : (
            <p>No comments</p>
          )
        ) : (
          <></>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Comments;
