import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Container from "../../containers/Container";

interface LayoutType {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutType> = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <Container>
        <main>{children}</main>
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
