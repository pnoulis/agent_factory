import { ContextWristband } from "../../contexts/ContextWristband.jsx";

function ProvideWristband({ wristband, children }) {
  return <ContextWristband ctx={wristband}>{children}</ContextWristband>;
}

export { ProvideWristband };
