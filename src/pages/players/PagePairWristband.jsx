import * as React from "react";
import { PlayerCommander } from "#afm/player/PlayerCommander.js";
import { WristbandCommander } from "#afm/wristband/WristbandCommander.js";
import { StandardPlayerActionCard } from "#components/player/StandardPlayerActionCard.jsx";
import { RegistrationQueue } from "#components/registration-queue/RegistrationQueue.jsx";
import { useRegistrationQueue } from "#components/registration-queue/useRegistrationQueue.jsx";
import styled from "styled-components";
import { ComboboxSearchPlayer } from "#components/comboboxes/ComboboxSearchPlayer.jsx";
import { ViewCommand } from "#components/await-command/ViewCommand";
import { renderDialog } from "#components/dialogs/renderDialog";
import { DialogAlertStandard } from "#components/dialogs/alerts/DialogAlertStandard";
import { isObject } from "js_utils/misc";
import { smallid } from "js_utils/uuid";

const createPlayer = (player, wristband) =>
  new PlayerCommander(player, new WristbandCommander(wristband));

function Component() {
  const { queue, enqueue, dequeue, pairWristband, unpairWristband } =
    useRegistrationQueue();
  const [id, setId] = React.useState(() => smallid());

  const searchPlayer = React.useCallback(
    (searchTerm) => afm.searchPlayer(searchTerm),
    [id],
  );

  return (
    <ViewCommand
      onFulfilled={() => {
        setId(smallid());
      }}
      onSettled={(cmd) => {
        renderDialog(
          <DialogAlertStandard initialOpen heading={cmd.verb} msg={cmd.msg} />,
        );
      }}
      noRejected
      noFulfilled
      cmd={afm.deregisterWristband}
    >
      <ViewCommand
        onFulfilled={() => {
          setId(smallid());
        }}
        onSettled={(cmd) => {
          renderDialog(
            <DialogAlertStandard
              initialOpen
              heading={cmd.verb}
              msg={cmd.msg}
            />,
          );
        }}
        noRejected
        noFulfilled
        cmd={afm.registerWristband}
      >
        <Page>
          <Content>
            <section>
              <Label id="combobox-label" htmlFor="search-player-trigger">
                Add Players
              </Label>
              <ComboboxSearchPlayer
                searchPlayer={searchPlayer}
                labelledBy="combobox-label"
                onSelect={(player) =>
                  isObject(player) &&
                  enqueue(createPlayer(player, player.wristband))
                }
              />
            </section>
            <section>
              <RegistrationQueue>
                {queue.map((p, i) => (
                  <StandardPlayerActionCard
                    key={p.username + i}
                    ctx={p}
                    onPlayerRemove={dequeue}
                    onWristbandPair={pairWristband}
                    onWristbandUnpair={unpairWristband}
                  />
                ))}
              </RegistrationQueue>
            </section>
          </Content>
        </Page>
      </ViewCommand>
    </ViewCommand>
  );
}

const Page = styled("div")`
  width: 100%;
  height: 100%;
`;

const Content = styled("div")`
  display: grid;
  grid-template-columns: 1fr 650px;
  grid-template-rows: 1fr;
  height: 100%;
  gap: 80px;

  section:nth-of-type(1) {
    width: 550px;
    margin-top: -20px;
  }

  #search-player-listbox {
    margin-top: 15px;
    max-height: 600px;
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
