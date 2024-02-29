import { Success } from "../misc/Success.jsx";
import styled from "styled-components";

const Fulfilled = styled(Success)`
  position: fixed;
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
  padding: 0 22px;
  > svg {
    fill: var(--success-medium);
    position: relative;
    top: 5px;
    left: 3px;
  }
`;

export { Fulfilled };
