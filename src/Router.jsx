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
        path: links.players.path,
        lazy: async () => import("./pages/players/PagePlayers.jsx"),
        children: [
          {
            index: true,
            lazy: async () => import("./pages/players/PageIndex.jsx"),
          },
          {
            path: links.registerPlayer.path,
            lazy: async () => import("./pages/players/PageRegister.jsx"),
          },
          {
            path: links.pairWristband.path,
            lazy: async () => import("./pages/players/PagePairWristband.jsx"),
          },
        ],
      },
      // {
      //   index: true,
      //   path: links.home.path,
      //   lazy: async () => import("./pages/home/PageHome.jsx"),
      // },
      // {
      //   path: links.registerTeam.path,
      //   lazy: async () => import("./pages/merge/PageMerge.jsx"),
      // },
      // {
      //   path: links.loginCashier.path,
      //   lazy: async () => import(links.loginCashier.module),
      // },
      // {
      //   path: links.admin.path,
      //   lazy: async () => import(links.admin.module),
      //   children: [
      //     {
      //       path: links.registerCashier.path,
      //       lazy: async () => import(links.registerCashier.module),
      //     },
      //   ],
      // },
    ],
  },
  {
    path: "/scratch",
    element: <PageScratch />,
  },
  { basename: ENV.BASENAME },
]);

export { Router };
