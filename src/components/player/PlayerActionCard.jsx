import * as React from "react";
import { WidgetRemove } from "../widgets/WidgetRemove.jsx";
import { WidgetWristband } from "../widgets/WidgetWristband.jsx";
import { DataTuple } from "../tuple/DataTuple.jsx";
import { useContextPlayer } from "../../contexts/ContextPlayer.jsx";
import { useContextWristband } from "../../contexts/ContextWristband.jsx";
import { mergec } from "../../misc/misc.js";
import { useEntityState } from "../../hooks/useEntityState.jsx";

function PlayerActionCard({
  ctx,
  onPlayerRemove,
  onWristbandPair,
  onWristbandUnpair,
  className,
  style,
}) {
  ctx ??= useContextPlayer();
  const { state } = useEntityState(ctx.wristband);

  return (
    <article className={mergec(className, "player-action-card")} style={style}>
      <WidgetWristband
        $wristbandColor={ctx.wristband.color}
        $pairing={state === "pairing"}
        onClick={() => {
          switch (ctx.wristband.state?.name) {
            case "paired":
            // fall through
            case "pairing":
              return onWristbandUnpair(ctx);
            case "unpaired":
            // fall through
            case "unpairing":
              return onWristbandPair(ctx);
            default:
              throw globalThis.craterr(({ EWRISTBAND }) =>
                EWRISTBAND(
                  `Unknown wristband state: '${ctx.wristband.state?.name}'`,
                ),
              );
          }
        }}
      />
      <DataTuple nok src={ctx} name="username" />
      <WidgetRemove
        content="remove player"
        onClick={() => onPlayerRemove(ctx)}
      />
    </article>
  );
}

export { PlayerActionCard };
