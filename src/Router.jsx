import * as React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
  Outlet,
} from "react-router-dom";
import { ENV } from "./config.js";
import Pages from "./pages/index.js";
import { App } from "./App.jsx";
import { links } from "./links.jsx";

function Router() {
  return <RouterProvider router={router} />;
}

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: links.home.path,
        element: <Pages.Home />,
      },
      {
        path: links.merge.path,
        element: <Pages.Merge />,
      },
    ],
  },
  {
    path: "/scratch",
    element: <Pages.Scratch />,
  },
  { basename: ENV.BASENAME },
]);

export { Router };
