import { DialogConfirmStandard } from "./DialogConfirmStandard.jsx";
import { renderDialog } from "../renderDialog.jsx";

function confirmActivateTeamPackage() {
  return new Promise((resolve, reject) => {
    try {
      renderDialog(
        <DialogConfirmStandard
          initialOpen
          heading="Team package"
          onClose={resolve}
        >
          Start team package?
        </DialogConfirmStandard>,
      );
    } catch (err) {
      reject(err);
    }
  });
}

export { confirmActivateTeamPackage };
