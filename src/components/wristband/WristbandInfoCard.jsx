import { DataTuple } from "../tuple/DataTuple.jsx";
import { StandardDataTuple } from "../tuple/StandardDataTuple.jsx";
import { StandardStateTuple } from "../tuple/StandardStateTuple.jsx";
import { Card } from "../Card.jsx";
import { useContextWristband } from "../../contexts/ContextWristband.jsx";
import { WidgetWristband } from "../widgets/WidgetWristband.jsx";
import { mergec } from "../../misc/misc.js";

function WristbandInfoCard({ className }) {
  const ctx = useContextWristband();
  return (
    <Card className={mergec(className, "wristband-info-card")}>
      <StandardDataTuple className="wristband-id">
        <DataTuple src={ctx} name="id" label="rfid" />
      </StandardDataTuple>
      <StandardStateTuple className="wristband-state">
        <DataTuple src={ctx} name="state" label="status" />
      </StandardStateTuple>
      <WidgetWristband $disable $wristbandColor={ctx.color} />
    </Card>
  );
}

export { WristbandInfoCard };
