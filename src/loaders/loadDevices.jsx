import { Suspense } from "react";
import { defer, Await, useLoaderData } from "react-router-dom";
import { getafm } from "/src/getafm.js";
import { Pending } from "../components/await-command/Pending2.jsx";
import { unique } from "js_utils/misc";
import { smallid } from "js_utils/uuid";
import { Center } from "../components/Center.jsx";

const loadDevices = async () => {
  const afm = await getafm(false);

  const devices = afm.listDevices({ queue: false }).parse();
  const scoreboardDevices = afm.listScoreboardDevices({ queue: false }).parse();
  const scoreboardViews = afm.listScoreboardViews({ queue: false }).parse();
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
    scoreboardViews: devices.then(() =>
      scoreboardViews.then(({ scoreboardViews }) => ({
        scoreboardViews,
        id,
      })),
    ),
  });
};

function AwaitDevices({ children }) {
  const pending = useLoaderData();
  return (
    <Suspense
      fallback={
        <Center>
          <Pending />
        </Center>
      }
    >
      <Await resolve={pending.devices}>{children}</Await>
    </Suspense>
  );
}

function AwaitViews({ children }) {
  const pending = useLoaderData();
  return (
    <Suspense
      fallback={
        <Center style={{ justifyContent: "end" }}>
          <Pending
            size="40px"
            style={{
              width: "70px",
              height: "70px",
            }}
          />
        </Center>
      }
    >
      <Await resolve={pending.scoreboardViews}>{children}</Await>
    </Suspense>
  );
}

export { loadDevices, AwaitDevices, AwaitViews };
