import * as React from "react";
import { Spinner } from "#components/misc/Spinner.jsx";
import styled from "styled-components";

const Pending = React.forwardRef((props, ref) => (
  <div ref={ref} style={props.style} className={props.className}>
    <Spinner color="var(--info-strong)" size="75px" />
  </div>
));

const StyledPending = styled(Pending)`
  position: relative;
  .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: var(--grey-light);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export { StyledPending as Pending };
