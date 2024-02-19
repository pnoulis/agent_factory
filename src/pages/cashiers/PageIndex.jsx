import { TableCashiers } from "#components/tables/TableCashiers.jsx";
import { AwaitCashiers } from "/src/loaders/loadCashiers.jsx";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import { WidgetAdd } from "#components/widgets/WidgetAdd.jsx";
import { WidgetRemove } from "#components/widgets/WidgetRemove.jsx";
import { useNavigate } from "react-router-dom";
import { Center } from "#components/Center.jsx";

function Component() {
  const navigate = useNavigate();
  const selectedCashiersRef = React.useRef([]);

  return (
    <>
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
      <Center>
        <AwaitCashiers>
          {({ cashiers }) => (
            <TableCashiers
              cashiers={cashiers}
              onSelectionChange={(cashiers) => {
                selectedCashiersRef.current = cashiers;
              }}
            />
          )}
        </AwaitCashiers>
      </Center>
    </>
  );
}

export { Component };
