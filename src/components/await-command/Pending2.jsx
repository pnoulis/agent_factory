import * as React from "react";
import { Spinner } from "#components/misc/Spinner.jsx";
import styled from "styled-components";
import { mergec } from "/src/misc/misc.js";

const Pending = React.forwardRef((props, ref) => (
  <div
    ref={ref}
    style={props.style}
    className={mergec("pending", props.className)}
  >
    <Spinner color="var(--info-strong)" size={props.size || "75px"} />
  </div>
));

const StyledPending = styled(Pending)`
  z-index: 200;
  position: absolute;
  width: 150px;
  height: 150px;
  background-color: var(--grey-light);
  border-radius: 50%;
  box-sizing: border-box;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  .spinner {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export { StyledPending as Pending };
