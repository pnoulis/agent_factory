import { DataTuple } from "../tuple/DataTuple.jsx";
import { StandardDataTuple } from "../tuple/StandardDataTuple.jsx";
import { Card } from "../Card.jsx";
import { useContextPlayer } from "../../contexts/ContextPlayer.jsx";
import styled from "styled-components";
import { WristbandInfoCard } from "../wristband/WristbandInfoCard.jsx";

function PlayerInfoCard({ className }) {
  const ctx = useContextPlayer();

  return (
    <InfoCard className={className}>
      <StandardDataTuple className="player-username">
        <DataTuple src={ctx} name="username" />
      </StandardDataTuple>
      <StandardDataTuple className="player-name">
        <DataTuple src={ctx} name="name" />
      </StandardDataTuple>
      <StandardDataTuple className="player-surname">
        <DataTuple src={ctx} name="surname" />
      </StandardDataTuple>
      <StandardDataTuple className="player-email">
        <DataTuple src={ctx} name="email" />
      </StandardDataTuple>
      <StandardDataTuple className="player-password">
        <DataTuple src={ctx} name="password" />
      </StandardDataTuple>
      <WristbandInfoCard />
    </InfoCard>
  );
}

const InfoCard = styled(Card)`
  width: max-content;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 1fr;
  column-gap: 10px;
  align-items: center;

  .wristband-info-card {
    padding: 10px;
    width: min-content;
    margin-left: auto;
    grid-column: 2 / 3;
    grid-row: 1 / 6;
    align-self: center;
  }

  .wristband-color {
    display: none;
  }
  .wristband-id {
    grid-row: 1 / 3;
  }
`;

export { PlayerInfoCard };
