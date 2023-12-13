import React from "react";

interface Props {
  question: string;
  description: string;
}

const Question: React.FC<Props> = ({ question, description }) => {
  return (
    <div className="question-group">
      <p className="question">{question}</p>
      <p>{description}</p>
    </div>
  );
};

export default Question;
