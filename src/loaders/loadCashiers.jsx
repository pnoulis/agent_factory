import { Suspense } from "react";
import { defer, Await, useLoaderData } from "react-router-dom";
import { getafm } from "/src/getafm.js";
import { parsecmd } from "#afm/parsecmd.js";
import { Pending } from "#components/await-command/Pending.jsx";

const loadCashiers = () =>
  defer({
    cashiers: getafm().then((afm) => parsecmd(afm.listCashiers())),
  });

function AwaitCashiers({ children }) {
  const pending = useLoaderData();
  return (
    <Suspense fallback={<Pending />}>
      <Await resolve={pending.cashiers}>{children}</Await>
    </Suspense>
  );
}

export { loadCashiers, AwaitCashiers };
