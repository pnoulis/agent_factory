import { DataTuple } from "../tuple/DataTuple.jsx";
import { StandardDataTuple } from "../tuple/StandardDataTuple.jsx";
import { Card } from "../Card.jsx";
import { useContextPlayer } from "../../contexts/ContextPlayer.jsx";
import styled from "styled-components";

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
    </InfoCard>
  );
}

const InfoCard = styled(Card)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 1fr;
  column-gap: 30px;
  align-items: start;
  row-gap: 5px;
`;

export { PlayerInfoCard };
