import IconSignal from "/assets/icons/signal.svg?react";
import { Svg } from "react_utils/svgs";
import styled, { css } from "styled-components";
import { mergec } from "/src/misc/misc.js";

function Bracelet({ $wristbandColor, className, style }) {
  return (
    <Wrapper
      $wristbandColor={$wristbandColor}
      className={mergec("bracelet", className)}
      style={style}
    >
      <Svg>
        <IconSignal />
      </Svg>
    </Wrapper>
  );
}

const Wrapper = styled("div")`
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  width: ${({ size }) => size || "50px"};
  height: ${({ size }) => size || "50px"};
  border: 3px solid transparent;
  padding: 8px;
  border-radius: 50%;
  background-color: ${({ $wristbandColor }) =>
    `${$wristbandColor || "var(--grey-base)"}`};
  border-color: ${({ $wristbandColor }) =>
    `${$wristbandColor || "transparent"}`};
  svg {
    fill: ${({ $wristbandColor }) => `${$wristbandColor ? "white" : "black"}`};
  }
`;

export { Bracelet };
