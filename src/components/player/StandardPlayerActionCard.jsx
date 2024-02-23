import { PlayerActionCard } from "./PlayerActionCard.jsx";
import styled from "styled-components";

const StandardPlayerActionCard = styled(PlayerActionCard)`
  background-color: var(--grey-light);
  padding: 15px 20px;
  border-radius: var(--br-lg);
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  .value {
    text-align: center;
    font-weight: 550;
    overflow-wrap: anywhere;
  }

  .widget-wristband {
    padding: 5px;
    width: 60px;
    height: 60px;
    svg {
      fill: var(--grey-strong);
    }
  }
  .widget-remove {
    background-color: var(--primary-base);
    padding: 4px;
    width: 34px;
    height: 34px;
    svg {
      fill: white;
    }
  }
`;

export { StandardPlayerActionCard };
