import React from "react";
import breadcrumbsVector from "../../../svg-icons/breadcrumbs-vector.svg";

const BreadCrumbs: React.FC<{ crumbs: string[] }> = ({ crumbs }) => {
  return (
    <div className="breadcrumbs mb-1">
      {crumbs.map((crumb, index) => (
        <span key={index}>
          {index > 0 && (
            <React.Fragment>
              <img
                src={breadcrumbsVector}
                alt="breadcrumbsvector"
              />{" "}
            </React.Fragment>
          )}
          {crumb}
        </span>
      ))}
    </div>
  );
};

export default BreadCrumbs;
