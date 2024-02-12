import * as React from "react";
import { delay } from "js_utils/misc";

function useTask(task, options) {
  options ||= {};

  const _options = {
    t_settle: options ?? 5000,
  };

  const [state, setState] = React.useState();
  const listenerRef = React.useRef();
  const commandRef = React.useRef(task);

  listenerRef.current ??= (state, ostate, cmd) => {
    commandRef.current = cmd;
    debug(state);
    setState(state);
    // if (state === "rejected" || state === "fulfilled") {
    //   setTimeout(() => setState(""), _options.t_settle);
    // }
  };

  React.useEffect(() => {
    task.on("stateChange", listenerRtef.current);

    const followState = (state, ostate, cmd) => {
      commandRef.current = cmd;
      setState(state);
    };
    const throttleTask = (ctx, next) => delay(_options.t_settle).then(next);
    task.on("postask", throttleTask);
    return () => {
      task.removeListener("stateChange", listenerRef.current);
      task.removeListener("postask", throttleTask);
    };
  }, [task]);

  return {
    [task.taskname]: commandRef.current,
    state,
  };
}

export { useTask };
