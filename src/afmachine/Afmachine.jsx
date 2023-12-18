import * as React from "react";
import { Outlet } from "react-router-dom";
import { FlashMessages } from "../components/flash-messages/FlashMessages.jsx";
import { uuid } from "js_utils/uuid";
import { FM_TIMEOUT } from "../constants.js";
import { RenderDialogs } from "../components/dialogs/RenderDialogs.jsx";
import { StandardAlertDialog } from "../components/dialogs/alerts/StandardAlertDialog.jsx";
import { isFunction } from "js_utils/misc";
import { PlayerInfoCard } from "../components/player/PlayerInfoCard.jsx";
import { ProvidePlayer } from "../components/player/ProvidePlayer.jsx";
import { ProvideWristband } from "../components/wristband/ProvideWristband.jsx";
import { WristbandInfoCard } from "../components/wristband/WristbandInfoCard.jsx";
import { WidgetWristband } from "../components/widgets/WidgetWristband.jsx";
import { WidgetAdd } from "../components/widgets/WidgetAdd.jsx";
import { PlayerActionCard } from "../components/player/PlayerActionCard.jsx";

const Context = React.createContext(null);

function Afmachine() {
  const [ctx, setCtx] = React.useState({});
  const [fms, setfms] = React.useState([]);
  const [dialogs, setDialogs] = React.useState([]);

  function addFm(msg, type) {
    setfms(fms.concat([{ msg, type, timeout: Date.now() + FM_TIMEOUT }]));
  }

  function addDialog(Dialog, props = {}, handleClose) {
    setDialogs(
      dialogs.concat([
        {
          Dialog,
          props: {
            ...props,
            onClose: function (...args) {
              setDialogs(dialogs.slice(dialogs.length, 1));
              isFunction(handleClose) && handleClose(...args);
            },
          },
        },
      ]),
    );
  }

  return (
    <Context.Provider value={ctx}>
      <Outlet />
      <button onClick={() => addFm(uuid(), "error")}>add fm</button>
      <button
        style={{ display: "block" }}
        onClick={() =>
          addDialog(StandardAlertDialog, { msg: "hello", title: "world" })
        }
      >
        add dialog
      </button>
      <ProvidePlayer fill>
        <ProvideWristband fill>
          {/* <PlayerInfoCard /> */}
          <PlayerActionCard />
        </ProvideWristband>
      </ProvidePlayer>
      {/* <ProvideWristband fill> */}
      {/*   <WristbandInfoCard /> */}
      {/* </ProvideWristband> */}
      <FlashMessages fms={fms} setfms={setfms} />
      <RenderDialogs dialogs={dialogs} />
    </Context.Provider>
  );
}

function useContextAfmachine() {
  const ctx = React.useContext(Context);
  if (ctx == null) {
    throw new Error("<ProvideAfmachine/> missing");
  }
}

export { Afmachine, useContextAfmachine };
