import styled from "styled-components";
import { DialogAlert } from "./DialogAlert.jsx";
import { Heading } from "./Heading.jsx";
import { Description } from "./Description.jsx";
import { renderDialog } from "../renderDialog.jsx";
import { DialogAlertWrapper } from "./DialogAlertWrapper.jsx";
import { DialogAlertStandard } from "./DialogAlertStandard.jsx";

function AlertRegisterTeamUnpairedWristbands({ id, onClose, unpairedPlayers }) {
  return (
    <ThisDialog initialOpen id={id} onClose={onClose}>
      <Heading>register team</Heading>
      <div className="description">
        <h4 className="subheading">Players missing wristbands</h4>
        <ul className="content">
          {unpairedPlayers.map((player, i) => (
            <li key={player.username + i}>{player.username}</li>
          ))}
        </ul>
      </div>
    </ThisDialog>
  );
}

const ThisDialog = styled(DialogAlertStandard)`
  .subheading {
    color: var(--primary-base);
    margin-bottom: 10px;
  }

  .content {
    display: flex;
    flex-flow: column nowrap;
    gap: 15px;
    justify-content: center;
  }
`;

export { AlertRegisterTeamUnpairedWristbands };
