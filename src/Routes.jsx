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
import { Afmachine } from "./afmachine/Afmachine.jsx";

function Routes() {
  return <RouterProvider router={router} />;
}

const router = createBrowserRouter([
  {
    element: <Afmachine />,
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
