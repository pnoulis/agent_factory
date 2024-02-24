import * as React from "react";
import { Pending } from "./Pending2.jsx";
import { delay } from "js_utils/misc";
import { useEntityState } from "../../hooks/useEntityState.jsx";

function waitForUi(cb) {
  return cb() ? Promise.resolve() : delay(50).then(() => waitForUi(cb));
}

function FollowState({
  state: followedState,
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
  const { state, idle, pending, fulfilled } =
    followedState || useEntityState(cmd);

  React.useEffect(() => {
    const delayPending = async () => await delay(timePending);
    const onFulfilled = (cmd) =>
      entityCb
        ? entityCb(cmd) && handleFullfilled?.(cmd)
        : handleFullfilled?.(cmd);
    const onRejected = (cmd) =>
      entityCb
        ? entityCb(cmd) && handleFullfilled?.(cmd)
        : handleFullfilled?.(cmd);

    const onPending = async (cmd) => {
      await waitForUi(() => ref.current);
      await delay(timePending);
    };

    cmd.on?.("pending", onPending);
    cmd.on?.("fulfilled", onFulfilled);
    cmd.on?.("rejected", onRejected);

    return () => {
      cmd.removeListener?.("fulfilled", onFulfilled);
      cmd.removeListener?.("rejected", onRejected);
      cmd.removeListener?.("pending", onPending);
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
