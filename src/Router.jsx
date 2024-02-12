import * as React from "react";
import { delay } from "js_utils/misc";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
  Outlet,
  defer,
  useLoaderData,
  Await,
} from "react-router-dom";
import { ENV } from "./config.js";
import Pages from "./pages/index.js";
import { App } from "./App.jsx";
import { links } from "./links.jsx";
import "./debug.js";
import { createClientAfmachine } from "./createClientAfmachine.js";

function Router() {
  return <RouterProvider router={router} />;
}

async function loader() {
  return defer({ afm: createClientAfmachine() });
  // return defer({ afm: delay().then(() => ({ name: "yolo" })) });
}

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: links.home.path,
        lazy: async () => import("./pages/home/PageHome.jsx"),
      },
      {
        path: links.merge.path,
        lazy: async () => import("./pages/merge/PageMerge.jsx"),
      },
    ],
  },
  {
    path: "/login",
    lazy: async () => import("./pages/cashier/PageLogin.jsx"),
  },
  {
    path: "/scratch",
    element: <Pages.Scratch />,
  },
  { basename: ENV.BASENAME },
]);

export { Router };
