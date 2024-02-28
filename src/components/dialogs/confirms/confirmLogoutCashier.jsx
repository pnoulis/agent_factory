import { DialogConfirmStandard } from "./DialogConfirmStandard.jsx";
import { renderDialog } from "../renderDialog.jsx";

function confirmLogoutCashier(cashier) {
  return new Promise((resolve, reject) => {
    try {
      renderDialog(
        <DialogConfirmStandard
          initialOpen
          heading="logout cashier"
          onClose={resolve}
        >
          <p>logout cashier {cashier.username} ?</p>
        </DialogConfirmStandard>,
      );
    } catch (err) {
      reject(err);
    }
  });
}

export { confirmLogoutCashier };
