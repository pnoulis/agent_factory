import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { isFunction } from "js_utils/misc";

const rootId = "modals-react-root";

function renderDialogPromise(Dialog, props, onClose) {
  return new Promise((resolve, reject) => {
    if (isFunction(props)) {
      onClose = props;
      props = {};
    }
    try {
      const root = document.getElementById(rootId);
      if (!root) {
        throw craterr(({ EGENERIC }) =>
          EGENERIC(`Missing dialogs root: ${rootId}`),
        );
      }

      const fn = Dialog.props?.onClose || onClose;
      const _onClose = () => resolve(fn?.());

      if (React.isValidElement(Dialog)) {
        ReactDOM.createRoot(root).render(
          React.cloneElement(Dialog, { onClose: _onClose }),
        );
      } else {
        ReactDOM.createRoot(root).render(
          <Dialog initialOpen onClose={_onClose} {...props} />,
        );
      }
    } catch (err) {
      reject(err);
    }
  });
}

export { renderDialogPromise };
