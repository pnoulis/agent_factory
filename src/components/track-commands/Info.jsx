import { Info } from "#components/misc/Info.jsx";
import styled from "styled-components";

const StyledInfo = styled(Info)`
  box-sizing: border-box;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: var(--info-strong);
  padding: 8px;
  > svg {
    fill: white;
    position: relative;
  }
`;

export { StyledInfo as Info };
