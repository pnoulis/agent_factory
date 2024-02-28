import { renderDialogPromise } from "#components/dialogs/renderDialogPromise.jsx";
import { confirmStopSession } from "#components/dialogs/confirms/confirmStopSession";
import { DialogAlertStandard } from "#components/dialogs/alerts/DialogAlertStandard.jsx";
import { confirmLogoutSession } from "#components/dialogs/confirms/confirmLogoutSession.jsx";
import { confirmLogoutCashier } from "#components/dialogs/confirms/confirmLogoutCashier.jsx";
import { home, cashoutCashier } from "./links.jsx";

async function logout(navigate) {
  let cashier;
  try {
    cashier = JSON.parse(window.localStorage.getItem("cashier"));
    if (!cashier) {
      return await renderDialogPromise(
        <DialogAlertStandard
          initialOpen
          heading="logout cashier"
          msg={`Could not locate cashier in localStorage`}
        />,
      );
    } else if (cashier.session) {
      if (await confirmLogoutSession(cashier)) {
        return navigate(cashoutCashier.path);
      }
    } else if (!(await confirmLogoutCashier(cashier))) {
      return Promise.resolve();
    }

    window.localStorage.removeItem("cashier");
    navigate(home.path);
  } catch (err) {
    await renderDialogPromise(
      <DialogAlertStandard
        initialOpen
        heading="logout cashier"
        msg={`Failed to logout cashier ${cashier?.username}`}
      />,
    );
    throw err;
  }
}

async function login(navigate, form) {
  try {
    const { cashier } = await parsecmd(afm.loginCashier(form, form.password));
    const { session } = await parsecmd(afm.listSession());
    if (!session.active) {
      await parsecmd(afm.startSession(cashier));
      cashier.session = true;
      await renderDialogPromise(
        <DialogAlertStandard
          initialOpen
          heading="login cashier"
          msg={`${cashier.username} started a cashout session`}
        />,
      );
    }

    cashier.session ??= session.user.username === cashier.username;
    window.localStorage.setItem("cashier", JSON.stringify(cashier));
    navigate(home.path);
  } catch (err) {
    await renderDialogPromise(
      <DialogAlertStandard
        initialOpen
        heading="login cashier"
        msg={err.cause?.message || err.message}
      />,
    );
    throw err;
  }
}

async function cashout(navigate, comment) {
  try {
    const cashier = JSON.parse(window.localStorage.getItem("cashier"));
    if (!cashier) {
      return await renderDialogPromise(
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
    await renderDialogPromise(
      <DialogAlertStandard
        initialOpen
        heading="cashout cashier"
        msg={`${cashier.username} cashed out!`}
      />,
    );
    window.localStorage.removeItem("cashier");
    navigate(home.path);
  } catch (err) {
    await renderDialogPromise(
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
