import * as React from "react";
import styled from "styled-components";
import { FormTeamName } from "../forms/FormTeamName.jsx";
import { WidgetAdd } from "../widgets/WidgetAdd.jsx";
import { WidgetRemove } from "../widgets/WidgetRemove.jsx";
import { ListPlayerActionCards } from "./ListPlayerActionCards.jsx";
import { StandardPlayerActionCard } from "../player/StandardPlayerActionCard.jsx";
import { useEntityState } from "../../hooks/useEntityState.jsx";
import { FollowState } from "../await-command/FollowState.jsx";
import { generateRandomName } from "js_utils";
import { DataTuple } from "#components/tuple/DataTuple.jsx";

function TeamActionCard({
  team,
  onTeamRemove,
  onPlayerAdd,
  onPlayerRemove,
  onWristbandPair,
  onWristbandUnpair,
}) {
  const [randomTeamName, setRandom] = React.useState(
    generateRandomName().toLowerCase(),
  );
  const state = useEntityState(afm.registerGroupTeam, (cmd) => {
    debug("LISTEN ON THIS TEAM");
    return cmd.args?.team?.name === team.name;
  });

  return (
    <FollowState overlay state={state} cmd={afm.listPlayers} delayPending={500}>
      <Card
        $state={team.state.name}
        $pending={state.pending}
        $fulfilled={state.fulfilled}
      >
        <div className="state">
          <DataTuple nok value={team?.state?.name} />
        </div>
        <section>
          <FormTeamName
            disabled={team?.state?.name === "registered"}
            teamName={team.name}
            submitting={state.pending}
            randomTeamName={randomTeamName}
            onChange={({ fields }) => {
              team.name = fields.teamName || randomTeamName;
            }}
          />
        </section>
        <section>
          <WidgetAdd content="add player" onClick={() => onPlayerAdd(team)} />
          <WidgetRemove
            content="remove team"
            onClick={() => onTeamRemove(team)}
          />
        </section>
        <section>
          <ListPlayerActionCards>
            {team.roster.map((player, i) => (
              <StandardPlayerActionCard
                key={player.username + i}
                ctx={player}
                onPlayerRemove={(player) => onPlayerRemove(team, player)}
                onWristbandPair={onWristbandPair}
                onWristbandUnpair={onWristbandUnpair}
              />
            ))}
          </ListPlayerActionCards>
        </section>
      </Card>
    </FollowState>
  );
}

const Card = styled("article")`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 300px 1fr;
  background-color: var(--grey-light);
  border-radius: var(--br-lg) 0 var(--br-lg) var(--br-lg);
  padding: 20px;
  align-items: center;
  column-gap: 40px;
  position: relative;
  pointer-events: ${({ $state }) =>
    $state === "registered" ? "none" : "auto"};

  .state {
    font-size: var(--tx-xl);
    color: var(--info-base);
    position: absolute;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-weight: 550;
    right: 0;
    top: -30px;
    background-color: var(--grey-light);
    border-radius: var(--br-sm) var(--br-sm) 0 var(--br-lg);
    padding: 7px 15px;
  }

  section:nth-of-type(1) {
    margin-top: 5px;
  }

  section:nth-of-type(2) {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    gap: 25px;

    .widget {
      width: 40px;
      height: 40px;
      background-color: var(--primary-base);
      padding: 6px;
      > svg {
        fill: white;
      }
    }
  }

  section:nth-of-type(3) {
    grid-row: 1 / span 2;
    height: 100%;
  }

  #form-teamName > div {
    height: 50px !important;
    background-color: ${({ $state }) =>
      $state === "registered" ? "var(--primary-base)" : "white"};
    border-radius: var(--br-nl);
  }
  #teamName {
    background-color: ${({ $state }) =>
      $state === "registered" ? "var(--primary-base)" : "white"};
    border: none;
    color: ${({ $state }) => ($state === "registered" ? "white" : "black")};
  }
`;

const Container = styled("div")`
  width: 100%;
  height: 100%;
`;

export { TeamActionCard };
