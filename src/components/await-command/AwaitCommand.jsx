import * as React from "react";
import { Pending } from "./Pending.jsx";
import { Fulfilled } from "./Fulfilled.jsx";
import { Rejected } from "./Rejected.jsx";

function AwaitCommand({ run = false, wait = false, cmd, children }) {
  const [state, setState] = React.useState(cmd.state);

  React.useLayoutEffect(() => {
    const followState = (s) => setState(s);
    cmd.on?.("stateChange", followState);
    return () => cmd.removeListener?.("stateChange", followState);
  }, [cmd]);

  switch (state) {
    case "rejected":
      return React.isValidElement(children)
        ? children
        : children({ cmd, rejected: true, pending: false });
    case "fulfilled":
      return React.isValidElement(children)
        ? children
        : children({ cmd, rejected: false, pending: false });
    case "pending":
      return <Pending />;
    default:
      return wait
        ? null
        : React.isValidElement(children)
          ? children
          : children({ cmd, rejected: false, pending: true });
  }
}

export { AwaitCommand };
