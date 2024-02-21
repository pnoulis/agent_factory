import { Suspense } from "react";
import { defer, Await, useLoaderData } from "react-router-dom";
import { getafm } from "/src/getafm.js";
import { parsecmd } from "#afm/parsecmd.js";
import { Pending } from "#components/await-command/Pending.jsx";

const loadPlayers = () =>
  defer({ players: getafm().then((afm) => parsecmd(afm.listPlayers())) });

function AwaitPlayers({ children }) {
  const pending = useLoaderData();
  return (
    <Suspense fallback={<Pending />}>
      <Await resolve={pending.players}>{children}</Await>
    </Suspense>
  );
}

export { loadPlayers, AwaitPlayers };
