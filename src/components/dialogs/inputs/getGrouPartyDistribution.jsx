import { renderDialog } from "../renderDialog.jsx";
import { DialogInputStandard } from "./DialogInputStandard.jsx";
import { FormGrouPartyDistribution } from "../../forms/FormGrouPartyDistribution.jsx";

function getGrouPartyDistribution() {
  return new Promise((resolve, reject) => {
    try {
      renderDialog(
        <DialogInputStandard
          initialOpen
          heading="Group party distribution"
          onClose={resolve}
          form="form-grouPartyDistribution"
        >
          {(closeDialog) => (
            <FormGrouPartyDistribution
              placeholder={3}
              onSubmit={({ fields }) => {
                closeDialog(fields.distribution || fields.placeholder);
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

export { getGrouPartyDistribution };
