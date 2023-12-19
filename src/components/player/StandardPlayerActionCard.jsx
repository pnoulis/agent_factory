import { PlayerActionCard } from "./PlayerActionCard.jsx";
import styled from "styled-components";

const StandardPlayerActionCard = styled(PlayerActionCard)`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  row-gap: 15px;
  justify-content: space-between;

  .player-username {
    order: 2;
  }

  .widget-remove.trigger {
    order: 3;
    width: 35px;
    height: 35px;
    padding: 6px;
    background-color: var(--primary-base);
  }

  .widget-remove.trigger svg {
    fill: white;
  }

  .widget-wristband.trigger {
    order: 1;
    padding: 4px;
    width: 50px;
    height: 50px;
  }
`;

export { StandardPlayerActionCard };
