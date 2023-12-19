import { WristbandInfoCard } from "./WristbandInfoCard.jsx";
import styled from "styled-components";

const StandardWristbandInfoCard = styled(WristbandInfoCard)`
  background-color: white;
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-auto-rows: 1fr;
  column-gap: 30px;
  align-items: center;
  row-gap: 5px;

  .wristband-id {
    grid-row: 1 / 2;
  }
  .wristband-state {
    grid-row: 2 / 3;
  }
  .widget-wristband.trigger {
    grid-row: 1 / 3;
    justify-self: end;
    max-width: 35px;
    max-height: 35px;
    padding: 4px;
  }
`;

export { StandardWristbandInfoCard };
