import * as React from "react";

function useTask(task, { run = false, delay = 2000, propagate = false } = {}) {
  const [state, setState] = React.useState(task?.state);
  const taskRef = React.useRef(task ? [task] : []);

  React.useEffect(() => {
    let timeout;
    debug(taskRef.current[0], "useEffect: taskRef.current.length");
    const followState = (s, os, cmd) => {
      cmd.propagate = propagate;
      taskRef.current[0] = cmd;
      setState(s);
      if (s === "fulfilled" || s === "rejected") {
        timeout = setTimeout(() => {
          taskRef.current.shift();
          setState("");
        }, delay);
      }
    };
    taskRef.current[0]?.on("stateChange", followState);

    return () => {
      taskRef.current[0]?.removeListener("stateChange", followState);
      window.clearTimeout(timeout);
    };
  }, [taskRef.current.length]);

  function add(task) {
    taskRef.current.push(task);
    debug(task, "add task");
  }

  return { task: taskRef.current[0], add };
}

export { useTask };
