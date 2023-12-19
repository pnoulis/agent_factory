import * as React from "react";
import { Outlet } from "react-router-dom";
import { FlashMessages } from "./components/flash-messages/FlashMessages.jsx";
import { uuid } from "js_utils/uuid";
import { FM_TIMEOUT } from "./constants.js";
import { RenderDialogs } from "./components/dialogs/RenderDialogs.jsx";
import { StandardAlertDialog } from "./components/dialogs/alerts/StandardAlertDialog.jsx";
import { isFunction } from "js_utils/misc";
import { PlayerInfoCard } from "./components/player/PlayerInfoCard.jsx";
import { ProvidePlayer } from "./components/player/ProvidePlayer.jsx";
import { ProvideWristband } from "./components/wristband/ProvideWristband.jsx";
import { WristbandInfoCard } from "./components/wristband/WristbandInfoCard.jsx";
import { WidgetWristband } from "./components/widgets/WidgetWristband.jsx";
import { WidgetAdd } from "./components/widgets/WidgetAdd.jsx";
import { PlayerActionCard } from "./components/player/PlayerActionCard.jsx";
import { ContextApp } from "./contexts/ContextApp.jsx";
import { BackendRegistration } from "./backend/registration/BackendRegistration.js";

const backend = new BackendRegistration();
backend.boot();

function App() {
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
    <ContextApp ctx={ctx}>
      <button onClick={() => addFm(uuid(), "error")}>add fm</button>
      <button
        style={{ display: "block" }}
        onClick={() =>
          addDialog(StandardAlertDialog, { msg: "hello", title: "world" })
        }
      >
        add dialog
      </button>
      <Outlet />
      <FlashMessages fms={fms} setfms={setfms} />
      <RenderDialogs dialogs={dialogs} />
    </ContextApp>
  );
}

export { App };
