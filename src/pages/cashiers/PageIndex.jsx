import { TableCashiers } from "#components/tables/TableCashiers.jsx";
import { AwaitCashiers } from "/src/loaders/loadCashiers.jsx";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import { WidgetAdd } from "#components/widgets/WidgetAdd.jsx";
import { WidgetRemove } from "#components/widgets/WidgetRemove.jsx";
import { useNavigate } from "react-router-dom";
import { Center } from "#components/Center.jsx";
import { confirmDeregisterCashier } from "#components/dialogs/confirms/confirmDeregisterCashier.jsx";
import { AwaitCommand } from "#components/await-command/AwaitCommand.jsx";
import { renderDialog } from "#components/dialogs/renderDialog.jsx";
import { DialogAlertStandard } from "../../components/dialogs/alerts/DialogAlertStandard.jsx";

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
            onClick={async (e) => {
              if (!selectedCashiersRef.current.length) {
                return renderDialog(
                  <DialogAlertStandard
                    initialOpen
                    heading="deregister cashiers"
                    msg="Empty cashier selection"
                  />,
                );
              }
              const yes = await confirmDeregisterCashier(
                selectedCashiersRef.current,
              );
              if (!yes) return;
              for (const cashier of selectedCashiersRef.current) {
                afm.deregisterCashier(cashier);
              }
            }}
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
        <AwaitCommand revalidate cmd={afm.deregisterCashier}>
          <AwaitCashiers>
            {({ cashiers }) => (
              <TableCashiers
                key={cashiers}
                cashiers={cashiers}
                onSelectionChange={(cashiers) => {
                  selectedCashiersRef.current = cashiers;
                }}
              />
            )}
          </AwaitCashiers>
        </AwaitCommand>
      </Center>
    </>
  );
}

export { Component };
