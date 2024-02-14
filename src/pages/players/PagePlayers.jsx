import { Outlet } from "react-router-dom";
import { Panel } from "#components/panel/Panel.jsx";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import { registerPlayer, pairWristband, players } from "/src/links.jsx";
import { PanelNavLink } from "#components/links/PanelNavLink";
import IconPlayer from "/assets/icons/add-player.svg?react";
import IconWristband from "/assets/icons/pair-wristband.svg?react";
import IconPlayers from "/assets/icons/players-three.svg?react";
import { useContextApp } from "../../contexts/ContextApp.jsx";

function Component() {
  const ctx = useContextApp();
  return (
    <Panel>
      <PanelActionbar id='page players'>
        <PanelNavbar>
          <PanelNavLink.Anchor end to={registerPlayer.path}>
            <PanelNavLink.Text>{t(registerPlayer.label)}</PanelNavLink.Text>
            <PanelNavLink.Icon>
              <IconPlayer />
            </PanelNavLink.Icon>
          </PanelNavLink.Anchor>

          <PanelNavLink.Anchor end to={pairWristband.path}>
            <PanelNavLink.Text>{pairWristband.label}</PanelNavLink.Text>
            <PanelNavLink.Icon>
              <IconWristband />
            </PanelNavLink.Icon>
          </PanelNavLink.Anchor>

          <PanelNavLink.Anchor end to={players.path}>
            <PanelNavLink.Text>{players.label}</PanelNavLink.Text>
            <PanelNavLink.Icon>
              <IconPlayers />
            </PanelNavLink.Icon>
          </PanelNavLink.Anchor>
        </PanelNavbar>
      </PanelActionbar>
      <Outlet />
    </Panel>
  );
}

export { Component };
