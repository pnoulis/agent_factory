import * as React from "react";
import { Panel } from "#components/panel/Panel.jsx";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { WidgetRestart } from "#components/widgets/WidgetRestart";
import { WidgetShutdown } from "#components/widgets/WidgetShutdown.jsx";
import { WidgetBoot } from "#components/widgets/WidgetBoot.jsx";
import { AwaitDevices, AwaitViews } from "/src/loaders/loadDevices.jsx";
import { Center } from "#components/Center.jsx";
import { TableDevices } from "#components/tables/TableDevices.jsx";
import { ComboboxDeviceView } from "#components/comboboxes/ComboboxDeviceView";
import { parsecmd } from "#afm/parsecmd.js";
import { confirmUpdateDevices } from "#components/dialogs/confirms/confirmUpdateDevices.jsx";
import { confirmUpdateDevicesView } from "#components/dialogs/confirms/confirmUpdateDeviceView";
import { renderDialog } from "#components/dialogs/renderDialog.jsx";
import { DialogAlertStandard } from "#components/dialogs/alerts/DialogAlertStandard";
import { AwaitCommand } from "#components/await-command/AwaitCommand.jsx";

function Component() {
  const selectedDevicesRef = React.useRef([]);

  return (
    <PageDevices>
      <PanelActionbar>
        <PanelNavbar
          style={{ justifyContent: "end", gap: "30px", alignItems: "center" }}
        >
          <AwaitViews>
            {({ scoreboardViews, id }) => {
              return (
                <ComboboxDeviceView
                  key={id}
                  views={scoreboardViews}
                  onSelect={async (view, setCombobox) => {
                    const scoreboardDevices = selectedDevicesRef.current.filter(
                      (device) => !!device.view,
                    );

                    if (!scoreboardDevices.length) {
                      renderDialog(
                        <DialogAlertStandard
                          initialOpen
                          heading="set device view"
                          msg="No scoreboard device's selected!"
                        />,
                      );
                      setCombobox("");
                    } else {
                      const yes = await confirmUpdateDevicesView(
                        view,
                        scoreboardDevices,
                      );

                      if (!yes) return;
                      for (let i = 0; i < scoreboardDevices.length; i++) {
                        afm.updateScoreboardDeviceView(
                          scoreboardDevices[i],
                          view,
                        );
                      }
                    }
                  }}
                />
              );
            }}
          </AwaitViews>
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
        <AwaitCommand revalidate cmd={afm.updateScoreboardDeviceView}>
          <AwaitDevices>
            {({ devices, id }) => {
              return (
                <TableDevices
                  key={id}
                  devices={devices}
                  onSelectionChange={(selection) => {
                    selectedDevicesRef.current = selection;
                  }}
                />
              );
            }}
          </AwaitDevices>
        </AwaitCommand>
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
