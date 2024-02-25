import { Suspense } from "react";
import { defer, Await, useLoaderData } from "react-router-dom";
import { getafm } from "/src/getafm.js";
import { parsecmd } from "#afm/parsecmd.js";
import { Pending } from "#components/await-command/Pending2.jsx";

const loadScoreboardLive = () =>
  defer({
    scoreboard: getafm().then((afm) =>
      parsecmd(afm.listScoreboard({ queue: false })).then(({ live }) => ({
        scoreboard: live,
      })),
    ),
  });

function AwaitScoreboardLive({ children }) {
  const pending = useLoaderData();
  return (
    <Suspense fallback={<Pending />}>
      <Await resolve={pending.scoreboard}>{children}</Await>
    </Suspense>
  );
}

export { loadScoreboardLive, AwaitScoreboardLive };
