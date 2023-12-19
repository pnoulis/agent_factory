import { DataTuple } from "../tuple/DataTuple.jsx";
import { StandardDataTuple } from "../tuple/StandardDataTuple.jsx";
import { StandardStateTuple } from "../tuple/StandardStateTuple.jsx";
import { Card } from "../Card.jsx";
import { useContextPlayer } from "../../contexts/ContextPlayer.jsx";
import { StandardWristbandInfoCard } from "../wristband/StandardWristbandInfoCard.jsx";
import { mergec } from "../../misc/misc.js";

function PlayerInfoCard({ className, ...props }) {
  const ctx = useContextPlayer();

  return (
    <Card className={mergec(className, "player-info-card")} {...props}>
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
      <StandardWristbandInfoCard />
    </Card>
  );
}

export { PlayerInfoCard };
