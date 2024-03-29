import * as React from "react";
import { Pending } from "./Pending.jsx";
import { delay } from "js_utils/misc";
import { useRevalidator } from "react-router-dom";

function waitForUi(cb) {
  return cb() ? Promise.resolve() : delay(50).then(() => waitForUi(cb));
}

function AwaitCommand({
  revalidate = false,
  run = false,
  wait = false,
  cmd = {},
  children,
}) {
  const [state, setState] = React.useState(cmd.state);
  const ref = React.useRef();
  const revalidator = useRevalidator();

  const _revalidate = () => revalidator.revalidate();

  React.useEffect(() => {
    const followState = async (s) => {
      setState(s);
      await waitForUi(() => ref.current);
    };

    const onFulfilled = (cmd) => {
      if (revalidate) {
        cmd.afm.removeListener("idle", _revalidate);
        cmd.afm.once("idle", _revalidate);
      }
    };

    cmd.on?.("stateChange", followState);
    cmd.on?.("fulfilled", onFulfilled);

    return () => {
      cmd.removeListener?.("stateChange", followState);
      cmd.removeListener?.("fulfilled", onFulfilled);
    };
  }, [cmd]);

  switch (state) {
    case "rejected":
      return (
        children &&
        (React.isValidElement(children)
          ? children
          : children({ cmd, rejected: true, pending: false }))
      );
    case "fulfilled":
      return (
        children &&
        (React.isValidElement(children)
          ? children
          : children({ cmd, rejected: false, pending: false }))
      );
    case "created":
    // fall through
    case "queued":
    // fall through
    case "pending":
      return <Pending ref={(node) => (ref.current = node)} />;
    default:
      return wait
        ? null
        : children &&
            (React.isValidElement(children)
              ? children
              : children({ cmd, rejected: false, pending: true }));
  }
}

export { AwaitCommand };
