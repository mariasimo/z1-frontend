import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import Fonts from "./fonts";
import GlobalStyles from "./styles/global-styles";
import Reset from "./styles/reset";

ReactDOM.render(
  <React.StrictMode>
    <Fonts />
    <Reset />
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
