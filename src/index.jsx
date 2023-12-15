import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ENV } from './config.js';
import { Routes } from './Routes.jsx';

debug(ENV);

ReactDOM.createRoot(document.getElementById("app-react-root")).render(
  <React.StrictMode>
    <Routes/>
  </React.StrictMode>,
);
