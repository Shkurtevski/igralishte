import React from "react";

const BreadCrumbs: React.FC<{ crumbs: string[] }> = ({ crumbs }) => {
  return (
    <div className="breadcrumbs  mb-1">
      {crumbs.map((crumb, index) => (
        <span key={index}>
          {index > 0 && " / "}
          {crumb}
        </span>
      ))}
    </div>
  );
};

export default BreadCrumbs;
