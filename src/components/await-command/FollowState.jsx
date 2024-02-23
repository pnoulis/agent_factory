import * as React from "react";
import { Pending } from "./Pending2.jsx";
import { delay } from "js_utils/misc";

function waitForUi(cb) {
  return cb() ? Promise.resolve() : delay(50).then(() => waitForUi(cb));
}

function FollowState({
  state,
  cmd,
  entityCb,
  overlay = true,
  handlePending = false,
  delayPending: timePending,
  onFulfilled: handleFullfilled,
  onRejected: handleRejected,
  children,
}) {
  const ref = React.useRef();

  const idle = !state;
  const pending =
    state === "created" || state === "queued" || state === "pending";
  const fulfilled = state === "fulfilled";

  React.useEffect(() => {
    const delayPending = async () => await delay(timePending);
    const onFulfilled = (cmd) => entityCb(cmd) && handleFullfilled?.(cmd);
    const onRejected = (cmd) => entityCb(cmd) && handleRejected?.(cmd);

    cmd.on?.("pretask", delayPending);
    cmd.on?.("fulfilled", onFulfilled);
    cmd.on?.("rejected", onRejected);

    return () => {
      cmd.removeListener?.("pretask", delayPending);
      cmd.removeListener?.("fulfilled", onFulfilled);
      cmd.removeListener?.("rejected", onRejected);
    };
  }, [cmd]);

  return !handlePending && pending ? (
    <>
      <div
        ref={ref}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          pointerEvents: "none",
        }}
      >
        {overlay &&
          (React.isValidElement(children)
            ? children
            : children({
                cmd,
                state,
                idle,
                pending,
                fulfilled,
              }))}
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

export { FollowState };
