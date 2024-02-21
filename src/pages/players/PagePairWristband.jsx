import { ComboboxSearchPlayer } from "../../components/comboboxes/ComboboxSearchPlayer.jsx";
import styled from "styled-components";
import BackgroundWrisband from "/assets/icons/wristband-gear.svg";
import { Team } from "#afm/team/Team.js";
import { StandardPlayerActionCard } from "#components/player/StandardPlayerActionCard.jsx";
import { RegistrationQueue } from "#components/registration-queue/RegistrationQueue.jsx";
import { useRegistrationQueue } from "#components/registration-queue/useRegistrationQueue.jsx";

const team = Team.random(null, {
  players: 5,
  state: "registered",
  player: { state: "registered", stage2: false },
  wristband: { state: "paired", stage2: false },
});

function Component() {
  const { queue, enqueue, dequeue } = useRegistrationQueue(team.roster);
  return (
    <>
      <Wrapper>
        <section>
          <Heading id="combobox-label">Add Players</Heading>
          <ComboboxSearchPlayer
            labelledBy="combobox-label"
            onSelect={enqueue}
          />
        </section>
        <RegistrationQueue $shouldEven={queue.length > 3}>
          {queue.map((p, i) => {
            return (
              <StandardPlayerActionCard
                key={i}
                ctx={p}
                onPlayerRemove={dequeue}
              />
            );
          })}
        </RegistrationQueue>
      </Wrapper>
    </>
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

const StyledRegistrationQueue = styled(RegistrationQueue)`
  border-radius: var(--br-lg);
  background-color: white;
  box-shadow: var(--sd-14), var(--sd-4);
  background-image: url(${BackgroundWrisband});
  background-repeat: no-repeat;
  background-size: 50%;
  background-position: center;
  height: 610px;
  max-width: 650px;
  margin-left: auto;
  align-self: end;
  display: grid;
  grid-template-columns: repeat(3, 170px);
  grid-auto-rows: max-content;
  overflow-y: scroll;
  gap: 40px 30px;
  padding: 30px 20px;
  justify-content: space-between;
`;

export { Component };
