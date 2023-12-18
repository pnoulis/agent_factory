import { DataTuple } from "../tuple/DataTuple.jsx";
import { StandardDataTuple } from "../tuple/StandardDataTuple.jsx";
import { StandardStateTuple } from "../tuple/StandardStateTuple.jsx";
import { Card } from "../Card.jsx";
import { useContextWristband } from "../../contexts/ContextWristband.jsx";
import styled from "styled-components";
import { WidgetWristband } from "../widgets/WidgetWristband.jsx";
import { mergec } from "../../misc/misc.js";

function WristbandInfoCard({ className }) {
  const ctx = useContextWristband();
  return (
    <InfoCard className={mergec(className, "wristband-info-card")}>
      <StandardDataTuple className="wristband-id">
        <DataTuple src={ctx} name="id" label="rfid" />
      </StandardDataTuple>
      <StandardStateTuple className="wristband-state">
        <DataTuple src={ctx} name="state" label="status" />
      </StandardStateTuple>
      <WidgetWristband $disable $wristbandColor={ctx.color} />
    </InfoCard>
  );
}

const InfoCard = styled(Card)`
  background-color: white;
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-auto-rows: 1fr;
  column-gap: 30px;
  align-items: center;
  row-gap: 5px;

  .wristband-id {
    grid-row: 1 / 2;
  }
  .wristband-state {
    grid-row: 2 / 3;
  }
  .widget-wristband.trigger {
    grid-row: 1 / 3;
    justify-self: end;
    max-width: 35px;
    max-height: 35px;
    padding: 4px;
  }
`;

export { WristbandInfoCard };
