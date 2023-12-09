import React from "react";
import TextSegment from "./sub-components/TextSegment";

 const textSegments = Array.from({ length: 12 }, (_, index) => ({
   id: index,
   text1: "Нова Колекција",
   text2: "Valentine's Winter Collection",
 }));

const TextSlider: React.FC = () => {
  return (
    <div className="slider">
      <span className="wrapper">
        {textSegments.map((segment) => (
          <TextSegment
            key={segment.id}
            text1={segment.text1}
            text2={segment.text2}
          />
        ))}
      </span>
    </div>
  );
};

export default TextSlider;
