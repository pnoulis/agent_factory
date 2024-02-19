import { DialogConfirmStandard } from "./DialogConfirmStandard.jsx";
import { renderDialog } from "../renderDialog.jsx";

function confirmDeregisterCashier(cashiers) {
  return new Promise((resolve, reject) => {
    try {
      renderDialog(
        <DialogConfirmStandard
          initialOpen
          heading="deregister cashiers?"
          onClose={resolve}
        >
          <ul style={{ textAlign: "left" }}>
            {cashiers.map((cashier, i) => (
              <li key={i}>{cashier.username}</li>
            ))}
          </ul>
        </DialogConfirmStandard>,
      );
    } catch (err) {
      reject(err);
    }
  });
}

export { confirmDeregisterCashier };
