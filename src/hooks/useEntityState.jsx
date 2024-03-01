import * as React from "react";

function useEntityState(entity, cb) {
  const [state, setState] = React.useState(
    () => entity?.state?.name || entity.state,
  );

  const idle = !state;
  const pending =
    state === "created" || state === "queued" || state === "pending";
  const fulfilled = state === "fulfilled";

  React.useEffect(() => {
    const followState = (s, o, cmd) => {
      if (cb) {
        if (cb(cmd)) {
          setState(s);
        }
      } else {
        setState(s);
      }
    };
    entity.on("stateChange", followState);
    return () => entity.removeListener("stateChange", followState);
  }, [entity, cb]);

  return { state, idle, entityCb: cb, pending, fulfilled };
}

export { useEntityState };
