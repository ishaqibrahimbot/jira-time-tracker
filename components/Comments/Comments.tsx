import { FC, useState, useEffect } from "react";
import { Issue } from "../../types";
import { motion, AnimatePresence } from "framer-motion";
import Spinner from "../Spinner";

export interface CommentsProps {
  issue: Issue;
}

const Comments: FC<CommentsProps> = ({ issue }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setShow((prevValue) => !prevValue);
        }}
        className="button"
      >
        {show ? "Hide Comments" : "Show Comments"}
      </button>
      <AnimatePresence>
        {loading && <Spinner />}
        {show && <motion.div layout>Comments show here</motion.div>}
      </AnimatePresence>
    </div>
  );
};

export default Comments;
