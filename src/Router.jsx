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

      //////////////////////////////////////////////////
      // Players
      //////////////////////////////////////////////////
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

      //////////////////////////////////////////////////
      // Team
      //////////////////////////////////////////////////
      {
        path: links.registerTeam.path,
        lazy: async () => import("./pages/teams/PageRegister.jsx"),
      },

      //////////////////////////////////////////////////
      // Grouparty
      //////////////////////////////////////////////////
      {
        path: links.grouparty.path,
        lazy: async () => import("./pages/grouparty/PageGrouparty.jsx"),
      },

      //////////////////////////////////////////////////
      // LiveView
      //////////////////////////////////////////////////
      {
        path: links.liveView.path,
        lazy: async () => import("./pages/PageLiveView.jsx"),
      },

      //////////////////////////////////////////////////
      // Administration
      //////////////////////////////////////////////////
      {
        path: links.administration.path,
        lazy: async () => import("./pages/PageAdministration.jsx"),
        children: [
          {
            path: links.cashoutCashier.path,
            lazy: async () => import("./pages/cashiers/PageCashout.jsx"),
          },
          {
            path: links.cashiers.path,
            lazy: async () => import("./pages/cashiers/PageCashiers.jsx"),
            children: [
              {
                path: links.registerCashier.path,
                lazy: async () => import("./pages/cashiers/PageRegister.jsx"),
              },
            ],
          },
          {
            path: links.devices.path,
            lazy: async () => import("./pages/devices/PageDevices.jsx"),
          },
          {
            path: links.scoreboardDevices.path,
            lazy: async () =>
              import("./pages/devices/PageScoreboardDevices.jsx"),
          },
        ],
      },

      //////////////////////////////////////////////////
      // Scoreboard
      //////////////////////////////////////////////////
      {
        path: links.scoreboard.path,
        lazy: async () => import("./pages/scoreboard/PageScoreboard.jsx"),
        children: [
          {
            index: true,
            lazy: async () => import("./pages/scoreboard/PageLive.jsx"),
          },
          {
            path: links.scoreboardTop10.path,
            lazy: async () => import("./pages/scoreboard/PageTop10.jsx"),
          },
        ],
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
