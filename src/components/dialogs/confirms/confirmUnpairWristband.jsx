import { DialogConfirmStandard } from "./DialogConfirmStandard.jsx";
import { renderDialog } from "../renderDialog.jsx";

function confirmUnpairWristband(player) {
  return new Promise((resolve, reject) => {
    try {
      renderDialog(
        <DialogConfirmStandard
          initialOpen
          heading="unpair wristband?"
          onClose={resolve}
        >
          <p>Unpair wristband of {player?.username}</p>
        </DialogConfirmStandard>,
      );
    } catch (err) {
      reject(err);
    }
  });
}

export { confirmUnpairWristband };
