import { WidgetRemove } from "../widgets/WidgetRemove.jsx";
import { WidgetWristband } from "../widgets/WidgetWristband.jsx";
import { StandardDataTuple } from "../tuple/StandardDataTuple.jsx";
import { DataTuple } from "../tuple/DataTuple.jsx";
import { Card } from "../Card.jsx";
import { useContextPlayer } from "../../contexts/ContextPlayer.jsx";
import { useContextWristband } from "../../contexts/ContextWristband.jsx";
import { styled } from "styled-components";
import { mergec } from "../../misc/misc.js";

function PlayerActionCard({ onPlayerRemove, onWristbandPair, className } = {}) {
  const ctxPlayer = useContextPlayer();
  const ctxWristband = useContextWristband();

  return (
    <ActionCard className={mergec(className, "player-action-card")}>
      <WidgetRemove content="remove player" />
      <StandardDataTuple className="player-username">
        <DataTuple nok src={ctxPlayer} name="username" />
      </StandardDataTuple>
      <WidgetWristband $wristbandColor={ctxWristband.color} />
    </ActionCard>
  );
}

const ActionCard = styled(Card)`
  width: max-content;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  row-gap: 15px;
  justify-content: space-between;
  min-height: 130px;

  .player-username {
    order: 2;
  }

  .widget-remove.trigger {
    order: 3;
    width: 35px;
    height: 35px;
    padding: 6px;
  }
  .widget-wristband.trigger {
    order: 1;
    padding: 4px;
    width: 50px;
    height: 50px;
  }
`;

export { PlayerActionCard };
