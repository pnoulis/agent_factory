import { DialogConfirmStandard } from "./DialogConfirmStandard.jsx";
import { renderDialog } from "../renderDialog.jsx";
import styled from "styled-components";

function confirmRegisterGrouParty(ready, notReady) {
  return new Promise((resolve, reject) => {
    try {
      renderDialog(
        <DialogConfirmStandard
          initialOpen
          heading="Merge group party?"
          onClose={resolve}
          yes="Merge ready teams"
        >
          <Content>
            <ReadyTeams>
              <Heading>Ready teams</Heading>
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
                <Heading>Not ready teams</Heading>
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
        </DialogConfirmStandard>,
      );
    } catch (err) {
      reject(err);
    }
  });
}

const Content = styled("div")`
  display: flex;
  flex-flow: column nowrap;
  gap: 20px;

  section {
    flex: 1;
    width: 400px;
    display: flex;
    flex-flow: column nowrap;
    gap: 20px;
  }
`;

const Heading = styled("h1")`
  font-size: var(--tx-md);
  letter-spacing: 1.5px;
  text-transform: capitalize;
  letter-spacing: 2px;
  border-bottom: 2px solid black;
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
