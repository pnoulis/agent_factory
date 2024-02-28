import { Outlet } from "react-router-dom";
import { Panel } from "#components/panel/Panel.jsx";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import { PanelNavLink } from "#components/links/PanelNavLink";
import IconPlayer from "/assets/icons/add-player.svg?react";
import IconWristband from "/assets/icons/pair-wristband.svg?react";
import IconPlayers from "/assets/icons/players-three.svg?react";
import { registerPlayer, pairWristband, players } from "/src/links.jsx";
import { useContextApp } from "../../contexts/ContextApp.jsx";
import styled from "styled-components";

function Component() {
  const { t } = useContextApp();
  return (
    <Page className="page">
      <Panel className="panel-players">
        <PanelActionbar>
          <PanelNavbar>
            <PanelNavLink.Anchor end to={registerPlayer.path}>
              <PanelNavLink.Icon>
                <IconPlayer />
              </PanelNavLink.Icon>
              <PanelNavLink.Text>{t(registerPlayer.label)}</PanelNavLink.Text>
            </PanelNavLink.Anchor>

            <PanelNavLink.Anchor end to={pairWristband.path}>
              <PanelNavLink.Icon>
                <IconWristband />
              </PanelNavLink.Icon>
              <PanelNavLink.Text>{t(pairWristband.label)}</PanelNavLink.Text>
            </PanelNavLink.Anchor>

            <PanelNavLink.Anchor end to={players.path}>
              <PanelNavLink.Icon>
                <IconPlayers />
              </PanelNavLink.Icon>
              <PanelNavLink.Text>{t(players.label)}</PanelNavLink.Text>
            </PanelNavLink.Anchor>
          </PanelNavbar>
        </PanelActionbar>
        <Content className="content-players">
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
  .panel-players {
    gap: 20px;
  }
`;

const Content = styled("div")`
  width: 100%;
  height: 100%;
  padding: 40px 40px 20px 40px;
`;

export { Component };
