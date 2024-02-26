import { confirmDeregisterCashier } from "#components/dialogs/confirms/confirmDeregisterCashier.jsx";
import { renderDialog } from "#components/dialogs/renderDialog.jsx";
import { Panel } from "#components/panel/Panel.jsx";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import { WidgetAdd } from "#components/widgets/WidgetAdd.jsx";
import { WidgetRemove } from "#components/widgets/WidgetRemove.jsx";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DialogAlertStandard } from "#components/dialogs/alerts/DialogAlertStandard.jsx";
import { deregisterCashiers } from "/src/controllers/deregisterCashiers.jsx";
import { FollowState } from "#components/await-command/FollowState.jsx";
import { AwaitCashiers } from "/src/loaders/loadCashiers.jsx";
import { TableCashiers } from "#components/tables/TableCashiers.jsx";

function Component() {
  const navigate = useNavigate();
  const selectedCashiersRef = React.useRef([]);

  return (
    <Page className="page">
      <PanelActionbar>
        <ThisPanelNavbar>
          <WidgetRemove
            color="var(--primary-base)"
            fill="white"
            content="remove cashier"
            onClick={() => deregisterCashiers(selectedCashiersRef.current)}
          />
          <WidgetAdd
            onClick={(e) => navigate("register")}
            color="var(--primary-base)"
            fill="white"
            content="new cashier"
          />
        </ThisPanelNavbar>
      </PanelActionbar>
      <Content className="content">
        <FollowState revalidate cmd={afm.deregisterCashier}>
          <AwaitCashiers>
            {({ cashiers, id }) => (
              <TableCashiers
                key={id}
                cashiers={cashiers}
                onSelectionChange={(selection) => {
                  selectedCashiersRef.current = selection;
                }}
              />
            )}
          </AwaitCashiers>
        </FollowState>
      </Content>
    </Page>
  );
}

const Page = styled("div")`
  width: 100%;
  height: 100%;
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
