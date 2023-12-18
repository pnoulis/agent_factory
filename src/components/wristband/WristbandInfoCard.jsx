import { DataTuple } from "../tuple/DataTuple.jsx";
import { StandardDataTuple } from "../tuple/StandardDataTuple.jsx";
import { Card } from "../Card.jsx";
import { useContextWristband } from "../../contexts/ContextWristband.jsx";
import styled from "styled-components";
import { WidgetWristband } from "../widgets/WidgetWristband.jsx";

function WristbandInfoCard({ className }) {
  const ctx = useContextWristband();
  return (
    <InfoCard className={className + " wristband-info-card"}>
      <StandardDataTuple className="wristband-id">
        <DataTuple src={ctx} name="id" label="rfid" />
      </StandardDataTuple>
      <StandardDataTuple className="wristband-color">
        <DataTuple src={ctx} name="color" />
      </StandardDataTuple>
      <WidgetWristband $disable className="wristband-widget" />
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
  .wristband-color: {
    grid-row: 2 / 3;
  }
  .wristband-widget.trigger {
    grid-row: 1 / 3;
    justify-self: end;
  }
`;

export { WristbandInfoCard };
