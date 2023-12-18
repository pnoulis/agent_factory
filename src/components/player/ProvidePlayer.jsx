import * as React from "react";
import { ContextPlayer } from "../../contexts/ContextPlayer.jsx";
import { Player } from "../../player/Player.js";

function ProvidePlayer({ player, children, fill }) {
  const [_player, setPlayer] = React.useState(
    () => new Player(fill ? Player.random(player) : player),
  );
  return <ContextPlayer ctx={_player}>{children}</ContextPlayer>;
}

export { ProvidePlayer };
