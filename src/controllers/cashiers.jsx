import { renderDialog } from "../components/dialogs/renderDialog.jsx";
import { DialogAlertStandard } from "../components/dialogs/alerts/DialogAlertStandard.jsx";
import { confirmRegisterCashier } from "../components/dialogs/confirms/confirmRegisterCashier.jsx";
import { confirmDeregisterCashier } from "../components/dialogs/confirms/confirmDeregisterCashier.jsx";
import { AlertDeregisterCashiers } from "../components/dialogs/alerts/AlertDeregisteredCashiers.jsx";
import { cashiers as linkCashiers } from "/src/links.jsx";

async function register(navigate, form) {
  if (!(await confirmRegisterCashier(form))) {
    return Promise.resolve();
  }
  let msg;
  try {
    msg = await afm.registerCashier(form, form.password);
    navigate(linkCashiers.path);
  } catch (err) {
    msg = err;
    throw getErr(err);
  } finally {
    msg &&
      renderDialog(
        <DialogAlertStandard
          initialOpen
          heading="register cashier"
          msg={getMsg(msg)}
        />,
      );
  }
}

async function deregister(cashiers) {
  if (!cashiers.length) {
    return renderDialog(
      <DialogAlertStandard
        initialOpen
        heading="deregister cashiers"
        msg="No cashier's selected"
      />,
    );
  } else if (!(await confirmDeregisterCashier(cashiers))) {
    return Promise.resolve();
  }

  try {
    const cmds = await Promise.allSettled(
      cashiers.map((cashier) => afm.deregisterCashier(cashier)),
    );
    renderDialog(
      <AlertDeregisterCashiers
        initialOpen
        heading="deregister cashiers"
        cmds={cmds}
      />,
    );
  } catch (err) {
    renderDialog(
      <DialogAlertStandard
        initialOpen
        heading="deregister cashiers"
        msg={getMsg(err)}
      />,
    );
  }
}

export { register, deregister };
