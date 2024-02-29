import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import { WidgetAdd } from "#components/widgets/WidgetAdd.jsx";
import { WidgetRemove } from "#components/widgets/WidgetRemove.jsx";
import * as React from "react";
import { useNavigate, useRevalidator } from "react-router-dom";
import styled from "styled-components";
import { AwaitCashiers } from "/src/loaders/loadCashiers.jsx";
import { TableCashiers } from "#components/tables/TableCashiers.jsx";
import { ViewCommand } from "#components/await-command/ViewCommand.jsx";
import { cashiers as cashierControllers } from "../../controllers/cashiers.jsx";
import { isObject } from "js_utils/misc";

function Component() {
  const navigate = useNavigate();
  const selectedCashiersRef = React.useRef([]);
  const revalidator = useRevalidator();

  const deregisterCashiers = async () => {
    try {
      await cashierControllers.deregister(selectedCashiersRef.current);
    } finally {
      revalidator.revalidate();
    }
  };

  const handleCashierSelected = (selectedCashiers) => {
    selectedCashiersRef.current = selectedCashiers;
  };

  return (
    <ViewCommand noRejected noFulfilled cmd={afm.deregisterCashier}>
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
                    onClick={deregisterCashiers}
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
                  onSelectionChange={handleCashierSelected}
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
