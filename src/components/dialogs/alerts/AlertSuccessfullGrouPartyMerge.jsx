import styled from "styled-components";
import { Heading } from "./Heading.jsx";
import { DialogAlertStandard } from "./DialogAlertStandard.jsx";

function AlertSuccessfullGrouPartyMerge({ id, onClose, teams }) {
  return (
    <ThisDialog initialOpen id={id} onClose={onClose}>
      <Heading>merge group party</Heading>
      <div className="description">
        <h4 className="subheading">Successfully registered group teams</h4>
        <ul className="content">
          {teams.map((team, i) => (
            <li key={team.name + i}>{team.name}</li>
          ))}
        </ul>
      </div>
    </ThisDialog>
  );
}

const ThisDialog = styled(DialogAlertStandard)`
  .subheading {
    margin-bottom: 10px;
  }

  .content {
    display: flex;
    flex-flow: column nowrap;
    gap: 15px;
    justify-content: center;
    color: var(--primary-base);
  }
`;

export { AlertSuccessfullGrouPartyMerge };
