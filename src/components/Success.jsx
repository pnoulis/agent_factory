import * as React from "react";
import styled from "styled-components";
import { Svg } from "react_utils/svgs";
import IconSuccess from "/assets/icons/tick.svg?react";

function Success({ className }) {
  return (
    <Wrapper className={className}>
      <Svg>
        <IconSuccess />
      </Svg>
    </Wrapper>
  );
}

const Wrapper = styled("div")`
  box-sizing: border-box;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: var(--grey-light);
  padding: 5px;
  svg {
    fill: var(--success-medium);
    position: relative;
    bottom: -2px;
  }
`;

export { Success };
