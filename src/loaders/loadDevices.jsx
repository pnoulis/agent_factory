import { Suspense } from "react";
import { defer, Await, useLoaderData } from "react-router-dom";
import { getafm } from "/src/getafm.js";
import { parsecmd } from "#afm/parsecmd.js";
import { Pending } from "#components/await-command/Pending.jsx";

const loadDevices = () =>
  defer({ devices: getafm().then((afm) => parsecmd(afm.listDevices())) });

function AwaitDevices({ children }) {
  const pending = useLoaderData();
  return (
    <Suspense fallback={<Pending />}>
      <Await resolve={pending.devices}>{children}</Await>
    </Suspense>
  );
}

export { loadDevices, AwaitDevices };
