import * as React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ENV } from "./config.js";
import routes from "./routes.jsx";

const Router = () => (
  <RouterProvider
    router={createBrowserRouter(routes, { basename: ENV.BASENAME })}
  />
);

export { Router };
