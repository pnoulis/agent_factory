import { WidgetRemove } from "../widgets/WidgetRemove.jsx";
import { WidgetWristband } from "../widgets/WidgetWristband.jsx";
import { DataTuple } from "../tuple/DataTuple.jsx";
import { useContextPlayer } from "../../contexts/ContextPlayer.jsx";
import { useContextWristband } from "../../contexts/ContextWristband.jsx";
import { mergec } from "../../misc/misc.js";

function PlayerActionCard({
  ctx,
  onPlayerRemove,
  onWristbandPair,
  className,
  style,
}) {
  ctx ??= useContextPlayer();

  return (
    <article className={mergec(className, "player-action-card")} style={style}>
      <WidgetWristband $wristbandColor={ctx.wristband.color} />
      <DataTuple nok src={ctx} name="username" />
      <WidgetRemove
        content="remove player"
        onClick={() => onPlayerRemove(ctx)}
      />
    </article>
  );
}

export { PlayerActionCard };
