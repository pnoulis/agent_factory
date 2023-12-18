import * as React from "react";
import { Outlet } from "react-router-dom";
import { FlashMessages } from "../components/flash-messages/FlashMessages.jsx";
import { uuid } from "js_utils/uuid";
import { FM_TIMEOUT } from "../constants.js";

const Context = React.createContext(null);

function Afmachine() {
  const [ctx, setCtx] = React.useState({});
  const [fms, setfms] = React.useState([]);

  function addFm(msg, type) {
    setfms(fms.concat([{ msg, type, timeout: Date.now() + FM_TIMEOUT }]));
  }

  return (
    <Context.Provider value={ctx}>
      <Outlet />
      <button onClick={() => addFm(uuid(), "error")}>add fm</button>
      <FlashMessages fms={fms} setfms={setfms} />
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
