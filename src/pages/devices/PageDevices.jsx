import * as React from "react";
import { Panel } from "#components/panel/Panel.jsx";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import styled from "styled-components";
import { WidgetRestart } from "#components/widgets/WidgetRestart";
import { WidgetShutdown } from "#components/widgets/WidgetShutdown.jsx";
import { WidgetBoot } from "#components/widgets/WidgetBoot.jsx";
import { AwaitDevices, AwaitViews } from "/src/loaders/loadDevices.jsx";
import { TableDevices } from "#components/tables/TableDevices.jsx";
import { ComboboxDeviceView } from "#components/comboboxes/ComboboxDeviceView";
import { confirmUpdateDevices } from "#components/dialogs/confirms/confirmUpdateDevices.jsx";
import { confirmUpdateDevicesView } from "#components/dialogs/confirms/confirmUpdateDeviceView";
import { renderDialog } from "#components/dialogs/renderDialog.jsx";
import { renderDialogPromise } from "#components/dialogs/renderDialogPromise.jsx";
import { DialogAlertStandard } from "#components/dialogs/alerts/DialogAlertStandard";
import { ViewCommand } from "#components/await-command/ViewCommand.jsx";
import { useRevalidator, useNavigate } from "react-router-dom";

function Component() {
  const selectedDevicesRef = React.useRef([]);
  const navigate = useNavigate();
  // const revalidator = useRevalidator();

  return (
    <ViewCommand
      onFulfilled={() => {
        navigate(0);
      }}
      onSettled={async (cmd) =>
        renderDialogPromise(
          <DialogAlertStandard initialOpen heading={cmd.verb} msg={cmd.msg} />,
        ).then(() => navigate(0))
      }
      noRejected
      noFulfilled
      cmd={afm.restartDevice}
    >
      <ViewCommand
        onSettled={async (cmd) =>
          renderDialogPromise(
            <DialogAlertStandard
              initialOpen
              heading={cmd.verb}
              msg={cmd.msg}
            />,
          ).then(() => navigate(0))
        }
        noRejected
        noFulfilled
        cmd={afm.shutdownDevice}
      >
        <ViewCommand
          onSettled={async (cmd) =>
            renderDialogPromise(
              <DialogAlertStandard
                initialOpen
                heading={cmd.verb}
                msg={cmd.msg}
              />,
            ).then(() => navigate(0))
          }
          noRejected
          noFulfilled
          cmd={afm.bootDevice}
        >
          <ViewCommand
            onSettled={async (cmd) =>
              renderDialogPromise(
                <DialogAlertStandard
                  initialOpen
                  heading={cmd.verb}
                  msg={cmd.msg}
                />,
              ).then(() => navigate(0))
            }
            noRejected
            noFulfilled
            cmd={afm.updateScoreboardDeviceView}
          >
            <Page className="page-devices">
              <Panel className="panel-devices">
                <PanelActionbar>
                  <AwaitViews>
                    {({ scoreboardViews, id }) => (
                      <PanelNavbar
                        style={{
                          justifyContent: "end",
                          gap: "30px",
                          alignItems: "center",
                        }}
                      >
                        <ComboboxDeviceView
                          key={id}
                          views={scoreboardViews}
                          onSelect={async (view, setCombobox) => {
                            const scoreboardDevices =
                              selectedDevicesRef.current.filter(
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
                              for (
                                let i = 0;
                                i < scoreboardDevices.length;
                                i++
                              ) {
                                afm.updateScoreboardDeviceView(
                                  scoreboardDevices[i],
                                  view,
                                );
                              }
                            }
                          }}
                        />
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
                              for (
                                let i = 0;
                                i < selectedDevicesRef.current.length;
                                i++
                              ) {
                                afm.restartDevice(
                                  selectedDevicesRef.current[i],
                                );
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
                              for (
                                let i = 0;
                                i < selectedDevicesRef.current.length;
                                i++
                              ) {
                                afm.shutdownDevice(
                                  selectedDevicesRef.current[i],
                                );
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
                              for (
                                let i = 0;
                                i < selectedDevicesRef.current.length;
                                i++
                              ) {
                                afm.bootDevice(selectedDevicesRef.current[i]);
                              }
                            }
                          }}
                        />
                      </PanelNavbar>
                    )}
                  </AwaitViews>
                </PanelActionbar>
                <Content>
                  <AwaitDevices>
                    {({ devices, id }) => (
                      <TableDevices
                        key={id}
                        devices={devices}
                        onSelectionChange={(selection) => {
                          selectedDevicesRef.current = selection;
                        }}
                      />
                    )}
                  </AwaitDevices>
                </Content>
              </Panel>
            </Page>
          </ViewCommand>
        </ViewCommand>
      </ViewCommand>
    </ViewCommand>
  );
}

const Page = styled("div")`
  width: 100%;
  height: 100%;

  .panel-devices {
    gap: 30px;
  }
`;
const Content = styled("div")`
  width: 100%;
  height: 100%;
`;

export { Component };
