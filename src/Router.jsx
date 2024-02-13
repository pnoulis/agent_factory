import * as React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ENV } from "./config.js";
import { App } from "./App.jsx";
import * as links from "./links.jsx";
import { PageScratch } from "./pages/scratch/PageScratch.jsx";

function Router() {
  return <RouterProvider router={router} />;
}

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        index: true,
        path: links.home.path,
        lazy: async () => import("./pages/home/PageHome.jsx"),
      },
      {
        path: "/merge",
        lazy: async () => import("./pages/merge/PageMerge.jsx"),
      },
      {
        path: "/login",
        lazy: async () => import("./pages/cashier/PageLogin.jsx"),
      },
    ],
  },
  {
    path: "/scratch",
    element: <PageScratch />,
  },
  { basename: ENV.BASENAME },
]);

export { Router };
