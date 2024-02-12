import * as React from "react";
import styled from "styled-components";
import { Svg } from "react_utils/svgs";
import IconFail from "/assets/icons/semantic-warning-filled.svg?react";

function Fail({ className }) {
  return (
    <Wrapper className={className}>
      <Svg>
        <IconFail />
      </Svg>
    </Wrapper>
  );
}

const Wrapper = styled("div")`
  box-sizing: border-box;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: var(--grey-light);
  padding: 33px;
  > svg {
    fill: var(--error-light);
    position: relative;
    top: -3px;
  }
`;

export { Fail };
