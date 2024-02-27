import { renderDialog } from "#components/dialogs/renderDialog.jsx";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import { WidgetAdd } from "#components/widgets/WidgetAdd.jsx";
import { WidgetRemove } from "#components/widgets/WidgetRemove.jsx";
import * as React from "react";
import { useNavigate, useRevalidator } from "react-router-dom";
import styled from "styled-components";
import { DialogAlertStandard } from "#components/dialogs/alerts/DialogAlertStandard.jsx";
import { deregisterCashiers } from "/src/controllers/deregisterCashiers.jsx";
import { AwaitCashiers } from "/src/loaders/loadCashiers.jsx";
import { TableCashiers } from "#components/tables/TableCashiers.jsx";
import { ViewCommand } from "#components/await-command/ViewCommand.jsx";

function Component() {
  const navigate = useNavigate();
  const selectedCashiersRef = React.useRef([]);
  const revalidator = useRevalidator();

  return (
    <ViewCommand
      onFulfilled={() => {
        revalidator.revalidate();
      }}
      onSettled={(cmd) => {
        renderDialog(
          <DialogAlertStandard initialOpen heading={cmd.verb} msg={cmd.msg} />,
        );
      }}
      noRejected
      noFulfilled
      cmd={afm.deregisterCashier}
    >
      <Page className="page-cashiers">
        <AwaitCashiers>
          {({ cashiers, id }) => (
            <>
              <PanelActionbar>
                <ThisPanelNavbar>
                  <WidgetRemove
                    color="var(--primary-base)"
                    fill="white"
                    content="remove cashier"
                    onClick={() =>
                      deregisterCashiers(selectedCashiersRef.current)
                    }
                  />
                  <WidgetAdd
                    onClick={(e) => navigate("register")}
                    color="var(--primary-base)"
                    fill="white"
                    content="new cashier"
                  />
                </ThisPanelNavbar>
              </PanelActionbar>
              <Content>
                <TableCashiers
                  key={id}
                  cashiers={cashiers}
                  onSelectionChange={(selection) => {
                    selectedCashiersRef.current = selection;
                  }}
                />
              </Content>
            </>
          )}
        </AwaitCashiers>
      </Page>
    </ViewCommand>
  );
}

const Page = styled("div")`
  width: 100%;
  height: 100%;
  padding: 20px;
`;
const Content = styled("div")`
  width: 100%;
  height: 100%;
`;
const ThisPanelNavbar = styled(PanelNavbar)`
  display: flex;
  flex-flow: row nowrap;
  justify-content: end;
  column-gap: 40px;
`;

export { Component };
