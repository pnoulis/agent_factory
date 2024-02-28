import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { isFunction } from "js_utils/misc";

const rootId = "modals-react-root";

function renderDialog(Dialog, props, onClose) {
  if (isFunction(props)) {
    onClose = props;
    props = {};
  }

  const root = document.getElementById(rootId);
  if (!root) {
    throw craterr(({ EGENERIC }) =>
      EGENERIC(`Missing dialogs root: ${rootId}`),
    );
  }

  ReactDOM.createRoot(root).render(
    <>
      {React.isValidElement(Dialog) ? (
        Dialog
      ) : (
        <Dialog initialOpen={true} onClose={onClose} {...props} />
      )}
    </>,
  );
}

export { renderDialog };
