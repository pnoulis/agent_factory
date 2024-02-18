import * as React from "react";
import styled from "styled-components";
import { FM_TIMEOUT } from "/src/constants.js";
import { State } from "./State.jsx";

const Command = React.forwardRef((props, ref) => {
  const [state, setState] = React.useState(props.cmd.state);

  React.useLayoutEffect(() => {
    const followState = (s) => setState(s);
    props.cmd.on("stateChange", followState);

    return () => {
      props.cmd.removeListener("stateChange", followState);
    };
  }, [props.cmd]);

  React.useEffect(() => {
    if (state === "fulfilled") {
      setTimeout(() => props.umount(props.cmd), FM_TIMEOUT / 2);
    } else if (state === "rejected") {
      setTimeout(() => props.umount(props.cmd), FM_TIMEOUT);
    }
  }, [state, setState]);

  return (
    <Li ref={ref} onClick={() => props.umount(props.cmd)}>
      <span className="taskname">{props.cmd.verb ?? props.cmd.taskname}</span>
      <State cmd={props.cmd} />
    </Li>
  );
});

const Li = styled("li")`
  z-index: 4;
  margin-left: auto;
  background-color: white;
  cursor: pointer;
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-template-rows: auto;
  align-items: center;
  padding: 5px 20px;
  gap: 5px;
  min-height: 50px;
  height: auto;
  min-width: 400px;
  width: max-content;

  border-radius: var(--br-nl);
  box-shadow: var(--sd-5);

  text-transform: capitalize;
  color: black;
  font-size: var(--tx-md);
  letter-spacing: 1.2px;
  word-spacing: 2px;

  .taskname::after {
    content: "...";
    margin-left: 5px;
    letter-spacing: 3px;
    font-weight: 500;
  }

  .msg {
    grid-column: 1 / -1;
    color: var(--error-light);
  }
`;

export { Command };
