import { DialogConfirmStandard } from "./DialogConfirmStandard.jsx";
import { renderDialog } from "../renderDialog.jsx";

function confirmRegisterGroupTeam(teams) {
  return new Promise((resolve, reject) => {
    try {
      renderDialog(
        <DialogConfirmStandard
          initialOpen
          heading={`merge group party ${teams.length > 1 ? "teams" : "team"}?`}
          onClose={resolve}
        >
          <ul style={{ textAlign: "left" }}>
            {teams.map((team, i) => (
              <li key={i}>{team.name}</li>
            ))}
          </ul>
        </DialogConfirmStandard>,
      );
    } catch (err) {
      reject(err);
    }
  });
}

export { confirmRegisterGroupTeam };
