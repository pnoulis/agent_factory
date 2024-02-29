import * as React from "react";
import { ContextWristband } from "../../contexts/ContextWristband.jsx";
import { Wristband } from "../../afmachine/wristband/Wristband.js";

function ProvideWristband({ wristband, children, fill }) {
  wristband ??= fill
    ? Wristband.random(wristband, { state: "paired" })
    : wristband;
  return (
    <ContextWristband ctx={wristband}>
      {React.isValidElement(children) ? children : children(wristband)}
    </ContextWristband>
  );
}

export { ProvideWristband };
