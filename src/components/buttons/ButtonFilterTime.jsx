import { Button } from "./Button.jsx";
import styled from "styled-components";

const ButtonFilterTime = styled(Button)`
  box-sizing: border-box;
  text-align: center;
  width: 130px;
  height: 40px;
  cursor: pointer;
  border-radius: var(--br-sm);
  background-color: var(--grey-base);
  color: ${({ $isActive }) => ($isActive ? "white" : "black")};
  letter-spacing: 1px;
  font-size: var(--tx-xxs);
  font-weight: 550;
  text-transform: uppercase;
  &:hover {
    opacity: 0.8;
  }
`;

export { ButtonFilterTime };
