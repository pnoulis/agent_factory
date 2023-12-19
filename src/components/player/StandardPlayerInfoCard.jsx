import { PlayerInfoCard } from "./PlayerInfoCard.jsx";
import styled from "styled-components";

const StandardPlayerInfoCard = styled(PlayerInfoCard)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 1fr;
  column-gap: 10px;
  align-items: center;

  .player-state {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    justify-self: end;
  }

  .wristband-info-card {
    padding: 5px 15px;
    max-width: 220px;
    margin-left: auto;
    grid-column: 2 / 3;
    grid-row: 2 / 4;
    row-gap: 0;
  }
`;

export { StandardPlayerInfoCard };
