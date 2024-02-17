import { Fail } from "#components/misc/Fail.jsx";
import styled from "styled-components";

const Rejected = styled(Fail)`
  box-sizing: border-box;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: var(--grey-light);
  padding: 8px;
  > svg {
    fill: var(--error-light);
    position: relative;
    top: -2px;
  }
`;

export { Rejected };
