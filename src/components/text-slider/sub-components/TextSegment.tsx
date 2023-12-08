import React from "react";
import textVector from "../../../svg-icons/text-vector.svg";

interface Props {
  text1: string;
  text2: string;
}

const TextSegment: React.FC<Props> = ({ text1, text2 }) => {
  return (
    <React.Fragment>
      <span>{text1}</span>
      <span>
        <img src={textVector} alt="star-icon" />
      </span>
      <span>{text2}</span>
      <span>
        <img src={textVector} alt="star-icon" />
      </span>
    </React.Fragment>
  );
};

export default TextSegment;
