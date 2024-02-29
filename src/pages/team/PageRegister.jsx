import * as React from "react";
import styled from "styled-components";
import { Panel } from "#components/panel/Panel.jsx";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import { RegistrationQueue } from "#components/registration-queue/RegistrationQueue.jsx";
import { AwaitPlayersWithWristband } from "../../loaders/loadPlayersWithWristband.jsx";
import { ComboboxSelectPlayer } from "#components/comboboxes/ComboboxSelectPlayer.jsx";
import { generateRandomName } from "js_utils/misc";
import { useRegistrationQueue } from "#components/registration-queue/useRegistrationQueue.jsx";
import { FormTeamName } from "#components/forms/FormTeamName.jsx";
import { TeamCommander } from "#afm/team/TeamCommander.js";
import { PlayerCommander } from "#afm/player/PlayerCommander.js";
import { WristbandCommander } from "#afm/wristband/WristbandCommander.js";
import { StandardPlayerActionCard } from "#components/player/StandardPlayerActionCard.jsx";
import { StandardPlayerFiller } from "#components/player/StandardPlayerFiller.jsx";
import { MAX_ROSTER_SIZE } from "../../constants.js";
import { WidgetMerge } from "#components/widgets/WidgetMerge.jsx";
import { team as teamController } from "/src/controllers/team.js";
import { renderDialog } from "#components/dialogs/renderDialog.jsx";
import { DialogAlertStandard } from "#components/dialogs/alerts/DialogAlertStandard.jsx";
import { ViewCommand } from "#components/await-command/ViewCommand.jsx";
import { useRevalidator } from "react-router-dom";
import { confirmRegisterTeam } from "#components/dialogs/confirms/confirmRegisterTeam.jsx";

const createTeam = (team) =>
  new TeamCommander(
    team,
    (player, wristband) => new PlayerCommander(player, wristband),
    (wristband) => new WristbandCommander(wristband),
  );

const createPlayer = (player, wristband) =>
  new PlayerCommander(player, new WristbandCommander(wristband));

function Component() {
  const [randomTeamName, setRandom] = React.useState(
    generateRandomName().toLowerCase(),
  );
  const { queue, setQueue, enqueue, dequeue, pairWristband, unpairWristband } =
    useRegistrationQueue();
  const teamRef = React.useRef({});
  const revalidator = useRevalidator();

  function reset() {
    setQueue([]);
    setRandom(generateRandomName().toLowerCase());
  }
  const setTeamName = (name) => (teamRef.current.name = name);
  const addPlayer = (player) => {
    try {
      teamController.addPlayer({ roster: queue }, player);
      enqueue(createPlayer(player, player.wristband));
    } catch (err) {
      renderDialog(
        <DialogAlertStandard
          initialOpen
          heading="add player"
          msg={err.message}
        />,
      );
    }
  };
  const removePlayer = (player) => {
    dequeue(player);
  };
  const merge = async () => {
    try {
      const team = teamController.register(
        createTeam({ ...teamRef.current, roster: queue }),
      );
      if (await confirmRegisterTeam(team)) {
        team.register();
      }
    } catch (err) {
      renderDialog(
        <DialogAlertStandard
          initialOpen
          heading="merge team"
          msg={err.message}
        />,
      );
    }
  };

  return (
    <ViewCommand
      onFulfilled={() => {
        revalidator.revalidate();
      }}
      onSettled={(cmd) => {
        renderDialog(
          <DialogAlertStandard
            initialOpen
            heading={cmd.verb}
            msg={getMsg(cmd)}
          />,
        );
      }}
      noRejected
      noFulfilled
      cmd={afm.deregisterWristband}
    >
      <ViewCommand
        onFulfilled={() => {
          revalidator.revalidate();
        }}
        onSettled={(cmd) => {
          renderDialog(
            <DialogAlertStandard
              initialOpen
              heading={cmd.verb}
              msg={getMsg(cmd)}
            />,
          );
        }}
        noRejected
        noFulfilled
        cmd={afm.registerWristband}
      >
        <ViewCommand
          onFulfilled={(cmd) => {
            reset();
            revalidator.revalidate();
          }}
          onSettled={(cmd) => {
            renderDialog(
              <DialogAlertStandard
                initialOpen
                heading={cmd.verb}
                msg={getMsg(cmd)}
              />,
            );
          }}
          noRejected
          noFulfilled
          cmd={afm.registerTeam}
        >
          <Page className="page-register-team">
            <Panel className="panel-register-team">
              <PanelActionbar>
                <PanelNavbar>
                  <WidgetMerge
                    color="var(--primary-base)"
                    fill="white"
                    content="merge group party"
                    onClick={merge}
                  />
                </PanelNavbar>
              </PanelActionbar>
              <Content className="content-register-team">
                <section>
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
                          labelledBy="combobox-select-player-all"
                          players={players}
                          onSelect={addPlayer}
                        />
                      </>
                    )}
                  </AwaitPlayersWithWristband>
                </section>
                <section>
                  <Label htmlFor="form-teamName">team name</Label>
                  <FormTeamName
                    randomTeamName={randomTeamName}
                    onChange={({ fields }) => {
                      setTeamName(fields.teamName || fields.randomTeamName);
                    }}
                  />
                </section>
                <section>
                  <RegistrationQueue style={{ alignContent: "center" }}>
                    {queue.map((p, i) => {
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
                    {queue.length < MAX_ROSTER_SIZE &&
                      new Array(MAX_ROSTER_SIZE - queue.length)
                        .fill(null)
                        .map((_, i) => (
                          <StandardPlayerFiller
                            key={i}
                            value={`player #${queue.length + i + 1}`}
                          />
                        ))}
                  </RegistrationQueue>
                </section>
              </Content>
            </Panel>
          </Page>
        </ViewCommand>
      </ViewCommand>
    </ViewCommand>
  );
}

const Page = styled("div")`
  width: 100%;
  height: 100%;
  padding: 40px 20px 20px 20px;
  .panel-register-team {
    gap: 20px;
  }

  nav {
    padding: 0 20px;
    justify-content: center;
  }
  nav .widget {
    height: 60px;
    width: 60px;
  }
`;
const Content = styled("div")`
  width: 100%;
  height: 100%;
  padding: 40px 40px 20px 40px;

  display: grid;
  grid-template-columns: 1fr 650px;
  grid-template-rows: 100px 1fr;
  width: 100%;
  height: 100%;
  padding: 20px;
  align-content: end;
  justify-content: space-between;
  gap: 70px;

  section:nth-of-type(1) {
    grid-row: 1 / span 2;
    width: 500px;

    #select-player-listbox {
      margin-left: 100px;
      margin-top: 55px;
      max-height: 600px;
    }
  }

  section:nth-of-type(2) {
    width: 500px;
    margin-left: auto;
  }

  section:nth-of-type(3) {
  }
`;
const Label = styled("label")`
  color: var(--primary-base);
  font-size: var(--tx-xxh);
  letter-spacing: 1.5px;
  text-transform: capitalize;
  letter-spacing: 2px;
`;

export { Component };
