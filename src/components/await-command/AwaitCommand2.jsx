import * as React from "react";
import { Pending } from "./Pending2.jsx";
import { delay } from "js_utils/misc";
import { Center } from "#components/Center.jsx";
import { useRevalidator } from "react-router-dom";

function waitForUi(cb) {
  return cb() ? Promise.resolve() : delay(50).then(() => waitForUi(cb));
}

function AwaitCommand2({
  overlay = true,
  handlePending = false,
  delayPending: timePending,
  revalidate = false,
  state: initialState,
  onFulfilled: handleFullfilled,
  onRejected: handleRejected,
  cmd,
  children,
}) {
  const [state, setState] = React.useState(initialState || cmd.state);
  const ref = React.useRef();
  const revalidator = useRevalidator();

  const idle = !state;
  const pending =
    state === "created" || state === "queued" || state === "pending";
  const fulfilled = state === "fulfilled";

  React.useEffect(() => {
    const followState = async (s) => {
      setState(s);
      await waitForUi(() => ref.current);
    };
    const delayPending = async () => await delay(timePending);
    const onFulfilled = (cmd) => handleFullfilled?.(cmd);
    const onRejected = (cmd) => handleRejected?.(cmd);

    cmd.on?.("pretask", delayPending);
    cmd.on?.("stateChange", followState);
    cmd.on?.("fulfilled", onFulfilled);
    cmd.on?.("rejected", onRejected);

    return () => {
      cmd.removeListener?.("stateChange", followState);
      cmd.removeListener?.("pretask", delayPending);
      cmd.removeListener?.("fulfilled", onFulfilled);
      cmd.removeListener?.("rejected", onRejected);
    };
  }, [cmd]);

  React.useEffect(() => {
    const onIdle = () => {
      if (pending || idle) return;
      if (revalidate) {
        revalidator.revalidate();
      }
    };
    afm.once("idle", onIdle);
    return () => {
      if (afm.hasEvent("idle")) {
        afm.removeListener("idle", onIdle);
      }
    };
  }, [state, setState]);

  return !handlePending && pending ? (
    <>
      <div
        ref={ref}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          pointerEvents: overlay ? "none" : "initial",
        }}
      >
        {overlay && React.isValidElement(children)
          ? children
          : children({
              cmd,
              state,
              idle,
              pending,
              fulfilled,
            })}
        <Pending />
      </div>
    </>
  ) : React.isValidElement(children) ? (
    children
  ) : (
    children({
      cmd,
      state,
      idle,
      pending,
      fulfilled,
    })
  );
}

export { AwaitCommand2 };
