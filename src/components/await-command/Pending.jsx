import * as React from "react";
import { Spinner } from "../misc/Spinner.jsx";
import styled from "styled-components";

const Pending = React.forwardRef((props, ref) => (
  <div ref={ref} style={props.style} className={props.className}>
    <Spinner color="var(--info-strong)" size={props.size || "75px"} />
  </div>
));

const StyledPending = styled(Pending)`
  position: relative;
  width: 150px;
  height: 150px;
  background-color: var(--grey-light);
  border-radius: 50%;
  .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export { StyledPending as Pending };
