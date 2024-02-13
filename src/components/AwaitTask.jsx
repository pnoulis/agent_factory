import * as React from "react";
import styled from "styled-components";
import { Pending } from "#components/Pending.jsx";
import { Fail } from "#components/Fail.jsx";
import { Success } from "#components/Success.jsx";
import { useTask } from "../hooks/useTask.jsx";

function AwaitTask({
  task: managedTask,
  state: managedState,
  wait = false,
  manage = false,
  children,
  ...options
}) {
  const [task, state] = manage
    ? useTask(managedTask, options)
    : [managedTask, managedState];

  if (wait) {
    switch (state || managedState) {
      case "pending":
        return (
          <Wrapper>
            <Pending />
          </Wrapper>
        );
      case "rejected":
        return (
          <Wrapper>
            <Fail />
          </Wrapper>
        );
      case "fulfilled":
        return (
          <Wrapper>
            <Success />
          </Wrapper>
        );
      case "render":
        return React.isValidElement(children) ? children : children(task);
      default:
        return null;
    }
  }

  return (
    <>
      {React.isValidElement(children) ? children : children(task)}
      <Wrapper>
        {(state === "pending" && <Pending />) ||
          (state === "fulfilled" && <Success />) ||
          (state === "rejected" && <Fail />)}
      </Wrapper>
    </>
  );
}

const Wrapper = styled("div")`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  ::backdrop {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export { AwaitTask };
