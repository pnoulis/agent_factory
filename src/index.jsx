import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Routes } from "./Routes.jsx";

ReactDOM.createRoot(document.getElementById("app-react-root")).render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
);
