import { DataTuple } from "../tuple/DataTuple.jsx";
import { StandardDataTuple } from "../tuple/StandardDataTuple.jsx";
import { StandardStateTuple } from "../tuple/StandardStateTuple.jsx";
import { Card } from "../Card.jsx";
import { useContextPlayer } from "../../contexts/ContextPlayer.jsx";
import styled from "styled-components";
import { WristbandInfoCard } from "../wristband/WristbandInfoCard.jsx";
import { mergec } from "../../misc/misc.js";

function PlayerInfoCard({ className }) {
  const ctx = useContextPlayer();

  return (
    <InfoCard className={mergec(className, "player-info-card")}>
      <StandardDataTuple className="player-name">
        <DataTuple src={ctx} name="name" />
        <span className="sep"></span>
        <DataTuple nok src={ctx} name="surname" />
      </StandardDataTuple>
      <StandardDataTuple className="player-username">
        <DataTuple src={ctx} name="username" />
      </StandardDataTuple>
      <StandardDataTuple className="player-email">
        <DataTuple src={ctx} name="email" />
      </StandardDataTuple>
      <StandardStateTuple className="player-state">
        <DataTuple src={ctx} name="state" label="status" />
      </StandardStateTuple>
      <WristbandInfoCard />
    </InfoCard>
  );
}

const InfoCard = styled(Card)`
  max-width: 570px;
  min-height: 120px;
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

export { PlayerInfoCard };
