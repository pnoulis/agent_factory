import { Suspense } from "react";
import { defer, Await, useLoaderData } from "react-router-dom";
import { getafm } from "/src/getafm.js";
import { parsecmd } from "#afm/parsecmd.js";
import { Pending } from "#components/await-command/Pending2.jsx";

const loadTeams = () => {
  const teams = getafm()
    .then((afm) => parsecmd(afm.listTeams()))
    .then((response) => {
      return {
        teams: response.teams.map((team) => {
          const active = team.packages.find((pkg) => pkg.state === "playing");
          team.activePkg = active;
          return team;
        }),
      };
    });
  return defer({ teams });
};

function AwaitTeams({ children }) {
  const pending = useLoaderData();
  return (
    <Suspense fallback={<Pending />}>
      <Await resolve={pending.teams}>{children}</Await>
    </Suspense>
  );
}

export { AwaitTeams, loadTeams };
