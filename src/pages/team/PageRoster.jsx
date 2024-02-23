import { renderDialog } from "#components/dialogs/renderDialog.jsx";
import { Panel } from "#components/panel/Panel.jsx";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import * as React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { StandardPlayerActionCard } from "../../components/player/StandardPlayerActionCard";
import { RegistrationQueue } from "../../components/registration-queue/RegistrationQueue.jsx";
import { useRegistrationQueue } from "../../components/registration-queue/useRegistrationQueue.jsx";

function Component() {
  const { team } = useOutletContext();
  const { queue, enqueue, dequeue, pairWristband, unpairWristband } =
    useRegistrationQueue();

  return (
    <Page className="page">
      <Panel className="panel">
        <PanelActionbar>
          <PanelNavbar></PanelNavbar>
        </PanelActionbar>
        <Content className="content">
          <section></section>
          <section>
            <RegistrationQueue>
              {queue.map((player, i) => (
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
      </Panel>
    </Page>
  );
}

const Page = styled("div")`
  width: 100%;
  height: 100%;
`;

const Content = styled("div")``;

export { Component };
