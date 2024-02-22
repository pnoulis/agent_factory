import * as React from "react";
import styled from "styled-components";
import { Panel } from "#components/panel/Panel.jsx";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import { PanelButton } from "#components/buttons/PanelButton.jsx";
import IconRegister from "/assets/icons/merge.svg?react";
import { useContextApp } from "/src/contexts/ContextApp";
import { MAX_ROSTER_SIZE } from "../../constants.js";
import { RegistrationQueue } from "#components/registration-queue/RegistrationQueue.jsx";
import { AwaitPlayersWithWristband } from "../../loaders/loadPlayersWithWristband.jsx";
import { Team } from "#afm/team/Team.js";
import { StandardPlayerActionCard } from "#components/player/StandardPlayerActionCard.jsx";
import { StandardPlayerFiller } from "#components/player/StandardPlayerFiller.jsx";
import { FormTeamName } from "#components/forms/FormTeamName.jsx";
import { ComboboxSelectPlayer } from "#components/comboboxes/ComboboxSelectPlayer.jsx";
import { Center } from "#components/Center.jsx";
import { DialogAlertStandard } from "#components/dialogs/alerts/DialogAlertStandard.jsx";
import { renderDialog } from "#components/dialogs/renderDialog.jsx";
import { useTeam } from "#components/team/useTeam.jsx";
import { AwaitCommand2 } from "#components/await-command/AwaitCommand2.jsx";

function Component() {
  const { t } = useContextApp();
  const team = useTeam();

  return (
    <Panel>
      <PanelActionbar>
        <PanelNavbar as="section">
          <PanelButton.Button onClick={team.register}>
            <PanelButton.Icon>
              <IconRegister />
            </PanelButton.Icon>
            <PanelButton.Text>{t("merge")}</PanelButton.Text>
          </PanelButton.Button>
        </PanelNavbar>
      </PanelActionbar>
      <AwaitCommand2
        revalidate
        cmd={afm.registerTeam}
        onRejected={(cmd) => {
          renderDialog(
            <DialogAlertStandard
              initialOpen
              heading="register team"
              msg={cmd.msg}
            />,
          );
          team.reset();
        }}
        onFulfilled={(cmd) => {
          renderDialog(
            <DialogAlertStandard
              initialOpen
              heading="register team"
              msg={cmd.msg}
            />,
          );
          team.reset();
        }}
      >
        <Center>
          <Page>
            <section>
              <AwaitCommand2 revalidate cmd={afm.registerWristband}>
                <AwaitCommand2 revalidate cmd={afm.deregisterWristband}>
                  <AwaitPlayersWithWristband>
                    {({ players }) => (
                      <>
                        <Label
                          id="combobox-select-player-label"
                          htmlFor="select-player-trigger"
                        >
                          add players
                        </Label>
                        <ComboboxSelectPlayer
                          players={players}
                          onSelect={team.addPlayer}
                        />
                      </>
                    )}
                  </AwaitPlayersWithWristband>
                </AwaitCommand2>
              </AwaitCommand2>
            </section>
            <section>
              <Label id="form-teamName-label" htmlFor="teamName">
                team name
              </Label>
              <FormTeamName
                onChange={({ form: { fields } }) => {
                  team.setName(fields.teamName || fields.randomTeamName);
                }}
              />
            </section>
            <section>
              <RegistrationQueue style={{ alignContent: "center" }}>
                {team.roster.map((p, i) => {
                  return (
                    <StandardPlayerActionCard
                      key={p.username + i}
                      value={`player #${i + 1}`}
                      ctx={p}
                      onPlayerRemove={team.removePlayer}
                      onWristbandPair={team.pairWristband}
                      onWristbandUnpair={team.unpairWristband}
                    />
                  );
                })}
                {team.roster.length < MAX_ROSTER_SIZE &&
                  new Array(MAX_ROSTER_SIZE - team.roster.length)
                    .fill(null)
                    .map((_, i) => (
                      <StandardPlayerFiller
                        key={i}
                        value={`player #${team.roster.length + i + 1}`}
                      />
                    ))}
              </RegistrationQueue>
            </section>
          </Page>
        </Center>
      </AwaitCommand2>
    </Panel>
  );
}

const Label = styled("label")`
  color: var(--primary-base);
  font-size: var(--tx-xxh);
  letter-spacing: 1.5px;
  text-transform: capitalize;
  letter-spacing: 2px;
`;

const Page = styled("div")`
  display: grid;
  grid-template-columns: 1fr 650px;
  grid-template-rows: 100px 1fr;
  width: 100%;
  height: 100%;
  padding: 20px;
  align-content: end;
  justify-content: space-between;
  gap: 80px;

  section:nth-of-type(1) {
    grid-row: 1 / span 2;
    width: 500px;

    #select-player-listbox {
      margin-left: 100px;
    }
  }

  section:nth-of-type(2) {
    width: 500px;
    margin-left: auto;
  }

  section:nth-of-type(3) {
  }
`;

export { Component };
