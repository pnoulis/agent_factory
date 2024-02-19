import * as React from "react";
import { Pending } from "./Pending.jsx";
import { delay } from "js_utils/misc";

function waitForUi(cb) {
  return cb() ? Promise.resolve() : delay(50).then(() => waitForUi(cb));
}

function AwaitCommand({ run = false, wait = false, cmd = {}, children }) {
  const [state, setState] = React.useState(cmd.state);
  const ref = React.useRef();

  React.useEffect(() => {
    const followState = async (s) => {
      setState(s);
      await waitForUi(() => ref.current);
    };
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
    case "created":
    // fall through
    case "queued":
    // fall through
    case "pending":
      return <Pending ref={(node) => (ref.current = node)} />;
    default:
      return wait
        ? null
        : React.isValidElement(children)
          ? children
          : children({ cmd, rejected: false, pending: true });
  }
}

export { AwaitCommand };
