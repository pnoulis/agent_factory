import { PanelNavLink } from "#components/links/PanelNavLink";
import { Panel } from "#components/panel/Panel.jsx";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import IconCashout from "/assets/icons/cash-out.svg?react";
import IconDevice from "/assets/icons/devices.svg?react";
import IconCashiers from "/assets/icons/players-two.svg?react";
import { useContextApp } from "/src/contexts/ContextApp.jsx";
import { cashiers, cashoutCashier, devices } from "/src/links.jsx";

function Component() {
  const { t } = useContextApp();
  return (
    <Page className="page">
      <Panel className="panel">
        <PanelActionbar>
          <PanelNavbar>
            <PanelNavLink.Anchor end to={cashoutCashier.path}>
              <PanelNavLink.Icon>
                <IconCashout />
              </PanelNavLink.Icon>
              <PanelNavLink.Text>{t(cashoutCashier.label)}</PanelNavLink.Text>
            </PanelNavLink.Anchor>
            <PanelNavLink.Anchor to={cashiers.path}>
              <PanelNavLink.Icon>
                <IconCashiers />
              </PanelNavLink.Icon>
              <PanelNavLink.Text>{t(cashiers.label)}</PanelNavLink.Text>
            </PanelNavLink.Anchor>
            <PanelNavLink.Anchor end to={devices.path}>
              <PanelNavLink.Icon>
                <IconDevice />
              </PanelNavLink.Icon>
              <PanelNavLink.Text>{t(devices.label)}</PanelNavLink.Text>
            </PanelNavLink.Anchor>
          </PanelNavbar>
        </PanelActionbar>
        <Content className="administration-content">
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
  .panel {
    gap: 20px;
  }
`;
const Content = styled("div")`
  width: 100%;
  height: 100%;
  padding: 20px 40px 0 40px;
`;

export { Component };
