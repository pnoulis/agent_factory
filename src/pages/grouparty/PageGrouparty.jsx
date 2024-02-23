import * as React from "react";
import styled from "styled-components";
import { Panel } from "#components/panel/Panel.jsx";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import { PanelButton } from "#components/buttons/PanelButton.jsx";
import IconGrouparty from "/assets/icons/players-three.svg?react";
import IconAddTeam from "/assets/icons/add-team.svg?react";
import IconRegister from "/assets/icons/merge.svg?react";
import IconDistribute from "/assets/icons/distribute.svg?react";
import { useContextApp } from "/src/contexts/ContextApp";
import { Center } from "#components/Center.jsx";
import { TeamActionCard } from "#components/team/TeamActionCard.jsx";
import { useRegistrationQueue } from "#components/registration-queue/useRegistrationQueue.jsx";
import { getGrouPartySize } from "#components/dialogs/inputs/getGrouPartySize.jsx";
import { distributePlayers } from "../../misc/misc.js";
import { getGrouPartyDistribution } from "#components/dialogs/inputs/getGrouPartyDistribution.jsx";
import { renderDialog } from "#components/dialogs/renderDialog.jsx";
import { FormGrouPartySize } from "#components/forms/FormGrouPartySize.jsx";
import { DialogInputStandard } from "#components/dialogs/inputs/DialogInputStandard.jsx";
import { DialogAlertStandard } from "#components/dialogs/alerts/DialogAlertStandard.jsx";
import { MAX_ROSTER_SIZE } from "../../constants.js";
import { confirmRegisterGroupTeam } from "#components/dialogs/confirms/confirmRegisterGroupTeam.jsx";
import { Player } from "#afm/player/Player.js";
import { GrouPartyTeam } from "#afm/grouparty/GrouPartyTeam.js";
import { GrouPartyPlayer } from "#afm/grouparty/GrouPartyPlayer.js";
import { GrouPartyWristband } from "#afm/grouparty/GrouPartyWristband.js";
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
  const { t } = useContextApp();
  const { queue, setQueue, enqueue, dequeue, pairWristband, unpairWristband } =
    useRegistrationQueue();
  const gpRef = React.useRef([]);

  async function onDistributionClick() {
    const distribution = await getGrouPartyDistribution();
    distribute(queue.length, distribution);
  }

  function distribute(size, ratio) {
    if (!size) {
      return renderDialog(
        <DialogAlertStandard
          initialOpen
          heading="Distribute players"
          msg="Group party is empty!"
        />,
      );
    }
    debug(size, ratio, "size + ratio");
    const distribution = distributePlayers(parseInt(size), parseInt(ratio));
    debug(distribution, "distribution");
    const oldPlayers = gpRef.current.map((team) => team.roster).flat();
    const newPlayers = [];
    gpRef.current = distribution.map((players, i) => {
      const team = createTeam({ name: gpRef.current[i]?.name });
      for (let y = 0; y < players.length; y++) {
        team._roster[y] =
          oldPlayers.shift() ||
          newPlayers[newPlayers.push(createPlayer().fill()) - 1];
      }
      return team;
    });
    debug(newPlayers, "enqueue new players");
    enqueue(...newPlayers);
  }

  function createGroupParty(fields) {
    const { partysize, distribution } = fields;
    if (!partysize) {
      return renderDialog(
        <DialogAlertStandard
          initialOpen
          heading="Create group party"
          msg="Group party is empty!"
        />,
      );
    }
    // gpRef.current = [];
    distribute(partysize, distribution);
  }

  const addTeam = () => {
    const team = createTeam();
    for (let i = 0; i < MAX_ROSTER_SIZE; i++) {
      team.addPlayer(Player.random());
    }
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
  const addPlayer = (team) => {
    teamReact.addPlayer(team, createPlayer().fill(), (team, player) => {
      team._roster.push(player);
      enqueue(player);
    });
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

  const registerGpTeam = async () => {
    // const ready = [];
    // const unready = [];
    // for (let i = 0; i < gpRef.current.length; i++) {
    //   let y = 0;
    //   for (; y < gpRef.current[i].roster.length; y++) {
    //     if (!gpRef.current[i].roster[y].inState("paired")) break;
    //   }

    //   if (y === gpRef.current[i].roster.length) {
    //     ready.push(gpRef.current[i]);
    //   } else {
    //     unready.push(gpRef.current[i]);
    //   }
    // }

    // if (!ready.length) {
    //   return renderDialog(
    //     <DialogAlertStandard
    //       initialOpen
    //       heading="merge group party team"
    //       msg="Waiting for wristband registration!"
    //     />,
    //   );
    // }

    const ready = [];
    for (const team of gpRef.current) {
      teamReact.register(team, () => {
        ready.push(team);
      });
    }
    if (!ready.length) return;
    const yes = await confirmRegisterGroupTeam(ready);
    if (!yes) return;
    await Promise.all(ready.map((team) => team.register()));
  };

  return (
    <Panel>
      <PanelActionbar>
        <PanelNavbar as="section">
          <PanelButton.Button
            onClick={async () => {
              const gp = await getGrouPartySize();
              createGroupParty(gp);
            }}
          >
            <PanelButton.Icon>
              <IconGrouparty />
            </PanelButton.Icon>
            <PanelButton.Text>{t("new group party")}</PanelButton.Text>
          </PanelButton.Button>
          <PanelButton.Button onClick={addTeam}>
            <PanelButton.Icon>
              <IconAddTeam />
            </PanelButton.Icon>
            <PanelButton.Text>{t("add team")}</PanelButton.Text>
          </PanelButton.Button>
          <PanelButton.Button onClick={registerGpTeam}>
            <PanelButton.Icon>
              <IconRegister />
            </PanelButton.Icon>
            <PanelButton.Text>{t("merge")}</PanelButton.Text>
          </PanelButton.Button>
          <PanelButton.Button onClick={onDistributionClick}>
            <PanelButton.Icon>
              <IconDistribute />
            </PanelButton.Icon>
            <PanelButton.Text>{t("distribute")}</PanelButton.Text>
          </PanelButton.Button>
        </PanelNavbar>
      </PanelActionbar>
      <Center>
        {queue.length < 1 && (
          <DialogInputStandard
            initialOpen
            heading="new group party"
            form="form-grouPartySize"
            onClose={createGroupParty}
          >
            {(closeDialog) => (
              <FormGrouPartySize
                placeholder={6}
                onSubmit={({ fields }) => {
                  closeDialog(fields);
                }}
              />
            )}
          </DialogInputStandard>
        )}
        <Page>
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
        </Page>
      </Center>
    </Panel>
  );
}

const Button = styled("button")`
  width: 300px;
  height: 100px;
  background-color: blue;
`;

const Page = styled("div")`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1310px;
  grid-auto-rows: minmax(250px, min-content);
  justify-content: center;
  align-content: start;
  gap: 40px;
  padding: 20px;
`;

export { Component };
