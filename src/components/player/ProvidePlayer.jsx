import { ContextPlayer } from "../../contexts/ContextPlayer.jsx";

function ProvidePlayer({ player, children }) {
  return <ContextPlayer ctx={player}>{children}</ContextPlayer>;
}

export { ProvidePlayer };
