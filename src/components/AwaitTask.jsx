import * as React from "react";
import { Pending } from "#components/Pending.jsx";
import { Fail } from "#components/Fail.jsx";
import { Success } from "#components/Success.jsx";

function AwaitTask({ task, state, children }) {
  debug(state);
  switch (state) {
    case "pending":
      return <Pending />;
    case "rejected":
      return <Fail />;
    case "fulfilled":
      return <Success />;
    default:
      return <>{children()}</>;
  }
}

export { AwaitTask };
