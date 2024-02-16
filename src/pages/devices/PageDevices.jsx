import { Panel } from "#components/panel/Panel.jsx";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { WidgetRestart } from "#components/widgets/WidgetRestart";
import { WidgetShutdown } from "#components/widgets/WidgetShutdown.jsx";
import { WidgetBoot } from '#components/widgets/WidgetBoot.jsx';

function Component() {
  return (
    <PageDevices>
      <PanelActionbar>
        <PanelNavbar style={{ justifyContent: "end", gap: "30px" }}>
          <WidgetRestart
            color="var(--primary-base)"
            fill="white"
            content="restart device"
          />
          <WidgetShutdown
            color="var(--primary-base)"
            fill="white"
            content="shutdown device"
          />
          <WidgetBoot
            color="var(--primary-base)"
            fill="white"
            content="boot device"
          />

        </PanelNavbar>
      </PanelActionbar>
    </PageDevices>
  );
}

const PageDevices = styled(Panel)``;

export { Component };
