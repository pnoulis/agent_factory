import { Outlet } from "react-router-dom";
import { Panel } from "#components/panel/Panel.jsx";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import { PanelNavLink } from "#components/links/PanelNavLink";
import IconScoreboard from "/assets/icons/scoreboard.svg?react";
import IconTop10 from "/assets/icons/scoreboard-top-10.svg?react";
import { scoreboard, scoreboardTop10 } from "/src/links.jsx";
import { useContextApp } from "/src/contexts/ContextApp";
import styled from "styled-components";

function Component() {
  const { t } = useContextApp();

  return (
    <Page className="page-scoreboard">
      <Panel className="panel-scoreboard">
        <PanelActionbar>
          <PanelNavbar>
            <PanelNavLink.Anchor end to={scoreboard.path}>
              <PanelNavLink.Icon>
                <IconScoreboard />
              </PanelNavLink.Icon>
              <PanelNavLink.Text>live</PanelNavLink.Text>
            </PanelNavLink.Anchor>
            <PanelNavLink.Anchor end to={scoreboardTop10.path}>
              <PanelNavLink.Icon>
                <IconTop10 />
              </PanelNavLink.Icon>
              <PanelNavLink.Text>{t(scoreboardTop10.label)}</PanelNavLink.Text>
            </PanelNavLink.Anchor>
          </PanelNavbar>
        </PanelActionbar>
        <Content className="content-scoreboard">
          <Outlet />
        </Content>
      </Panel>
    </Page>
  );
}

const Page = styled("div")`
  width: 100%;
  height: 100%;
  padding: 20px;
  .panel-scoreboard {
    gap: 20px;
  }
`;

const Content = styled("div")`
  width: 100%;
  height: 100%;
`;

export { Component };
