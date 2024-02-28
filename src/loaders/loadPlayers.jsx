import { Suspense } from "react";
import { defer, Await, useLoaderData } from "react-router-dom";
import { getafm } from "/src/getafm.js";
import { parsecmd } from "#afm/parsecmd.js";
import { Pending } from "#components/await-command/Pending2.jsx";

const loadPlayers = () =>
  defer({
    players: getafm(false).then((afm) =>
      afm.listPlayers({ queue: false }).parse(),
    ),
  });

function AwaitPlayers({ children }) {
  const pending = useLoaderData();
  return (
    <Suspense fallback={<Pending />}>
      <Await resolve={pending.players}>{children}</Await>
    </Suspense>
  );
}

export { loadPlayers, AwaitPlayers };
