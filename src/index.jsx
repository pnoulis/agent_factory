import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Router } from "./Router.jsx";
import styled from "styled-components";
import { parsecmd } from "#afm/parsecmd.js";

import "./debug.js";
import "./errors.js";
globalThis.React = React;
globalThis.ReactDOM = ReactDOM;
globalThis.styled = styled;
globalThis.parsecmd = parsecmd;

ReactDOM.createRoot(document.getElementById("app-react-root")).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
);
