import { StandardAlertDialog } from "./StandardAlertDialog.jsx";

function AlertSuccessfullTeamMerge({ teamName, onClose }) {
  return (
    <StandardAlertDialog
      onClose={onClose}
      title="Merge team"
      msg={`${teamName} successfully merged!`}
    />
  );
}

export { AlertSuccessfullTeamMerge };
