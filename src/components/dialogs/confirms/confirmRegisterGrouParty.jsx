import { DialogConfirm } from "./DialogConfirm.jsx";
import { DialogConfirmStandard } from "./DialogConfirmStandard.jsx";
import { Yes } from "./Yes.jsx";
import { No } from "./No.jsx";
import { ButtonDialog } from "#components/buttons/ButtonDialog.jsx";
import { renderDialog } from "../renderDialog.jsx";
import styled from "styled-components";
import { Heading } from "./Heading.jsx";

function confirmRegisterGrouParty(ready, notReady) {
  return new Promise((resolve, reject) => {
    try {
      renderDialog(
        <ThisDialogConfirm initialOpen onClose={resolve}>
          <Heading>Merge group party</Heading>
          <Content>
            <ReadyTeams>
              <ContentHeading>Ready teams</ContentHeading>
              <List>
                {ready.length ? (
                  ready.map((team, i) => <li key={i}>{team.name}</li>)
                ) : (
                  <li>-</li>
                )}
              </List>
            </ReadyTeams>
            {notReady.length && (
              <NotReadyTeams>
                <ContentHeading>Not ready teams</ContentHeading>
                <List>
                  {notReady.map(({ team, err }, i) => (
                    <li key={i}>
                      <span>{team.name}</span>
                      <span>{err.message}</span>
                    </li>
                  ))}
                </List>
              </NotReadyTeams>
            )}
          </Content>
          <div className="actions">
            <No>cancel</No>
            <Yes>merge ready teams</Yes>
          </div>
        </ThisDialogConfirm>,
      );
    } catch (err) {
      reject(err);
    }
  });
}

const ThisDialogConfirm = styled(DialogConfirm)`
  box-sizing: content-box;
  display: flex;
  flex-flow: column nowrap;
  padding: 20px 35px;
  z-index: 4;
  gap: 15px 20px;
  padding: 20px 35px;
  border: none;
  box-shadow: var(--sd-9);
  text-align: center;

  .heading {
    text-transform: uppercase;
    color: var(--primary-base);
    letter-spacing: 1px;
    font-weight: 550;
  }

  .actions {
    margin-top: 20px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    gap: 30px;
  }
  .confirm {
    ${ButtonDialog}
  }

  .close {
    ${ButtonDialog}
  }
`;

const Content = styled("div")`
  display: flex;
  flex-flow: column nowrap;
  gap: 20px;

  section {
    flex: 1;
    display: flex;
    flex-flow: column nowrap;
    gap: 20px;
  }
`;

const ContentHeading = styled("h1")`
  font-size: var(--tx-md);
  letter-spacing: 1.5px;
  text-transform: capitalize;
  letter-spacing: 2px;
  border-bottom: 2px solid var(--grey-medium);
  padding-bottom: 2px;
`;

const List = styled("ul")`
  display: flex;
  flex-flow: column nowrap;
  gap: 5px;
  font-size: var(--tx-sm);
`;

const NotReadyTeams = styled("section")`
  span:nth-of-type(1) {
    justify-self: start;
  }
  span:nth-of-type(1)::after {
    content: ":";
    margin: 0 3px 0 5px;
    font-weight: 600;
  }

  span:nth-of-type(2) {
    color: var(--error-base);
    justify-self: end;
  }

  li {
    padding: 0 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: max-content;
  }
`;

const ReadyTeams = styled("section")`
  li {
    padding: 0 10px;
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: max-content;
  }
`;

export { confirmRegisterGrouParty };
