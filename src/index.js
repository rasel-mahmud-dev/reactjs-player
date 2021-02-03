import React from "react";
import ReactDom from "react-dom";
import "../public/fontawesome/css/all.css";
import App from './App'




ReactDom.render(<App />, document.querySelector("#root"));
if (module.hot) {
  module.hot.accept();
}



