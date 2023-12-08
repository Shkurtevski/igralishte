import React from "react";
import FooterLinks from "./sub-components/FooterLinks";


const Footer: React.FC = () => {
  return (
    <React.Fragment>
      <div className="footer">
        <FooterLinks/>
      </div>
    </React.Fragment>
  );
};

export default Footer;
