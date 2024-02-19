import { Suspense } from "react";
import { defer, Await, useLoaderData } from "react-router-dom";
import { getafm } from "/src/getafm.js";
import { parsecmd } from "#afm/parsecmd.js";
import { Pending } from "#components/await-command/Pending.jsx";
import { unique } from "js_utils/misc";
import { smallid } from "js_utils/uuid";

const loadDevices = () => {
  const devices = getafm().then((afm) => parsecmd(afm.listDevices()));
  const scoreboardDevices = getafm().then((afm) =>
    parsecmd(afm.listScoreboardDevices()),
  );
  const scoreboardViews = getafm().then((afm) =>
    parsecmd(afm.listScoreboardViews()),
  );

  const id = smallid();

  return defer({
    devices: Promise.all([devices, scoreboardDevices]).then(
      ([{ devices }, { scoreboardDevices }]) => ({
        id,
        devices: unique(
          [...scoreboardDevices, ...devices],
          (a, b) => a?.id === b.id,
        ),
      }),
    ),
    scoreboardViews: scoreboardViews.then(({ scoreboardViews }) => ({
      scoreboardViews,
      id,
    })),
  });
};

function AwaitDevices({ children }) {
  const pending = useLoaderData();
  return (
    <Suspense fallback={<Pending />}>
      <Await resolve={pending.devices}>{children}</Await>
    </Suspense>
  );
}

function AwaitViews({ children }) {
  const pending = useLoaderData();
  return (
    <Suspense
      fallback={
        <Pending
          size="40px"
          style={{
            width: "75px",
            height: "75px",
          }}
        />
      }
    >
      <Await resolve={pending.scoreboardViews}>{children}</Await>
    </Suspense>
  );
}

export { loadDevices, AwaitDevices, AwaitViews };
