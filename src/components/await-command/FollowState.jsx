import * as React from "react";
import { Pending } from "./Pending2.jsx";
import { delay } from "js_utils/misc";
import { useEntityState } from "../../hooks/useEntityState.jsx";
import { useRevalidator } from "react-router-dom";

function waitForUi(cb) {
  return cb() ? Promise.resolve() : delay(50).then(() => waitForUi(cb));
}

function togglePointerEvents(disable) {
  const root = document.getElementById("app-react-root");
  root.style.pointerEvents = disable ? "none" : "auto";
}

function FollowState({
  state: followedState,
  cmd,
  entityCb,
  revalidate = false,
  overlay = true,
  handlePending = false,
  delayPending: timePending,
  onFulfilled: handleFullfilled,
  onRejected: handleRejected,
  onSettled: handleSettled,
  children,
}) {
  const ref = React.useRef();
  const { state, idle, pending, fulfilled } =
    followedState || useEntityState(cmd);
  const revalidator = useRevalidator();

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
      togglePointerEvents(true);
      await waitForUi(() => ref.current);
      await delay(timePending);
    };
    const onSettled = (cmd) => {
      return handleSettled?.(cmd);
    };
    const onPostask = (cmd) => {
      togglePointerEvents(false);
      afm.once("idle", () => {
        revalidate && revalidator.revalidate();
      });
    };

    cmd.on?.("pending", onPending);
    cmd.on?.("fulfilled", onFulfilled);
    cmd.on?.("rejected", onRejected);
    cmd.on?.("settled", onSettled);
    cmd.on?.("postask", onPostask);

    return () => {
      cmd.removeListener?.("fulfilled", onFulfilled);
      cmd.removeListener?.("rejected", onRejected);
      cmd.removeListener?.("pending", onPending);
      cmd.removeListener?.("settled", onSettled);
      cmd.removelistener?.("postask", onPostask);
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
