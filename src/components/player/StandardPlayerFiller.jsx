import { PlayerFiller } from "./PlayerFiller.jsx";
import styled from "styled-components";

const StandardPlayerFiller = styled(PlayerFiller)`
  background-color: var(--grey-light);
  opacity: 0.6;
  padding: 15px 20px;
  border-radius: var(--br-lg);
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  gap: 20px;

  .value {
    text-align: center;
    font-weight: 550;
  }
`;

export { StandardPlayerFiller };
