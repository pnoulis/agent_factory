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
import { FormTeamName } from "#components/forms/FormTeamName.jsx";
import { AwaitCommand } from "#components/await-command/AwaitCommand.jsx";
import { AwaitCommand2 } from "../../components/await-command/AwaitCommand2";
import { FormGrouPartySize } from "../../components/forms/FormGrouPartySize.jsx";
import { getGrouPartyDistribution } from "../../components/dialogs/inputs/getGrouPartyDistribution.jsx";
import { getGrouPartySize } from "../../components/dialogs/inputs/getGrouPartySize";
import { useTeam } from "#components/team/useTeam.jsx";
import { AwaitTeams } from "/src/loaders/loadTeams.jsx";

function PageScratch() {
  return (
    <>
      <h1>page scratch</h1>
      <div>
        <button
          onClick={() => {
            const body = document.getElementsByTagName("body");
            debug(body[0]);
            debug(body[0].style.pointerEvents);
            body[0].style.pointerEvents = "none";
            setTimeout(() => {
              debug(body[0].style.pointerEvents);
            }, 1000);
          }}
        >
          disable pointer events
        </button>
        <br />
        <button
          onClick={() => {
            const body = document.getElementsByTagName("body");
            debug(body[0]);
            body[0].style.pointerEvents = "auto";
          }}
        >
          enable pointer events
        </button>
        <br />
        <button onClick={() => alert("works")}>check button</button>
      </div>
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
  display: grid;
  grid-template-columns: 1fr 650px;
  grid-template-rows: 1fr;
  width: 90%;
  height: 100%;
  padding: 20px;
  gap: 80px;

  section:nth-of-type(1) {
    width: 500px;
  }

  section:nth-of-type(2) {
    align-self: end;
    width: 100%;
    height: 100%;
    max-width: 650px;
    max-height: 600px;
    justify-self: end;
  }
`;

export { PageScratch };
