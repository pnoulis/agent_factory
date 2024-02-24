import { Suspense } from "react";
import { defer, Await, useLoaderData } from "react-router-dom";
import { delay } from "js_utils/misc";
import { getafm } from "/src/getafm.js";
import { Pending } from "#components/await-command/Pending.jsx";

function loadAfmachine() {
  return globalThis.afm?.booted
    ? afm
    : defer({
        afm: delay(100).then(() =>
          getafm(false).then((afm) => {
            return afm.boot({ queue: false }).then(() => afm);
          }),
        ),
      });
}

function AwaitAfmachine({ children }) {
  const pending = useLoaderData();
  return (
    <Suspense fallback={<Pending />}>
      <Await resolve={pending.afm}>{children}</Await>
    </Suspense>
  );
}

export { loadAfmachine, AwaitAfmachine };
