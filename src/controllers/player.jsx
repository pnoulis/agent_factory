import { renderDialog } from "#components/dialogs/renderDialog.jsx";
import { DialogAlertStandard } from "../components/dialogs/alerts/DialogAlertStandard.jsx";
import { confirmRegisterPlayer } from "../components/dialogs/confirms/confirmRegisterPlayer.jsx";

async function register(form) {
  if (!(await confirmRegisterPlayer(form))) {
    return Promise.resolve();
  }

  let msg;
  try {
    msg = await afm.registerPlayer(form, form.password);
    return msg.res;
  } catch (err) {
    msg = err;
    throw getErr(err);
  } finally {
    msg &&
      renderDialog(
        <DialogAlertStandard
          initialOpen
          heading="register player"
          msg={getMsg(msg)}
        />,
      );
  }
}

export { register };
