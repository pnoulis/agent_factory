import { WidgetRemove } from "../widgets/WidgetRemove.jsx";
import { WidgetWristband } from "../widgets/WidgetWristband.jsx";
import { StandardDataTuple } from "../tuple/StandardDataTuple.jsx";
import { DataTuple } from "../tuple/DataTuple.jsx";
import { Card } from "../Card.jsx";
import { useContextPlayer } from "../../contexts/ContextPlayer.jsx";
import { useContextWristband } from "../../contexts/ContextWristband.jsx";
import { styled } from "styled-components";
import { mergec } from "../../misc/misc.js";

function PlayerActionCard({
  onPlayerRemove,
  onWristbandPair,
  className,
  ...props
} = {}) {
  const ctxPlayer = useContextPlayer();
  const ctxWristband = useContextWristband();

  return (
    <Card className={mergec(className, "player-action-card")} {...props}>
      <WidgetRemove content="remove player" />
      <StandardDataTuple className="player-username">
        <DataTuple nok src={ctxPlayer} name="username" />
      </StandardDataTuple>
      <WidgetWristband $wristbandColor={ctxWristband.color} />
    </Card>
  );
}

export { PlayerActionCard };
