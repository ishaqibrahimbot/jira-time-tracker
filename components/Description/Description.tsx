import { FC, useState, useEffect } from "react";
import useContext from "../../store/context";
import { Issue } from "../../types";
import { AnimatePresence, motion } from "framer-motion";
import Spinner from "../Spinner";
import parse, {
  attributesToProps,
  domToReact,
  HTMLReactParserOptions,
  Element,
} from "html-react-parser";
import Image from "next/image";

export interface DescriptionProps {
  issue: Issue;
}

const Description: FC<DescriptionProps> = ({ issue }) => {
  const { issues, setIssues } = useContext();

  const options: HTMLReactParserOptions = {
    replace: async (domNode) => {
      if (
        domNode instanceof Element &&
        domNode.attribs &&
        domNode.name === "a"
      ) {
        const props = attributesToProps(domNode.attribs);
        return await (
          <a {...props} target="_blank">
            {domToReact(domNode.children, options)}
          </a>
        );
      } else if (domNode instanceof Element && domNode.name === "img") {
        const props = attributesToProps(domNode.attribs);
        const src = props.src;
        const imageId = src.split("/")[3];

        console.log("PROPS: ", props);

        // return (
        //   <Image
        //     src={props.src}
        //     height={props.height + "px"}
        //     width={props.width + "px"}
        //   />
        // );

        const response = await fetch("/api/get-content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: imageId }),
        });

        const { url } = await response.json();

        return (
          <Image
            src={url}
            height={parseInt(props.height)}
            width={parseInt(props.width)}
          />
        );
      }
    },
  };

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState<any>();

  return (
    <div>
      <button
        onClick={async () => {
          const response = await fetch("/api/issue/get-description", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ issueKey: issue.key }),
          });
          const fetchedIssue = await response.json();

          const description = await parse(
            fetchedIssue?.issue?.renderedFields?.description,
            options
          );

          console.log("DESCRIPTION: ", description);
          setDescription(description);
          setShow((prevValue) => !prevValue);
        }}
        className="button"
      >
        {show ? "Hide Description" : "Show Description"}
      </button>
      <AnimatePresence>
        {loading && <Spinner />}
        {show && (
          <div className="py-4 px-10 border relative rounded-lg mt-6 flex flex-col space-y-4">
            {description && description}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Description;
