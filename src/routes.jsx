import * as links from "./links.jsx";
import { Navigate } from "react-router-dom";
import { loadAfmachine } from "./loaders/loadAfmachine.jsx";
import { loadCashiers } from "./loaders/loadCashiers.jsx";
import { loadPlayers } from "./loaders/loadPlayers.jsx";
import { loadPlayersWithWristband } from "./loaders/loadPlayersWithWristband.jsx";
import { loadDevices } from "./loaders/loadDevices.jsx";
import { loadTeams } from "./loaders/loadTeams.jsx";
import { loadTeam } from "./loaders/loadTeam.jsx";
import { loadPackages } from "./loaders/loadPackages.jsx";
import { loadScoreboardLive } from "./loaders/loadScoreboardLive.jsx";
import { loadScoreboardTop10 } from "./loaders/loadScoreboardTop10.jsx";
import { PageLanding } from "./pages/PageLanding.jsx";
import { PageScratch } from "./pages/scratch/PageScratch.jsx";

export default [
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
            loader: loadPlayersWithWristband,
            lazy: async () => import("./pages/team/PageRegister.jsx"),
          },

          {
            path: links.team().path,
            loader: loadTeam,
            lazy: async () => import("./pages/team/PageTeam.jsx"),
            children: [
              {
                loader: loadPackages,
                path: links.teamPackage.path,
                lazy: async () =>
                  import("./pages/team/PageRegisterPackage.jsx"),
              },
            ],
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
            lazy: async () => import("./pages/grouparty/PageGrouParty.jsx"),
          },

          //////////////////////////////////////////////////
          // LiveView
          //////////////////////////////////////////////////
          {
            path: links.liveView.path,
            loader: loadTeams,
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
                index: true,
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
                    lazy: async () => import("./pages/cashiers/PageIndex.jsx"),
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
                loader: loadScoreboardLive,
                lazy: async () => import("./pages/scoreboard/PageLive.jsx"),
              },
              {
                path: links.scoreboardTop10.path,
                loader: loadScoreboardTop10,
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
      {
        path: "/scratch",
        element: <PageScratch />,
      },
    ],
  },
];
