import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Svg } from "react_utils/svgs";

const Text = styled("p")`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  text-align: center;
  font-weight: 600;
  font-size: var(--tx-sm);
  text-transform: uppercase;
  letter-spacing: 1px;
  word-spacing: 4px;
  white-space: wrap;
  line-height: 15px;
  min-height: 30px;
`;

const Icon = styled(Svg)`
  fill: black;
  margin: auto;
  max-width: ${({ size }) => size || "50px"};
`;

const Anchor = styled(NavLink)`
  box-sizing: border-box;
  height: 110px;
  flex: 0 0 150px;
  background-color: var(--grey-base);
  border-radius: var(--br-lg);
  cursor: pointer;
  display: flex;
  flex-flow: column nowrap;
  transition: transform 0.3s;
  backface-visibility: hidden;
  padding: 10px 6px 10px 6px;
  gap: 7px;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: var(--grey-light);
  }
  &.active {
    background-color: var(--primary-base);
  }
  &.active:hover {
    background-color: var(--primary-light);
  }
  &.active ${Text} {
    color: white;
  }
  &.active ${Icon} {
    fill: white;
  }
`;

export const PanelNavLink = {
  Anchor,
  Text,
  Icon,
};
