import * as React from "react";
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
  onWristbandUnpair,
  className,
  style,
}) {
  ctx ??= useContextPlayer();
  const [state, setState] = React.useState(ctx.wristband.state?.name);

  React.useEffect(() => {
    const followState = (s) => setState(s);
    ctx.wristband.on("stateChange", followState);
    return () => {
      if (ctx.wristband.inState("pairing")) {
        ctx.wristband.cancelPairing();
      }
      ctx.wristband.removeListener("stateChange", followState);
    };
  }, [ctx.wristband]);

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
