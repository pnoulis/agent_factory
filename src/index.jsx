import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ENV } from "./config";

console.log(ENV);
ReactDOM.createRoot(document.getElementById("app-react-root")).render(
  <React.StrictMode>
    <div>hello world!</div>
  </React.StrictMode>,
);
