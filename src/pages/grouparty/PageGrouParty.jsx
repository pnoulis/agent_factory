import * as React from "react";
import { Panel } from "../../components/panel/Panel.jsx";
import { PanelActionbar } from "../../components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "../../components/panel/PanelNavbar.jsx";
import styled from "styled-components";
import { GrouPartySize } from "./PageGrouPartySize.jsx";
import { WidgetAdd } from "../../components/widgets/WidgetAdd.jsx";
import { WidgetMerge } from "../../components/widgets/WidgetMerge.jsx";
import { WidgetDistribute } from "../../components/widgets/WidgetDistribute.jsx";
import { WidgetGrouParty } from "../../components/widgets/WidgetGrouParty.jsx";
import { useRegistrationQueue } from "../../components/registration-queue/useRegistrationQueue.jsx";
import { distributePlayers } from "../../misc/misc.js";
import { GrouPartyTeam } from "../../afmachine/grouparty/GrouPartyTeam.js";
import { GrouPartyPlayer } from "../../afmachine/grouparty/GrouPartyPlayer.js";
import { GrouPartyWristband } from "../../afmachine/grouparty/GrouPartyWristband.js";
import { TeamActionCard } from "../../components/team/TeamActionCard.jsx";
import { MAX_ROSTER_SIZE } from "../../constants.js";
import { getGrouPartyDistribution } from "../../components/dialogs/inputs/getGrouPartyDistribution.jsx";
import { renderDialog } from "../../components/dialogs/renderDialog.jsx";
import { DialogAlertStandard } from "../../components/dialogs/alerts/DialogAlertStandard.jsx";
import { AlertSuccessfullGrouPartyMerge } from "../../components/dialogs/alerts/AlertSuccessfullGrouPartyMerge.jsx";
import { Overflow } from "../../components/Overflow.jsx";
import { confirmRegisterGrouParty } from "../../components/dialogs/confirms/confirmRegisterGrouParty.jsx";
import { team as teamController } from "/src/controllers/team.js";

const createTeam = (team) =>
  new GrouPartyTeam(
    team,
    (player, wristband) => new GrouPartyPlayer(player, wristband),
    (wristband) => new GrouPartyWristband(wristband),
  );

const createPlayer = (player, wristband) =>
  new GrouPartyPlayer(player, new GrouPartyWristband(wristband));

function Component() {
  const { queue, enqueue, dequeue, pairWristband, unpairWristband } =
    useRegistrationQueue();
  const gpRef = React.useRef([]);

  const newGrouParty = () => {
    dequeue(...queue);
    gpRef.current = [];
  };

  const addTeam = () => {
    const team = createTeam().fill(null, {
      players: MAX_ROSTER_SIZE,
      wristband: { state: "unpaired" },
    });
    team.order = -gpRef.current.length;
    gpRef.current.push(team);
    enqueue(...team.roster);
    pairWristband(team.roster.at(0));
  };

  const removeTeam = (team) => {
    const newgp = [];
    for (let i = 0; i < gpRef.current.length; i++) {
      if (gpRef.current[i] === team) continue;
      newgp.push(gpRef.current[i]);
    }
    gpRef.current = newgp;
    dequeue(...team.roster);
  };

  const removePlayer = (team, player) => {
    try {
      teamController.removePlayer(team, player);
      team.removePlayer(player);
      if (!team.roster.length) {
        const newgp = [];
        for (let i = 0; i < gpRef.current.length; i++) {
          if (gpRef.current[i] !== team) {
            newgp.push(gpRef.current[i]);
          }
        }
        gpRef.current = newgp;
      }
      dequeue(player);
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
  const addPlayer = (team) => {
    try {
      const player = teamController.addPlayer(team, createPlayer().fill());
      team._roster.push(player);
      enqueue(player);
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

  function distribute(size, ratio) {
    const registeredTeams = [];
    const unregisteredTeams = [];
    for (let i = 0; i < gpRef.current.length; i++) {
      if (gpRef.current[i].inState("registered")) {
        registeredTeams.push(gpRef.current[i]);
      } else {
        unregisteredTeams.push(gpRef.current[i]);
      }
    }
    const unregisteredPlayers = unregisteredTeams
      .map((team) => team.roster)
      .flat();
    const sizeToDistribute = size - (queue.length - unregisteredPlayers.length);
    const distribution = distributePlayers(
      parseInt(sizeToDistribute),
      parseInt(ratio),
    );
    const newPlayers = [];
    gpRef.current = distribution.map((players, i) => {
      const team = createTeam({ name: unregisteredTeams[i]?.name });
      let player;
      for (let y = 0; y < players.length; y++) {
        player = unregisteredPlayers.shift();
        if (!player) {
          player = createPlayer().fill();
          newPlayers.push(player);
        }
        team._roster[y] = player;
      }
      return team;
    });
    gpRef.current = gpRef.current.concat(registeredTeams);
    enqueue(...newPlayers);
  }

  async function onDistributionClick() {
    const distribution = await getGrouPartyDistribution();
    distribute(queue.length, distribution);
  }

  async function merge() {
    const notReady = [];
    const ready = [];
    for (const team of gpRef.current) {
      try {
        teamController.register(team);
        ready.push(team);
      } catch (err) {
        notReady.push({ team, err });
      }
    }
    if (!(await confirmRegisterGrouParty(ready, notReady))) {
      return;
    }
    if (!ready.length) {
      return renderDialog(
        <DialogAlertStandard
          initialOpen
          heading="merge group party"
          msg="Group party is not ready!"
        />,
      );
    }

    let registered;
    try {
      registered = await Promise.all(ready.map((team) => team.register()));
    } catch (err) {
    } finally {
      renderDialog(<AlertSuccessfullGrouPartyMerge teams={registered} />);
      if (registered.length === gpRef.current.length) {
        newGrouParty();
      }
    }
  }

  return (
    <Page className="page-grouparty">
      {!queue.length ? (
        <Content>
          <GrouPartySize
            onSubmit={({ fields, setForm }) => {
              distribute(fields.partysize, fields.distribution);
              setForm("reset");
            }}
          />
        </Content>
      ) : (
        <Panel className="panel-grouparty">
          <PanelActionbar>
            <ThisPanelNavbar>
              <WidgetAdd
                color="var(--primary-base)"
                fill="white"
                content="add team"
                onClick={addTeam}
              />
              <WidgetMerge
                color="var(--primary-base)"
                fill="white"
                content="merge group party"
                onClick={merge}
              />
              <WidgetDistribute
                color="var(--primary-base)"
                fill="white"
                content="distribute players"
                onClick={onDistributionClick}
              />
              <WidgetGrouParty
                color="var(--primary-base)"
                fill="white"
                content="new group party"
                onClick={newGrouParty}
              />
            </ThisPanelNavbar>
          </PanelActionbar>
          <Content>
            <Overflow>
              <List>
                {gpRef.current.map((team, i) => (
                  <ListItem
                    key={team.name + i}
                    style={{ order: team.order || gpRef.current.length }}
                  >
                    <TeamActionCard
                      team={team}
                      onTeamRemove={removeTeam}
                      onPlayerAdd={addPlayer}
                      onPlayerRemove={removePlayer}
                      onWristbandPair={pairWristband}
                      onWristbandUnpair={unpairWristband}
                    />
                  </ListItem>
                ))}
              </List>
            </Overflow>
          </Content>
        </Panel>
      )}
    </Page>
  );
}

const Page = styled("div")`
  width: 100%;
  height: 100%;
  padding: 60px 20px 20px 20px;
  .panel-grouparty {
    gap: 20px;
  }
`;
const Content = styled("div")`
  width: 100%;
  height: 100%;
  padding: 40px 40px 20px 40px;
`;

const List = styled("ul")`
  padding: 30px 20px 20px 0;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 60px;
`;

const ListItem = styled("li")`
  flex: 1 0 200px;
  width: 100%;
  max-width: 1350px;
`;

const ThisPanelNavbar = styled(PanelNavbar)`
  justify-content: center;
  gap: 40px;
  .widget {
    height: 60px;
    width: 60px;
  }
`;

export { Component };
