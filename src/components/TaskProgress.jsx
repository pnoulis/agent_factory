import * as React from "react";
import { createPortal } from "react-dom";
import { useTask } from "../hooks/useTask.jsx";

import { MoonLoader } from "react-spinners";
import { delay } from "js_utils/misc";
import styled from "styled-components";
import { Pending } from "#components/Pending.jsx";
import { Fail } from "#components/Fail.jsx";
import { Success } from "#components/Success.jsx";

function waitForUi(cb) {
  return cb() ? Promise.resolve() : delay().then(() => waitForUi(cb));
}

function TaskProgress() {
  const [cmds, setCmds] = React.useState([]);
  const cmdRefs = React.useRef([]);

  const flash = document.getElementById("flash-messages-react-root");

  React.useEffect(() => {
    afm.registerListener("cmdstart", "taskProgress", async (cmd) => {
      const index = cmds.length;
      setCmds(cmds.concat(cmd));
      cmdRefs.current.push(null);
      debug(cmd, "New command");

      cmd.on("stateChange", (n, s, cmd) => {
        debug(`${cmd.taskname}: ${n}`);
      });
      await waitForUi(() => cmdRefs.current[index]);
      debug("UI rendered");
    });
    return () => afm.deregisterListener("cmdstart", "taskProgress");
  }, [cmds, setCmds]);

  return createPortal(
    <Div>
      {cmds.map((cmd, i) => (
        <AwaitCommand
          key={i}
          cmd={cmd}
          ref={(node) => (cmdRefs.current[i] = node)}
        />
      ))}
    </Div>,
    flash,
  );
}

const Div = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  pointer-events: none;
  z-index: 3;
  display: flex;
  flex-flow: column-reverse nowrap;
  gap: 20px;
  padding: 30px;
`;

const AwaitCommand = React.forwardRef((props, ref) => {
  const [state, setState] = React.useState(props.cmd.state);
  const followState = React.useCallback((s) => setState(s), [props.cmd]);
  const delayPending = React.useCallback(() => delay(2000), [props.cmd]);

  React.useLayoutEffect(() => {
    props.cmd.on("stateChange", followState);
    props.cmd.on("task", delayPending);
    return () => {
      props.cmd.removeListener("stateChange", followState);
      props.cmd.removeListener("task", delayPending);
    };
  }, [props.cmd]);

  return (
    <Wrapper ref={ref}>
      <p className="taskname">{props.cmd.verb}</p>
      {switchState(state)}
    </Wrapper>
  );
  function switchState(state) {
    debug(`stwitch state: ${state}`);
    switch (state) {
      case "created":
        return null;
      case "pending":
        return <MoonLoader loading color="var(--info-strong)" size="30px" />;
      case "rejected":
        props.cmd.removeListener("stateChange", followState);
        props.cmd.removeListener("stateChange", followState);
        props.cmd.removeListener("task", delayPending);
        return <Fail />;
      case "fulfilled":
        props.cmd.removeListener("stateChange", followState);
        props.cmd.removeListener("stateChange", followState);
        props.cmd.removeListener("task", delayPending);
        return <Success />;
    }
  }
});

const Wrapper = styled("div")`
  margin-left: auto;
  pointer-events: none;
  min-height: 50px;
  height: auto;
  padding: 5px 20px;
  min-width: 400px;
  width: max-content;
  border-radius: var(--br-nl);
  box-shadow: var(--sd-8);
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  gap: 30px;

  background-color: white;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 5px 20px;
  height: 50px;
  box-shadow: var(--sd-9);
  gap: 40px;
  text-transform: capitalize;
  font-size: var(--tx-md);
  letter-spacing: 1.2px;
  word-spacing: 2px;

  .taskname::after {
    content: "...";
    margin-left: 5px;
    letter-spacing: 1px;
    font-weight: 500;
  }

  // position: fixed;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  // box-sizing: border-box;
  // width: 150px;
  // height: 150px;
  // border-radius: 50%;
  // ::backdrop {
  //   background-color: rgba(0, 0, 0, 0.2);
  // }
`;

export { TaskProgress };
