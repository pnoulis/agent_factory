import { Outlet } from "react-router-dom";
import { Panel } from "#components/panel/Panel.jsx";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import { PanelNavLink } from "#components/links/PanelNavLink";
import IconLiveView from "/assets/icons/liveView.svg?react";
import { liveView } from "/src/links.jsx";
import { useContextApp } from "/src/contexts/ContextApp";

function Component() {
  const { t } = useContextApp();
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
    </Panel>
  );
}

export { Component };
