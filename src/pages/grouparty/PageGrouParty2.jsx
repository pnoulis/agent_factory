import * as React from "react";
import { Panel } from "#components/panel/Panel.jsx";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { groupartySize } from "/src/links.jsx";
import { GrouPartySize } from "./PageGrouPartySize.jsx";
import IconGrouparty from "/assets/icons/players-three.svg?react";
import IconAddTeam from "/assets/icons/add-team.svg?react";
import IconRegister from "/assets/icons/merge.svg?react";
import IconDistribute from "/assets/icons/distribute.svg?react";
import { WidgetAdd } from "#components/widgets/WidgetAdd.jsx";
import { WidgetMerge } from "#components/widgets/WidgetMerge.jsx";
import { WidgetDistribute } from "#components/widgets/WidgetDistribute.jsx";
import { WidgetGrouParty } from "#components/widgets/WidgetGrouParty.jsx";
import { useRegistrationQueue } from "#components/registration-queue/useRegistrationQueue.jsx";
import { distributePlayers } from "../../misc/misc.js";
import { Player } from "#afm/player/Player.js";
import { GrouPartyTeam } from "#afm/grouparty/GrouPartyTeam.js";
import { GrouPartyPlayer } from "#afm/grouparty/GrouPartyPlayer.js";
import { GrouPartyWristband } from "#afm/grouparty/GrouPartyWristband.js";
import { TeamActionCard } from "#components/team/TeamActionCard.jsx";
import { teamReact } from "#afm/team/TeamReact.jsx";

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
    const distribution = distributePlayers(parseInt(size), parseInt(ratio));
    const oldPlayers = gpRef.current.map((team) => team.roster).flat();
    debug(distribution, "distribution");
    const newPlayers = [];
    gpRef.current = distribution.map((players, i) => {
      const team = createTeam({ name: gpRef.current[i]?.name });
      for (let y = 0; y < players.length; y++) {
        const player = oldPlayers.shift() || createPlayer().fill();
        team._roster[y] = player;
        newPlayers.push(player);
      }
      return team;
    });
    debug(oldPlayers, "old players");
    debug(newPlayers, "enqueue new players");
    enqueue(...newPlayers);
  }

  return (
    <Page>
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
        <Panel>
          <PanelActionbar>
            <PanelNavbar>
              <WidgetAdd
                color="var(--primary-base)"
                fill="white"
                content="add team"
              />
              <WidgetMerge
                color="var(--primary-base)"
                fill="white"
                content="merge group party"
              />
              <WidgetDistribute
                color="var(--primary-base)"
                fill="white"
                content="distribute players"
              />
              <WidgetGrouParty
                color="var(--primary-base)"
                fill="white"
                content="new group party"
              />
            </PanelNavbar>
          </PanelActionbar>
          <Content>
            <List>
              {gpRef.current.map((team, i) => (
                <TeamActionCard
                  key={team.name + i}
                  team={team}
                  onTeamRemove={removeTeam}
                  onPlayerAdd={addPlayer}
                  onPlayerRemove={removePlayer}
                  onWristbandPair={pairWristband}
                  onWristbandUnpair={unpairWristband}
                />
              ))}
            </List>
          </Content>
        </Panel>
      )}
    </Page>
  );
}

const Page = styled("div")`
  width: 100%;
  height: 100%;
  padding: 40px 20px 20px 20px;
  .panel-grouparty {
    gap: 20px;
  }
`;
const Content = styled("div")`
  width: 100%;
  height: 100%;
  padding: 40px 40px 20px 40px;
`;

const List = styled("div")``;

export { Component };
