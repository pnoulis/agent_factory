import * as React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { ENV } from "./config.js";
import * as links from "./links.jsx";
import { PageScratch } from "./pages/scratch/PageScratch.jsx";
import { loadAfmachine } from "./loaders/loadAfmachine.jsx";
import { loadCashiers } from "./loaders/loadCashiers.jsx";
import { loadPlayers } from "./loaders/loadPlayers.jsx";
import { loadDevices } from "./loaders/loadDevices.jsx";
import { PageLanding } from "./pages/PageLanding.jsx";

function Router() {
  return <RouterProvider router={router} />;
}

const router = createBrowserRouter(
  [
    {
      loader: loadAfmachine,
      element: <PageLanding />,
      children: [
        {
          path: "/",
          lazy: async () => import("./App.jsx"),
          children: [
            {
              index: true,
              element: <Navigate to={links.registerPlayer.path} />,
            },

            //////////////////////////////////////////////////
            // Team
            //////////////////////////////////////////////////
            {
              path: links.registerTeam.path,
              lazy: async () => import("./pages/teams/PageRegister.jsx"),
            },

            //////////////////////////////////////////////////
            // Players
            //////////////////////////////////////////////////
            {
              path: links.players.path,
              lazy: async () => import("./pages/players/PagePlayers.jsx"),
              children: [
                {
                  loader: loadPlayers,
                  index: true,
                  lazy: async () => import("./pages/players/PageIndex.jsx"),
                },
                {
                  path: links.registerPlayer.path,
                  lazy: async () => import("./pages/players/PageRegister.jsx"),
                },
                {
                  path: links.pairWristband.path,
                  lazy: async () =>
                    import("./pages/players/PagePairWristband.jsx"),
                },
              ],
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
                      index: true,
                      loader: loadCashiers,
                      lazy: async () =>
                        import("./pages/cashiers/PageIndex.jsx"),
                    },
                    {
                      path: links.registerCashier.path,
                      lazy: async () =>
                        import("./pages/cashiers/PageRegister.jsx"),
                    },
                  ],
                },
                {
                  loader: loadDevices,
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
          path: links.loginCashier.path,
          lazy: async () => import("./pages/cashiers/PageLogin.jsx"),
        },
      ],
    },
    {
      loader: loadAfmachine,
      path: "/scratch",
      element: <PageScratch />,
    },
  ],
  { basename: ENV.BASENAME },
);

export { Router };
