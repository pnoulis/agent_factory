import * as React from "react";
import { Panel } from "#components/panel/Panel.jsx";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { WidgetRestart } from "#components/widgets/WidgetRestart";
import { WidgetShutdown } from "#components/widgets/WidgetShutdown.jsx";
import { WidgetBoot } from "#components/widgets/WidgetBoot.jsx";
import { AwaitDevices } from "/src/loaders/loadDevices";
import { Center } from "#components/Center.jsx";
import { TableDevices } from "#components/tables/TableDevices.jsx";
import { parsecmd } from "#afm/parsecmd.js";
import { confirmUpdateDevices } from "#components/dialogs/confirms/confirmUpdateDevices.jsx";

function Component() {
  const selectedDevicesRef = React.useRef([]);

  return (
    <PageDevices>
      <PanelActionbar>
        <PanelNavbar style={{ justifyContent: "end", gap: "30px" }}>
          <WidgetRestart
            color="var(--primary-base)"
            fill="white"
            content="restart device"
            onClick={async (e) => {
              const yes = await confirmUpdateDevices(
                "restart",
                selectedDevicesRef.current,
              );
              if (!yes) {
                return;
              } else if (!selectedDevicesRef.current.length) {
                afm.restartDevice();
              } else {
                for (let i = 0; i < selectedDevicesRef.current.length; i++) {
                  afm.restartDevice(selectedDevicesRef.current[i]);
                }
              }
            }}
          />
          <WidgetShutdown
            color="var(--primary-base)"
            fill="white"
            content="shutdown device"
            onClick={async () => {
              const yes = await confirmUpdateDevices(
                "shutdown",
                selectedDevicesRef.current,
              );
              if (!yes) {
                return;
              } else if (!selectedDevicesRef.current.length) {
                afm.shutdownDevice();
              } else {
                for (let i = 0; i < selectedDevicesRef.current.length; i++) {
                  afm.shutdownDevice(selectedDevicesRef.current[i]);
                }
              }
            }}
          />
          <WidgetBoot
            color="var(--primary-base)"
            fill="white"
            content="boot device"
            onClick={async () => {
              const yes = await confirmUpdateDevices(
                "boot",
                selectedDevicesRef.current,
              );
              if (!yes) {
                return;
              } else if (!selectedDevicesRef.current.length) {
                afm.bootDevice();
              } else {
                for (let i = 0; i < selectedDevicesRef.current.length; i++) {
                  afm.bootDevice(selectedDevicesRef.current[i]);
                }
              }
            }}
          />
        </PanelNavbar>
      </PanelActionbar>
      <Center>
        <AwaitDevices>
          {({ devices }) => (
            <TableDevices
              key={devices}
              devices={devices}
              onSelectionChange={(selection) => {
                selectedDevicesRef.current = selection;
              }}
            />
          )}
        </AwaitDevices>
      </Center>
    </PageDevices>
  );
}

const PageDevices = styled(Panel)`
  max-width: 70%;
  margin: auto;
  gap: 30px;
`;

export { Component };
