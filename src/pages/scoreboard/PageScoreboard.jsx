import { Outlet } from "react-router-dom";
import { Panel } from "#components/panel/Panel.jsx";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import { PanelNavLink } from "#components/links/PanelNavLink";
import IconScoreboard from "/assets/icons/scoreboard.svg?react";
import IconTop10 from "/assets/icons/scoreboard-top-10.svg?react";
import { scoreboard, scoreboardTop10 } from "/src/links.jsx";
import { useContextApp } from "/src/contexts/ContextApp";

function Component() {
  const { t } = useContextApp();

  return (
    <Panel>
      <PanelActionbar>
        <PanelNavbar>
          <PanelNavLink.Anchor end to={t(scoreboard.path)}>
            <PanelNavLink.Icon>
              <IconScoreboard />
            </PanelNavLink.Icon>
            <PanelNavLink.Text>{t(scoreboard.label)}</PanelNavLink.Text>
          </PanelNavLink.Anchor>
          <PanelNavLink.Anchor end to={t(scoreboardTop10.path)}>
            <PanelNavLink.Icon>
              <IconTop10 />
            </PanelNavLink.Icon>
            <PanelNavLink.Text>{t(scoreboardTop10.label)}</PanelNavLink.Text>
          </PanelNavLink.Anchor>
        </PanelNavbar>
      </PanelActionbar>
      <Outlet />
    </Panel>
  );
}

export { Component };
