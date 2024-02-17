import styled from "styled-components";

const ListCommands = styled("ul")`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 3;
  display: flex;
  flex-flow: column-reverse nowrap;
  gap: 20px;
  margin-right: 30px;
  margin-bottom: 30px;
`;

export { ListCommands };
