import { Suspense } from "react";
import { defer, Await, useLoaderData } from "react-router-dom";
import { getafm } from "/src/getafm.js";
import { parsecmd } from "../afmachine/parsecmd.js";
import { Pending } from "../components/await-command/Pending2.jsx";
import { smallid } from "js_utils/uuid";

const loadTeam = ({ params }) => {
  return defer({
    team: getafm(false).then((afm) =>
      parsecmd(afm.findTeam({ name: params.teamname }, { queue: false })).then(
        ({ team }) => ({
          team,
          id: smallid(),
        }),
      ),
    ),
  });
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
