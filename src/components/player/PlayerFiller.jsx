import * as React from "react";
import { DataTuple } from "../tuple/DataTuple.jsx";
import { mergec } from "../../misc/misc.js";

function PlayerFiller({ value, className, style }) {
  return (
    <article className={mergec("player-filler", className)} style={style}>
      <DataTuple nok value={value} />
    </article>
  );
}

export { PlayerFiller };
