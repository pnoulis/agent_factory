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
import { DialogAlertStandard } from "#components/dialogs/alerts/DialogAlertStandard";
import { ViewCommand } from "#components/await-command/ViewCommand.jsx";
import { useRevalidator, useLoaderData } from "react-router-dom";
import { AlertUpdateDevices } from "../../components/dialogs/alerts/AlertUpdateDevices.jsx";

function Component() {
  const selectedDevicesRef = React.useRef([]);
  const loader = useLoaderData();
  const revalidator = useRevalidator();

  const getDevices = () => loader.devices.then(({ devices }) => devices);

  const updateDeviceView = async (view) => {
    const scoreboardDevices = selectedDevicesRef.current.filter(
      (device) => !!device.view,
    );

    if (!scoreboardDevices.length) {
      return renderDialog(
        <DialogAlertStandard
          initialOpen
          heading="set device view"
          msg="No scoreboard device's selected!"
        />,
      );
    } else if (!(await confirmUpdateDevicesView(view, scoreboardDevices))) {
      return Promise.resolve();
    }

    try {
      const cmds = await Promise.allSettled([
        ...scoreboardDevices.map((device) =>
          afm.updateScoreboardDeviceView(device, view),
        ),
      ]);
      renderDialog(
        <AlertUpdateDevices
          initialOpen
          heading="update device view"
          cmds={cmds}
        />,
      );
      revalidator.revalidate();
      selectedDevicesRef.current = [];
    } catch (err) {
      renderDialog(
        <DialogAlertStandard
          initialOpen
          heading="update device view"
          msg={getMsg(err).err}
        />,
      );
    }
  };

  const updateDevices = async (action) => {
    const devices = await getDevices();
    const selectedDevices = selectedDevicesRef.current;

    if (!(await confirmUpdateDevices(action, selectedDevices))) {
      return Promise.resolve();
    }

    try {
      const cmds = await Promise.allSettled(
        selectedDevices.length === 0 ||
          selectedDevices.length === devices.length
          ? [afm[`${action}Device`]()]
          : selectedDevices.map((device) => afm[`${action}Device`](device)),
      );
      renderDialog(
        <AlertUpdateDevices
          initialOpen
          heading={`${action} devices`}
          cmds={cmds}
        />,
      );
      revalidator.revalidate();
      selectedDevicesRef.current = [];
    } catch (err) {
      renderDialog(
        <DialogAlertStandard
          initialOpen
          heading={`${action} devices`}
          msg={getMsg(err)}
        />,
      );
    }
  };

  return (
    <ViewCommand noRejected noFulfilled cmd={afm.restartDevice}>
      <ViewCommand noRejected noFulfilled cmd={afm.shutdownDevice}>
        <ViewCommand noRejected noFulfilled cmd={afm.bootDevice}>
          <ViewCommand
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
                          onSelect={updateDeviceView}
                        />
                        <WidgetRestart
                          color="var(--primary-base)"
                          fill="white"
                          content="restart device"
                          onClick={() => updateDevices("restart")}
                        />
                        <WidgetShutdown
                          color="var(--primary-base)"
                          fill="white"
                          content="shutdown device"
                          onClick={() => updateDevices("shutdown")}
                        />
                        <WidgetBoot
                          color="var(--primary-base)"
                          fill="white"
                          content="boot device"
                          onClick={() => updateDevices("boot")}
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
