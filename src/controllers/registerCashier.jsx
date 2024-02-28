import { renderDialog } from "#components/dialogs/renderDialog.jsx";
import { DialogAlertStandard } from "../components/dialogs/alerts/DialogAlertStandard.jsx";
import { cashiers } from "/src/links.jsx";

async function registerCashier(navigate, fields) {
  let cmd;
  try {
    cmd = await afm.registerCashier(fields, fields.password);
    navigate(cashiers.path);
  } catch (err) {
    cmd = err;
    throw err;
  } finally {
    renderDialog(
      <DialogAlertStandard
        initialOpen
        heading="register cashier"
        msg={cmd.msg || cmd.message}
      />,
    );
  }
}

export { registerCashier };
