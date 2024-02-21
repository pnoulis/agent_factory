import { DataTuple } from "../tuple/DataTuple.jsx";
import { useContextWristband } from "../../contexts/ContextWristband.jsx";
import { WidgetWristband } from "../widgets/WidgetWristband.jsx";
import { mergec } from "../../misc/misc.js";
import { Bracelet } from "./Bracelet.jsx";

function WristbandInfoCard({ ctx, className, style }) {
  ctx ??= useContextWristband();
  return (
    <article className={mergec(className, "wristband-info-card")} style={style}>
      <DataTuple src={ctx} name="id" label="rfid" />
      <DataTuple src={ctx} name="color" />
      <DataTuple className="state" src={ctx} name="state" label="status" />
      <Bracelet $wristbandColor={ctx.color} />
    </article>
  );
}

export { WristbandInfoCard };
