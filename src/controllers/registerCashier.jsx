import { renderDialogPromise } from "#components/dialogs/renderDialogPromise.jsx";
import { DialogAlertStandard } from "../components/dialogs/alerts/DialogAlertStandard.jsx";

async function registerCashier(navigate, fields) {
  let cmd;
  try {
    cmd = await afm.registerCashier(fields, fields.password);
  } catch (err) {
    cmd = err;
    throw cmd.errs.at(-1);
  } finally {
    renderDialogPromise(
      <DialogAlertStandard
        initialOpen
        heading="register cashier"
        msg={cmd.msg}
      />,
    );
  }
}

export { registerCashier };
