import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Router } from "./Router.jsx";
import styled from "styled-components";
import { parsecmd } from "./afmachine/parsecmd.js";
import "./globals.js";

globalThis.React = React;
globalThis.ReactDOM = ReactDOM;
globalThis.styled = styled;
globalThis.parsecmd = parsecmd;

debug(JSON.parse(window.localStorage.getItem("trans")));

ReactDOM.createRoot(document.getElementById("app-react-root")).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
);
