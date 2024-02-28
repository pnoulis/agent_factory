import { DialogConfirmStandard } from "./DialogConfirmStandard.jsx";
import { renderDialog } from "../renderDialog.jsx";

function confirmRegisterTeam(team) {
  return new Promise((resolve, reject) => {
    try {
      renderDialog(
        <DialogConfirmStandard
          initialOpen
          heading="merge team"
          onClose={resolve}
        >
          <p>Merge team {team.name} ?</p>
        </DialogConfirmStandard>,
      );
    } catch (err) {
      reject(err);
    }
  });
}

export { confirmRegisterTeam };
