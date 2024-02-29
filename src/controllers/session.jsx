import { renderDialog } from "../components/dialogs/renderDialog.jsx";
import { confirmStopSession } from "../components/dialogs/confirms/confirmStopSession";
import { DialogAlertStandard } from "../components/dialogs/alerts/DialogAlertStandard.jsx";
import { confirmLogoutSession } from "../components/dialogs/confirms/confirmLogoutSession.jsx";
import { confirmLogoutCashier } from "../components/dialogs/confirms/confirmLogoutCashier.jsx";
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
          msg="Could not locate cashier in storage"
        />,
      );
    } else if (cashier.session) {
      if (await confirmLogoutSession(cashier)) {
        return navigate(cashoutCashier.path);
      } else {
        msg = "Successfully logged out Cashier";
        window.localStorage.removeItem("cashier");
        navigate(home.path);
      }
    } else if (!(await confirmLogoutCashier(cashier))) {
      return Promise.resolve();
    }
    msg = "Successfully logged out Cashier";
    window.localStorage.removeItem("cashier");
    navigate(home.path);
  } catch (err) {
    msg = getMsg(err);
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
  try {
    const { cashier, ...res } = await afm
      .loginCashier(form, form.password)
      .parse();
    msg = getMsg(res);

    const { session } = await afm.listSession().parse();
    if (!session.active) {
      msg = getMsg(await afm.startSession(cashier));
      cashier.session = true;
    }

    cashier.session ??= session.user.username === cashier.username;
    window.localStorage.setItem("cashier", JSON.stringify(cashier));
    navigate(home.path);
  } catch (err) {
    msg = getMsg(err);
    throw err;
  } finally {
    msg &&
      renderDialog(
        <DialogAlertStandard initialOpen heading="login cashier" msg={msg} />,
      );
  }
}

async function cashout(navigate, comment) {
  let msg;
  try {
    const cashier = JSON.parse(window.localStorage.getItem("cashier"));
    if (!cashier) {
      renderDialog(
        <DialogAlertStandard
          initialOpen
          heading="cashout cashier"
          msg="Could not locate cashier in storage"
        />,
      );
    } else if (await confirmStopSession(cashier)) {
      msg = getMsg(await afm.stopSession(cashier, comment));
    }
    window.localStorage.removeItem("cashier");
    navigate(home.path);
  } catch (err) {
    msg = getMsg(err);
    throw err;
  } finally {
    msg &&
      renderDialog(
        <DialogAlertStandard initialOpen heading="cashout cashier" msg={msg} />,
      );
  }
}

export { logout, login, cashout };
