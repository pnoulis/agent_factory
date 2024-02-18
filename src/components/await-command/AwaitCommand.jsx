import * as React from "react";
import { Pending } from "./Pending.jsx";
import { Fulfilled } from "./Fulfilled.jsx";
import { Rejected } from "./Rejected.jsx";
import { delay } from "js_utils/misc";

function waitForUi(cb) {
  debug("waiting for ui");
  return cb() ? Promise.resolve() : delay().then(() => waitForUi(cb));
}

function AwaitCommand({ run = false, wait = false, cmd, children }) {
  const [state, setState] = React.useState(cmd.state);
  const ref = React.useRef();

  React.useEffect(() => {
    debug("attach followstate");
    const followState2 = async (s) => {
      setState(s);
      console.log(`follow state: ${cmd.taskname}: ${s}`);
      // debug(`follow state: ${cmd.taskname}: ${s}`);
      // ref.current = null;
      await waitForUi(() => {
        debug("wait for ui", ref.current);
        return ref.current;
      });
    };
    cmd.on("stateChange", followState2);
    return () => {
      debug(`${cmd.taskname}: removing listener`);
      cmd.removeListener("stateChange", followState2);
    };
  }, [cmd]);

  React.useEffect(() => {
    debug(`${cmd.taskname}: state change: ${state}`);
    debug(ref.current);
  }, [state]);

  switch (state) {
    case "rejected":
      return (
        <div ref={(node) => (ref.current = node)}>
          {React.isValidElement(children)
            ? children
            : children({ cmd, rejected: true, pending: false })}
        </div>
      );
      return React.isValidElement(children)
        ? children
        : children({ cmd, rejected: true, pending: false });
    case "fulfilled":
      return (
        <div ref={(node) => (ref.current = node)}>
          {React.isValidElement(children)
            ? children
            : children({ cmd, rejected: false, pending: false })}
        </div>
      );
    case "queued":
    // fall through
    case "pending":
      return (
        <div ref={(node) => (ref.current = node)}>
          <Pending />
        </div>
      );
    default:
      return wait ? null : (
        <div ref={(node) => (ref.current = node)}>
          {React.isValidElement(children)
            ? children
            : children({ cmd, rejected: false, pending: true })}
        </div>
      );
  }
}

export { AwaitCommand };
