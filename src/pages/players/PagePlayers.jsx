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

function Component() {
  const { t } = useContextApp();
  return (
    <Panel>
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
      <Outlet />
    </Panel>
  );
}

export { Component };
