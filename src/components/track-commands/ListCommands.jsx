import styled, { css } from "styled-components";

const ListCommands = styled("ul")`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 150;
  display: flex;
  width: max-content;
  flex-flow: column-reverse nowrap;
  gap: 20px;
  overflow-y: scroll;
  padding: 20px 20px;

  ${({ $topLeft }) =>
    $topLeft &&
    css`
      top: 0;
      left: 0;
      flex-flow: column nowrap;
      justify-content: start;
      z-index: 150;

      > li {
        margin: 0 auto 0 0 !important;
      }
    `}
`;

export { ListCommands };
