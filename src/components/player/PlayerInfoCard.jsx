import { DataTuple } from "../tuple/DataTuple.jsx";
import { useContextPlayer } from "../../contexts/ContextPlayer.jsx";
import { WristbandInfoCard } from "../wristband/WristbandInfoCard.jsx";
import { mergec } from "../../misc/misc.js";

function PlayerInfoCard({ ctx, className, style }) {
  ctx ??= useContextPlayer();
  return (
    <article className={mergec(className, "player-info-card")} style={style}>
      <DataTuple nov src={ctx} name="name" label="fullname" />
      <div className="value" style={{ display: "flex", gap: "5px" }}>
        <DataTuple nok src={ctx} name="surname" />
        <DataTuple nok src={ctx} name="name" />
      </div>
      <DataTuple src={ctx} name="username" />
      <DataTuple src={ctx} name="email" />
      <DataTuple className="state" src={ctx} name="state" label="status" />
      <WristbandInfoCard ctx={ctx.wristband} />
    </article>
  );
}

export { PlayerInfoCard };
