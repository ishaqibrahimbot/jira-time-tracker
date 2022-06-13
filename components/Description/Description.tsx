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
    replace: (domNode) => {
      if (
        domNode instanceof Element &&
        domNode.attribs &&
        domNode.name === "a"
      ) {
        const props = attributesToProps(domNode.attribs);
        return (
          <a {...props} target="_blank">
            {domToReact(domNode.children, options)}
          </a>
        );
      } else if (domNode instanceof Element && domNode.name === "img") {
        const props = attributesToProps(domNode.attribs);
        const src = props.src;
        const imageId = src.split("/")[3];

        setimageIdArray((prevArray) => [...prevArray, imageId]);

        domNode.attribs.id = imageId;

        return domNode;
      } else if (
        domNode instanceof Element &&
        domNode.name === "div" &&
        domNode.attribs.class === "code panel"
      ) {
        domNode.attribs.style += " overflow: auto;";
        return domNode;
      }
    },
  };

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState<any>();
  const [imageIdArray, setimageIdArray] = useState<string[]>([]);

  useEffect(() => {
    const replaceImageSrcs = async () => {
      if (description && imageIdArray && show) {
        await Promise.all(
          imageIdArray.map(async (id) => {
            const response = await fetch("/api/get-content", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id }),
            });
            const { url } = await response.json();

            const imageComp = document.getElementById(id) as HTMLImageElement;
            if (imageComp) {
              imageComp.src = url;
            }
          })
        );
      }
    };
    replaceImageSrcs();
  }, [description, show]);

  return (
    <div>
      <button
        onClick={async () => {
          setLoading(true);
          if (!description) {
            const response = await fetch("/api/issue/get-description", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ issueKey: issue.key }),
            });
            const fetchedIssue = await response.json();

            const description = parse(
              fetchedIssue?.issue?.renderedFields?.description,
              options
            );

            setDescription(description);
          }
          setShow((prevValue) => !prevValue);
          setLoading(false);
        }}
        className="button"
      >
        {show ? "Hide Description" : "Show Description"}
      </button>
      <AnimatePresence>
        {loading && (
          <div className="w-full mt-3 flex justify-center">
            <Spinner />
          </div>
        )}
        {show && (
          <div className="py-4 px-10 border overflow-auto relative rounded-lg mt-6 flex flex-col space-y-4">
            {description && description}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Description;
