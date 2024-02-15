import { Outlet, useNavigate } from "react-router-dom";
import { Panel } from "#components/panel/Panel.jsx";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import { WidgetAdd } from "#components/widgets/WidgetAdd.jsx";
import { WidgetRemove } from "#components/widgets/WidgetRemove.jsx";
import styled from "styled-components";
import { cashiers } from "/src/links.jsx";
import { TableCashiers } from "#components/tables/TableCashiers.jsx";
import { Center } from "#components/Center.jsx";

function Component() {
  const navigate = useNavigate();

  return (
    <PageCashiers>
      <PanelActionbar>
        <PanelNavbar style={{ justifyContent: "end", gap: "30px" }}>
          <WidgetRemove
            color="var(--primary-base)"
            fill="white"
            content="remove cashier"
          />
          <WidgetAdd
            onClick={(e) => navigate("register")}
            color="var(--primary-base)"
            fill="white"
            content="new cashier"
          />
        </PanelNavbar>
      </PanelActionbar>
      <Outlet />
    </PageCashiers>
  );
}

const PageCashiers = styled(Panel)`
  max-width: 70%;
  margin: auto;
  gap: 50px;
`;

export { Component };
