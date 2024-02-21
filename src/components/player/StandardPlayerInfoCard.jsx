import { PlayerInfoCard } from "./PlayerInfoCard.jsx";
import styled from "styled-components";

const StandardPlayerInfoCard = styled(PlayerInfoCard)`
  background-color: var(--grey-light);
  border-radius: var(--br-lg);
  padding: 15px;
  height: 100%;
  width: 100%;

  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  column-gap: 20px;
  row-gap: 10px;

  .key {
    font-weight: 550;
    justify-self: start;
  }

  .value {
    justify-self: start;
  }

  & > .value {
    text-wrap: wrap;
    overflow-wrap: anywhere;
  }

  .key::after {
    content: ":";
    font-weight: 600;
    margin: 0 3px 0 3px;
  }

  .value.state {
    font-weight: 600;
    color: var(--info-base);
  }

  .wristband-info-card {
    padding: 15px 10px 15px 15px;
    border-radius: var(--br-lg);
    height: max-content;
    padding: 15px;
    background-color: white;
    grid-column: 3;
    grid-row: 1 / span 4;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
  }

  .wristband-info-card .bracelet {
    grid-column: 3;
    grid-row: 1 / span 3;
    align-self: start;
  }
`;

export { StandardPlayerInfoCard };
