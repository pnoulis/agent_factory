import { renderDialog } from "#components/dialogs/renderDialog.jsx";
import { confirmStopSession } from "#components/dialogs/confirms/confirmStopSession";
import { DialogAlertStandard } from "#components/dialogs/alerts/DialogAlertStandard.jsx";
import { confirmLogoutSession } from "#components/dialogs/confirms/confirmLogoutSession.jsx";
import { confirmLogoutCashier } from "#components/dialogs/confirms/confirmLogoutCashier.jsx";
import { home, cashoutCashier } from "/src/links.jsx";

async function logout(navigate) {
  let msg;
  try {
    const cashier = JSON.parse(window.localStorage.getItem("cashier"));
    if (!cashier) {
      renderDialog(
        <DialogAlertStandard
          initialOpen
          heading="logout cashier"
          msg="Could not locate cashier in localStorage"
        />,
      );
      window.localStorage.removeItem("cashier");
      navigate(home.path);
    } else if (cashier.session && (await confirmLogoutSession(cashier))) {
      navigate(cashoutCashier.path);
    } else if (await confirmLogoutCashier(cashier)) {
      window.localStorage.removeItem("cashier");
      navigate(home.path);
    }
  } catch (err) {
    msg = err.message;
    throw err;
  } finally {
    msg &&
      renderDialog(
        <DialogAlertStandard initialOpen heading="logout cashier" msg={msg} />,
      );
  }
}

async function login(navigate, form) {
  let msg;
  let cmd;
  try {
    cmd = await afm.loginCashier(form, form.password);
    msg = cmd.msg;
    const { session } = await afm.listSession().parse();

    if (!session.active) {
      cmd = await afm.startSession(cashier);
      msg = cmd.msg;
      cashier.session = true;
    }

    cashier.session ??= session.user.username === cashier.username;
    window.localStorage.setItem("cashier", JSON.stringify(cashier));
    navigate(home.path);
  } catch (err) {
    msg = err.msg || err.message;
    throw err;
  } finally {

  }
}

async function cashout(navigate, comment) {
  try {
    const cashier = JSON.parse(window.localStorage.getItem("cashier"));
    if (!cashier) {
      return renderDialog(
        <DialogAlertStandard
          initialOpen
          heading="logout cashier"
          msg={`Could not locate cashier in localStorage`}
          onClose={() => {
            window.localStorage.removeItem("cashier");
          }}
        />,
      );
    } else if (!(await confirmStopSession(cashier))) {
      return Promise.resolve();
    }

    const res = await parsecmd(afm.stopSession(cashier, comment));
    renderDialog(
      <DialogAlertStandard
        initialOpen
        heading="cashout cashier"
        msg={`${cashier.username} cashed out!`}
      />,
    );
    window.localStorage.removeItem("cashier");
    navigate(home.path);
  } catch (err) {
    renderDialog(
      <DialogAlertStandard
        initialOpen
        heading="cashout cashier"
        msg={err.cause?.message || err.message}
      />,
    );
    throw err;
  }
}

export { logout, login, cashout };
