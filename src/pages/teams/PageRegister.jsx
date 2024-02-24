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
import { StandardPlayerActionCard } from "#components/player/StandardPlayerActionCard.jsx";
import { StandardPlayerFiller } from "#components/player/StandardPlayerFiller.jsx";
import { FormTeamName } from "#components/forms/FormTeamName.jsx";
import { ComboboxSelectPlayer } from "#components/comboboxes/ComboboxSelectPlayer.jsx";
import { Center } from "#components/Center.jsx";
import { DialogAlertStandard } from "#components/dialogs/alerts/DialogAlertStandard.jsx";
import { renderDialog } from "#components/dialogs/renderDialog.jsx";
import { AwaitCommand2 } from "#components/await-command/AwaitCommand2.jsx";
import { TeamCommander } from "#afm/team/TeamCommander.js";
import { PlayerCommander } from "#afm/player/PlayerCommander.js";
import { WristbandCommander } from "#afm/wristband/WristbandCommander.js";
import { teamReact } from "#afm/team/TeamReact.jsx";
import { generateRandomName } from "js_utils/misc";
import { useRegistrationQueue } from "#components/registration-queue/useRegistrationQueue.jsx";

const createTeam = (team) =>
  new TeamCommander(
    team,
    (player, wristband) => new PlayerCommander(player, wristband),
    (wristband) => new WristbandCommander(wristband),
  );

const createPlayer = (player, wristband) =>
  new PlayerCommander(player, new WristbandCommander(wristband));

function Component() {
  const { t } = useContextApp();
  const [randomTeamName, setRandom] = React.useState(generateRandomName());
  const {
    queue: roster,
    setQueue,
    enqueue,
    dequeue,
    pairWristband,
    unpairWristband,
  } = useRegistrationQueue();
  const teamRef = React.useRef(createTeam());

  function reset() {
    setQueue([]);
    setRandom(generateRandomName());
  }

  function setName(name) {
    teamRef.current.name = name;
  }

  function addPlayer(player) {
    teamReact.addPlayer(teamRef.current, player, (team, player) => {
      enqueue(createPlayer(player, player.wristband));
    });
  }
  function removePlayer(player) {
    dequeue(player);
  }
  function register() {
    teamRef.current._roster = roster;
    teamReact.register(teamRef.current, (team) => team.register());
  }

  return (
    <Panel>
      <PanelActionbar>
        <PanelNavbar as="section">
          <PanelButton.Button onClick={register}>
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
          reset();
        }}
        onFulfilled={(cmd) => {
          renderDialog(
            <DialogAlertStandard
              initialOpen
              heading="register team"
              msg={cmd.msg}
            />,
          );
          reset();
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
                          onSelect={addPlayer}
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
                randomTeamName={randomTeamName}
                onChange={({ fields }) => {
                  setName(fields.teamName || fields.randomTeamName);
                }}
              />
            </section>
            <section>
              <RegistrationQueue style={{ alignContent: "center" }}>
                {roster.map((p, i) => {
                  return (
                    <StandardPlayerActionCard
                      key={p.username + i}
                      value={`player #${i + 1}`}
                      ctx={p}
                      onPlayerRemove={removePlayer}
                      onWristbandPair={pairWristband}
                      onWristbandUnpair={unpairWristband}
                    />
                  );
                })}
                {roster.length < MAX_ROSTER_SIZE &&
                  new Array(MAX_ROSTER_SIZE - roster.length)
                    .fill(null)
                    .map((_, i) => (
                      <StandardPlayerFiller
                        key={i}
                        value={`player #${roster.length + i + 1}`}
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
