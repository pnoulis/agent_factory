import { Fail } from "../misc/Fail.jsx";
import styled from "styled-components";

const Rejected = styled(Fail)`
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
  padding: 5px 25px;
  > svg {
    fill: var(--error-light);
    position: relative;
    top: -6px;
  }
`;

export { Rejected };
