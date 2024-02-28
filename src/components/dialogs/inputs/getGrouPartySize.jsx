import { renderDialog } from "../renderDialog.jsx";
import { DialogInputStandard } from "./DialogInputStandard.jsx";
import { FormGrouPartySize } from "../../forms/FormGrouPartySize.jsx";

function getGrouPartySize() {
  return new Promise((resolve, reject) => {
    try {
      renderDialog(
        <DialogInputStandard
          initialOpen
          heading="new group party"
          onClose={resolve}
          form="form-grouPartySize"
        >
          {(closeDialog) => (
            <FormGrouPartySize
              placeholder={6}
              onSubmit={({ fields }) => {
                closeDialog(fields);
              }}
            />
          )}
        </DialogInputStandard>,
      );
    } catch (err) {
      reject(err);
    }
  });
}

export { getGrouPartySize };
