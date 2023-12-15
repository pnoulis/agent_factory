import * as React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
  Outlet,
} from "react-router-dom";
import { ENV } from "./config.js";
import Pages from "./pages/index.js";
import { Scratch } from "./scratch/Scratch.jsx";

function Routes() {
  return <RouterProvider router={router} />;
}

const router = createBrowserRouter([
  {
    element: (
      <div>
        <h1>Layout</h1>
        <Outlet />
      </div>
    ),
    children: [
      {
        path: "/",
        element: <Pages.Home />,
      },
    ],
  },
  {
    path: "/scratch",
    element: <Scratch />,
  },
  { basename: ENV.BASENAME },
]);

export { Routes };
