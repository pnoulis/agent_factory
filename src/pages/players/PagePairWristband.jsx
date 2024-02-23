import { ComboboxSearchPlayer } from "../../components/comboboxes/ComboboxSearchPlayer.jsx";
import styled from "styled-components";
import BackgroundWrisband from "/assets/icons/wristband-gear.svg";
import { Team } from "#afm/team/Team.js";
import { StandardPlayerActionCard } from "#components/player/StandardPlayerActionCard.jsx";
import { RegistrationQueue } from "#components/registration-queue/RegistrationQueue.jsx";
import { useRegistrationQueue } from "#components/registration-queue/useRegistrationQueue.jsx";
import { AwaitCommand } from "#components/await-command/AwaitCommand.jsx";
import { Center } from "#components/Center.jsx";
import { useContextApp } from "../../contexts/ContextApp.jsx";
import { PlayerCommander } from "#afm/player/PlayerCommander.js";
import { WristbandCommander } from "#afm/wristband/WristbandCommander.js";

const createPlayer = (player, wristband) =>
  new PlayerCommander(player, new WristbandCommander(wristband));

function Component() {
  const { createPlayerCommander } = useContextApp();
  const { queue, enqueue, dequeue, pairWristband, unpairWristband } =
    useRegistrationQueue();

  return (
    <Center>
      <Page>
        <section>
          <AwaitCommand cmd={afm.deregisterWristband}>
            <AwaitCommand cmd={afm.registerWristband}>
              <>
                <Label id="combobox-label" htmlFor="search-player-trigger">
                  Add Players
                </Label>
                <ComboboxSearchPlayer
                  labelledBy="combobox-label"
                  onSelect={(player) =>
                    enqueue(createPlayer(player, player.wristband))
                  }
                />
              </>
            </AwaitCommand>
          </AwaitCommand>
        </section>
        <section>
          <RegistrationQueue>
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
        </section>
      </Page>
    </Center>
  );
}

const Page = styled("div")`
  display: grid;
  grid-template-columns: 1fr 650px;
  grid-template-rows: 1fr;
  width: 90%;
  height: 100%;
  padding: 20px;
  gap: 80px;

  section:nth-of-type(1) {
    width: 550px;
  }

  section:nth-of-type(2) {
    align-self: end;
    width: 100%;
    height: 100%;
    max-width: 650px;
    max-height: 600px;
    justify-self: end;
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
