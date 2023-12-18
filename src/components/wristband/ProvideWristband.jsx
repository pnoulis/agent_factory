import * as React from "react";
import { ContextWristband } from "../../contexts/ContextWristband.jsx";
import { Wristband } from "../../wristband/Wristband.js";

function ProvideWristband({ wristband, children, fill }) {
  const [_wristband, setWristband] = React.useState(
    () => new Wristband(fill ? Wristband.random(wristband) : wristband),
  );
  return <ContextWristband ctx={_wristband}>{children}</ContextWristband>;
}

export { ProvideWristband };
