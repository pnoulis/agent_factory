import { Outlet, useNavigate } from "react-router-dom";
import { Panel } from "#components/panel/Panel.jsx";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import { WidgetAdd } from "#components/widgets/WidgetAdd.jsx";
import { WidgetRemove } from "#components/widgets/WidgetRemove.jsx";

function Component() {
  const navigate = useNavigate();

  return (
    <Panel className="oteuhn" style={{ maxWidth: "70%", margin: "auto" }}>
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
    </Panel>
  );
}

export { Component };
