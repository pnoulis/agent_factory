import { useNavigate } from "react-router-dom";
import { Panel } from "#components/panel/Panel.jsx";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import { PanelNavLink } from "#components/links/PanelNavLink";
import IconLiveView from "/assets/icons/liveView.svg?react";
import { liveView } from "/src/links.jsx";
import { useContextApp } from "/src/contexts/ContextApp";
import { TableTeams } from "#components/tables/TableTeams.jsx";
import styled from "styled-components";
import { AwaitTeams } from "/src/loaders/loadTeams.jsx";
import { team } from "/src/links.jsx";

function Component() {
  const { t } = useContextApp();
  const navigate = useNavigate();

  return (
    <Panel>
      <PanelActionbar>
        <PanelNavbar>
          <PanelNavLink.Anchor end to={t(liveView.path)}>
            <PanelNavLink.Icon>
              <IconLiveView />
            </PanelNavLink.Icon>
            <PanelNavLink.Text>{t(liveView.label)}</PanelNavLink.Text>
          </PanelNavLink.Anchor>
        </PanelNavbar>
      </PanelActionbar>
      <Page>
        <AwaitTeams>
          {({ teams }) => (
            <TableTeams
              teams={teams}
              onRowClick={(row) => {
                navigate(team(row.name).path);
              }}
            />
          )}
        </AwaitTeams>
      </Page>
    </Panel>
  );
}

const Page = styled("div")`
  padding-top: 80px;
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 85%;
  grid-template-rows: 1fr;
  justify-content: center;
`;

export { Component };
