import { Success } from "../misc/Success.jsx";
import styled from "styled-components";

const Fulfilled = styled(Success)`
  box-sizing: border-box;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: var(--grey-light);
  padding: 6px;
  > svg {
    fill: var(--success-medium);
    position: relative;
    top: 2px;
  }
`;

export { Fulfilled };
