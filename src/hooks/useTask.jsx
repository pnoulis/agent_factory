import * as React from "react";

function useTask(task, { run = false, delay = 2000 } = {}) {
  const [state, setState] = React.useState("");
  const cmdRef = React.useRef(task);

  React.useEffect(() => {
    const followState = (nstate, ostate, cmd) => {
      cmdRef.current = cmd;
      setState(nstate);
      if (nstate === "rejected") {
        window.setTimeout(() => setState(""), delay);
      } else if (nstate === "fulfilled") {
        window.setTimeout(() => setState("render"), delay);
      }
    };

    task.on("stateChange", followState);

    if (run && !(cmdRef.current instanceof Promise)) {
      cmdRef.current = task();
    }
    return () => {
      task.removeListener("stateChange", followState);
    };
  }, [task]);

  return [cmdRef.current, state];
}

export { useTask };
