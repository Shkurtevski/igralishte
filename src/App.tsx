import React from "react";
import Homepage from "./components/Homepage";
import ProductContextConstructor from "./contexts/useProductDataContext";
import "./css/main.scss";

function App() {
  return (
    <React.Fragment>
      <ProductContextConstructor>
      <Homepage />
      </ProductContextConstructor>
    </React.Fragment>
  );
}

export default App;
