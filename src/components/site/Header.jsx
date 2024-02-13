import * as React from "react";
import styled from "styled-components";

const Header = styled("header")`
  box-sizing: border-box;
  grid-area: header;
  background-color: var(--grey-light);
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 0 15px;
  gap: 5px;
`;

export { Header };
