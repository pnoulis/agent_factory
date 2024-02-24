import { Suspense } from "react";
import { defer, Await, useLoaderData } from "react-router-dom";
import { getafm } from "/src/getafm.js";
import { parsecmd } from "#afm/parsecmd.js";
import { Pending } from "#components/await-command/Pending2.jsx";

const loadTeam = ({ params }) => {
  const team = getafm()
    .then((afm) => parsecmd(afm.listTeams({ queue: false })))
    .then((response) => {
      const t = response.teams.find((team) => team.name === params.teamname);
      return {
        team: t,
      };
    });
  return defer({ team });
};

function AwaitTeam({ children }) {
  const pending = useLoaderData();
  return (
    <Suspense fallback={<Pending />}>
      <Await resolve={pending.team}>{children}</Await>
    </Suspense>
  );
}

export { loadTeam, AwaitTeam };
