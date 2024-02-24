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

function TeamActionCard({
  team,
  onTeamRemove,
  onPlayerAdd,
  onPlayerRemove,
  onWristbandPair,
  onWristbandUnpair,
}) {
  const [randomTeamName, setRandom] = React.useState(generateRandomName());
  const { state, idle, pending, fulfilled } = useEntityState(
    afm.listPlayers,
    team.isThisTeamRegistering,
  );

  return (
    <FollowState overlay={false} state={state} cmd={afm.listPlayers}>
      <Card $pending={pending} $fulfilled={fulfilled}>
        <section>
          <FormTeamName
            teamName={team.name}
            submitting={pending}
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
  border-radius: var(--br-lg);
  padding: 20px;
  align-items: center;
  column-gap: 40px;

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

  #teamName {
    background-color: white;
    border-color: white;
  }
`;

export { TeamActionCard };
