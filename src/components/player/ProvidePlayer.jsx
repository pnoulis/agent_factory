import * as React from "react";
import { ContextPlayer } from "../../contexts/ContextPlayer.jsx";
import { Player } from "#afm/player/Player.js";
import { ProvideWristband } from "../wristband/ProvideWristband.jsx";

function ProvidePlayer({ player, children, fill }) {
  player ??= fill
    ? Player.random(player, {
        state: "registered",
        wristband: { state: "paired", stage2: false },
      })
    : player;
  return (
    <ContextPlayer ctx={player}>
      <ProvideWristband wristband={player.wristband}>
        {React.isValidElement(children) ? children : children(player)}
      </ProvideWristband>
    </ContextPlayer>
  );
}

export { ProvidePlayer };
