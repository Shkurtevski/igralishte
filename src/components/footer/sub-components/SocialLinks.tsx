import React from "react";
import instagram from "../../../svg-icons/instagram.svg";
import tiktok from "../../../svg-icons/tiktok.svg"

const SocialLinks: React.FC = () => {
  return (
    <React.Fragment>
      <div className="social-links">
        <p>Следи не на:</p>
        <a
          href="https://www.instagram.com/igraliste.sk/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={instagram} alt="instagram-icon" />
          <p>igralishte.sk</p>
        </a>
        <a
          href="https://www.tiktok.com/@igraliste.sk"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={tiktok} alt="tiktok-icon" />
          <p>igralishte.sk</p>
        </a>
      </div>
    </React.Fragment>
  );
};

export default SocialLinks;
