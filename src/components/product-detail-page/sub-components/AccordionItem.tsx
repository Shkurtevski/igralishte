import React, { useState } from "react";
import incrementIcon from "../../../svg-icons/increment.svg";
import incrementVector from "../../../svg-icons/increment-vector.svg";


interface Props {
  title: string;
  content: string;
  icon?: string;
}

const AccordionItem: React.FC<Props> = ({ title, content, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`accordion-item ${isOpen ? "open" : ""}`}>
      <div className="accordion-header" onClick={toggleAccordion}>
        <span>
          <img src={icon} alt={title} />
        </span>
        <span className="accordion-span-text">{title}</span>
        <span>
          <img src={isOpen ? incrementIcon : incrementVector} alt={title} />
        </span>
      </div>
      {isOpen && <div className="accordion-content">{content}</div>}
    </div>
  );
};

export default AccordionItem;
