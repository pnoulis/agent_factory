import { Suspense } from "react";
import { defer, Await, useLoaderData } from "react-router-dom";
import { getafm } from "/src/getafm.js";
import { parsecmd } from "../afmachine/parsecmd.js";
import { Pending } from "../components/await-command/Pending2.jsx";

const loadPlayersWithWristband = () =>
  defer({
    players: getafm(false).then((afm) =>
      parsecmd(afm.listPlayersWithWristband({ queue: false })),
    ),
  });

function AwaitPlayersWithWristband({ children }) {
  const pending = useLoaderData();
  return (
    <Suspense fallback={<Pending />}>
      <Await resolve={pending.players}>{children}</Await>
    </Suspense>
  );
}

export { loadPlayersWithWristband, AwaitPlayersWithWristband };
