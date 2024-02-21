import styled from "styled-components";
import { DialogConfirmStandard } from "#components/dialogs/confirms/DialogConfirmStandard.jsx";
import { DialogAlertStandard } from "#components/dialogs/alerts/DialogAlertStandard.jsx";
import { DialogInputStandard } from "../../components/dialogs/inputs/DialogInputStandard";
// import { StandardAlertDialog } from "../../components/dialogs/alerts/StandardAlertDialog.jsx";
// import { BasicDialog } from "react_utils/dialogs";
import { FormLoginCashier } from "#components/forms/FormLoginCashier.jsx";
import { renderDialog } from "#components/dialogs/renderDialog.jsx";
import { ComboboxDeviceView } from "../../components/comboboxes/ComboboxDeviceView";
import { Pending } from "#components/await-command/Pending.jsx";
import { ProvidePlayer } from "#components/player/ProvidePlayer.jsx";
import { PlayerInfoCard } from "#components/player/PlayerInfoCard";
import { ProvideWristband } from "#components/wristband/ProvideWristband.jsx";
import { WristbandInfoCard } from "../../components/wristband/WristbandInfoCard";
// import { StandardPlayerActionCard } from "../../components/player/StandardPlayerActionCard.jsx";
import { StandardPlayerInfoCard } from "../../components/player/StandardPlayerInfoCard";
import { StandardPlayerActionCard } from "../../components/player/StandardPlayerActionCard";
import { ComboboxSearchPlayer } from "../../components/comboboxes/ComboboxSearchPlayer";
import { AwaitAfmachine } from "/src/loaders/loadAfmachine.jsx";
import * as ReactDOM from "react-dom";
import { TrackCommands } from "#components/track-commands/TrackCommands.jsx";
import { PlayerActionCard } from "#components/player/PlayerActionCard.jsx";
import { WidgetRemove } from "../../components/widgets/WidgetRemove";

function PageScratch() {
  return (
    <>
      <h1>page scratch</h1>
      <Div>
        <ProvidePlayer fill>
          {(props) => {
            return <StandardPlayerActionCard ctx={props} />;
          }}
        </ProvidePlayer>
        {/* <ProvidePlayer fill> */}
        {/*   {(props) => { */}
        {/*     debug(props); */}
        {/*     return <StandardPlayerInfoCard ctx={props} />; */}
        {/*   }} */}
        {/* </ProvidePlayer> */}
      </Div>
    </>
  );
}

const Wrapper = styled("div")`
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-auto-rows: auto;
  align-items: center;
  gap: 20px;

  #taskname {
    background-color: yellow;
  }

  #state {
  }

  #error {
    background-color: green;
    grid-column: 1 / -1;
  }
`;

const Div = styled("div")`
  max-width: 600px;
  margin: auto;
`;

export { PageScratch };
