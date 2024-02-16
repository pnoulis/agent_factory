import { Suspense } from "react";
import { defer, Await, useLoaderData } from "react-router-dom";

const loadCashiers = () =>
  defer({ cashiers: globalThis.afm.listCashiers({ queue: false }) });

function AwaitCashiers({ className, style, children }) {
  const pending = useLoaderData();
  return (
    <Suspense>
      <Await resolve={pending.cashiers}>{children}</Await>
    </Suspense>
  );
}

export { loadCashiers, AwaitCashiers };
