import { confirmDeregisterCashier } from "#components/dialogs/confirms/confirmDeregisterCashier.jsx";
import { renderDialogPromise } from "#components/dialogs/renderDialogPromise.jsx";
import { DialogAlertStandard } from "#components/dialogs/alerts/DialogAlertStandard.jsx";

async function deregisterCashiers(cashiers) {
  if (!cashiers.length) {
    return renderDialogPromise(
      <DialogAlertStandard
        initialOpen
        heading="deregister cashiers"
        msg="No cashier's selected!"
      />,
    );
  } else if (!(await confirmDeregisterCashier(cashiers))) {
    return Promise.resolve();
  }

  try {
    await Promise.all(
      cashiers.map((cashier) => afm.deregisterCashier(cashier).parse()),
    );
    await renderDialogPromise(
      <DialogAlertStandard
        initialOpen
        heading="deregister cashiers"
        msg={`Successfully deregistered cashiers`}
      />,
    );
  } catch (err) {
    await renderDialogPromise(
      <DialogAlertStandard heading="deregister cashiers" msg={err.message} />,
    );
  }
}

export { deregisterCashiers };
