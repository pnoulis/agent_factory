import { Outlet } from "react-router-dom";
import { Panel } from "#components/panel/Panel.jsx";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import { PanelNavLink } from "#components/links/PanelNavLink";
import IconCashout from "/assets/icons/cash-out.svg?react";
import IconCashiers from "/assets/icons/players-two.svg?react";
import IconDevice from "/assets/icons/devices.svg?react";
import { cashiers, cashoutCashier, devices } from "/src/links.jsx";
import { useContextApp } from "/src/contexts/ContextApp.jsx";

function Component() {
  const { t } = useContextApp();
  return (
    <Panel>
      <PanelActionbar>
        <PanelNavbar>
          <PanelNavLink.Anchor end to={t(cashoutCashier.path)}>
            <PanelNavLink.Icon>
              <IconCashout />
            </PanelNavLink.Icon>
            <PanelNavLink.Text>{t(cashoutCashier.label)}</PanelNavLink.Text>
          </PanelNavLink.Anchor>

          <PanelNavLink.Anchor to={t(cashiers.path)}>
            <PanelNavLink.Icon>
              <IconCashiers />
            </PanelNavLink.Icon>
            <PanelNavLink.Text>{t(cashiers.label)}</PanelNavLink.Text>
          </PanelNavLink.Anchor>

          <PanelNavLink.Anchor end to={t(devices.path)}>
            <PanelNavLink.Icon>
              <IconDevice />
            </PanelNavLink.Icon>
            <PanelNavLink.Text>{t(devices.label)}</PanelNavLink.Text>
          </PanelNavLink.Anchor>
        </PanelNavbar>
      </PanelActionbar>
      <Outlet />
    </Panel>
  );
}

export { Component };
