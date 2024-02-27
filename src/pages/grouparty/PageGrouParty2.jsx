import * as React from "react";
import { Panel } from "#components/panel/Panel.jsx";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import styled from "styled-components";
import { GrouPartySize } from "./PageGrouPartySize.jsx";
import { WidgetAdd } from "#components/widgets/WidgetAdd.jsx";
import { WidgetMerge } from "#components/widgets/WidgetMerge.jsx";
import { WidgetDistribute } from "#components/widgets/WidgetDistribute.jsx";
import { WidgetGrouParty } from "#components/widgets/WidgetGrouParty.jsx";
import { useRegistrationQueue } from "#components/registration-queue/useRegistrationQueue.jsx";
import { distributePlayers } from "../../misc/misc.js";
import { GrouPartyTeam } from "#afm/grouparty/GrouPartyTeam.js";
import { GrouPartyPlayer } from "#afm/grouparty/GrouPartyPlayer.js";
import { GrouPartyWristband } from "#afm/grouparty/GrouPartyWristband.js";
import { TeamActionCard } from "#components/team/TeamActionCard.jsx";
import { teamReact } from "#afm/team/TeamReact.jsx";
import { MAX_ROSTER_SIZE } from "../../constants.js";
import { getGrouPartyDistribution } from "#components/dialogs/inputs/getGrouPartyDistribution.jsx";
import { renderDialog } from "#components/dialogs/renderDialog.jsx";
import { DialogAlertStandard } from "#components/dialogs/alerts/DialogAlertStandard.jsx";
import { AlertSuccessfullGrouPartyMerge } from "../../components/dialogs/alerts/AlertSuccessfullGrouPartyMerge.jsx";
import { Overflow } from "#components/Overflow.jsx";
import { confirmRegisterGrouParty } from "#components/dialogs/confirms/confirmRegisterGrouParty.jsx";

const createTeam = (team) =>
  new GrouPartyTeam(
    team,
    (player, wristband) => new GrouPartyPlayer(player, wristband),
    (wristband) => new GrouPartyWristband(wristband),
  );

const createPlayer = (player, wristband) =>
  new GrouPartyPlayer(player, new GrouPartyWristband(wristband));

function Component() {
  const { queue, setQueue, enqueue, dequeue, pairWristband, unpairWristband } =
    useRegistrationQueue();
  const gpRef = React.useRef([]);

  const addTeam = () => {
    const team = createTeam().fill(null, {
      players: MAX_ROSTER_SIZE,
      wristband: { state: "unpaired" },
    });
    gpRef.current.push(team);
    enqueue(...team.roster);
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
  };
  const addPlayer = (team) => {
    teamReact.addPlayer(team, createPlayer().fill(), (team, player) => {
      team._roster.push(player);
      enqueue(player);
    });
  };

  function distribute(size, ratio) {
    debug(`size: ${size}`);
    debug(`ratio: ${ratio}`);
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
    debug(registeredTeams, "registered teams");
    debug(unregisteredTeams, "unregistered teams");
    debug(unregisteredPlayers, "unregistered players");
    debug(sizeToDistribute, "size to distribute");
    debug(distribution, "distribution");
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
    debug(newPlayers, "enqueue new players");
    debug(gpRef.current, " new gp ref current");
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
        teamReact.register(team);
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
          msg="No ready teams!"
        />,
      );
    }
    alert("i will register");
    // try {
    //   registered = await Promise.all(ready.map((team) => team.register()));
    // } catch (err) {
    // } finally {
    //   renderDialog(<AlertSuccessfullGrouPartyMerge teams={registered} />);
    // }
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
              />
            </ThisPanelNavbar>
          </PanelActionbar>
          <Content>
            <Overflow>
              <List>
                {gpRef.current.map((team, i) => (
                  <ListItem key={team.name + i}>
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
  flex-flow: column-reverse nowrap;
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
