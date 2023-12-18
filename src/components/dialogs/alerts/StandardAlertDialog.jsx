import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogMsg,
} from "./AlertDialog.jsx";

function StandardAlertDialog({ msg, title, onClose }) {
  return (
    <AlertDialog onClose={onClose}>
      <AlertDialogTitle>{title}</AlertDialogTitle>
      <AlertDialogMsg>{msg}</AlertDialogMsg>
    </AlertDialog>
  );
}

export { StandardAlertDialog };
