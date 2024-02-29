import { Suspense } from "react";
import { defer, Await, useLoaderData } from "react-router-dom";
import { getafm } from "/src/getafm.js";
import { parsecmd } from "#afm/parsecmd.js";
import { Pending } from "../components/await-command/Pending2.jsx";
import { smallid } from "js_utils/uuid";

const loadCashiers = () => {
  const res = getafm(false).then((afm) =>
    afm.listCashiers({ queue: false }).parse(),
  );
  return defer({
    cashiers: res.then((res) => ({
      cashiers: res.cashiers,
      id: smallid(),
    })),
  });
};

function AwaitCashiers({ children }) {
  const pending = useLoaderData();
  debug(pending, " pending");
  return (
    <Suspense fallback={<Pending />}>
      <Await resolve={pending.cashiers}>{children}</Await>
    </Suspense>
  );
}

export { loadCashiers, AwaitCashiers };
