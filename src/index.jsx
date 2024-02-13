import "./debug.js";
import "./errors.js";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Router } from "./Router.jsx";

ReactDOM.createRoot(document.getElementById("app-react-root")).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
);
