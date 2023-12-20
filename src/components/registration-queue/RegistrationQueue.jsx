import styled from "styled-components";
import { ListPlayers } from "./ListPlayers.jsx";

function RegistrationQueue({ players, renderPlayer, className }) {
  return (
    <ListPlayers className={className}>
      {players.map((p, i) =>
        renderPlayer({ key: i, index: i, player: p, forwardedAs: "li" }),
      )}
    </ListPlayers>
  );
}

export { RegistrationQueue };
