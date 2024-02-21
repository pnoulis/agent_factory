import { ComboboxSearchPlayer } from "../../components/comboboxes/ComboboxSearchPlayer.jsx";
import styled from "styled-components";
import BackgroundWrisband from "/assets/icons/wristband-gear.svg";
import { Team } from "#afm/team/Team.js";
import { StandardPlayerActionCard } from "#components/player/StandardPlayerActionCard.jsx";
import { RegistrationQueue } from "#components/registration-queue/RegistrationQueue.jsx";
import { useRegistrationQueue } from "#components/registration-queue/useRegistrationQueue.jsx";
import { AwaitCommand } from "#components/await-command/AwaitCommand.jsx";
import { Center } from "#components/Center.jsx";

const team = Team.random(null, {
  players: 5,
  state: "registered",
  player: { state: "registered", stage2: false },
  wristband: { state: "paired", stage2: false },
});

function Component() {
  const { queue, enqueue, dequeue, pairWristband, unpairWristband } =
    useRegistrationQueue(team.roster);

  return (
    <Wrapper>
      <AwaitCommand cmd={afm.deregisterWristband}>
        <AwaitCommand cmd={afm.registerWristband}>
          <section>
            <Heading id="combobox-label">Add Players</Heading>
            <ComboboxSearchPlayer
              labelledBy="combobox-label"
              onSelect={enqueue}
            />
          </section>
        </AwaitCommand>
      </AwaitCommand>
      <RegistrationQueue $shouldEven={queue.length > 3}>
        {queue.map((p, i) => {
          return (
            <StandardPlayerActionCard
              key={p.username + i}
              ctx={p}
              onPlayerRemove={dequeue}
              onWristbandPair={pairWristband}
              onWristbandUnpair={unpairWristband}
            />
          );
        })}
      </RegistrationQueue>
    </Wrapper>
  );
}

const Wrapper = styled("div")`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  grid-template-rows: auto;
  width: 90%;
  margin: auto;
  height: 100%;
  padding: 20px;
`;

const Heading = styled("h1")`
  color: var(--primary-base);
  font-size: var(--tx-xxh);
  font-weight: 550;
  text-transform: capitalize;
  letter-spacing: 2px;
`;

export { Component };
