import { DialogConfirmStandard } from "./DialogConfirmStandard.jsx";
import { renderDialog } from "../renderDialog.jsx";

function confirmRegisterCashier(cashier) {
  return new Promise((resolve, reject) => {
    try {
      renderDialog(
        <DialogConfirmStandard
          initialOpen
          heading="register cashier"
          onClose={resolve}
        >
          <p>{`${t("Register cashier")} ${cashier.username}?`}</p>
        </DialogConfirmStandard>,
      );
    } catch (err) {
      reject(err);
    }
  });
}

export { confirmRegisterCashier };
