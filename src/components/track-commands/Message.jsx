import styled from "styled-components";

const Message = styled("span")`
  grid-column: 1 / span 2;
  color: ${({ severity }) =>
    severity === "info" ? "black" : "var(--error-light)"};
`;

export { Message };
