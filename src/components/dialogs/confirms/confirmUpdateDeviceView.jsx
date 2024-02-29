import { DialogConfirmStandard } from "./DialogConfirmStandard.jsx";
import { renderDialog } from "../renderDialog.jsx";

function confirmUpdateDevicesView(view, devices) {
  return new Promise((resolve, reject) => {
    try {
      renderDialog(
        <DialogConfirmStandard
          initialOpen
          heading={`Update devices view to ${view}`}
          onClose={resolve}
        >
          <ul style={{ textAlign: "left" }}>
            {devices.map((device, i) => (
              <li key={i}>{device.id}</li>
            ))}
          </ul>
        </DialogConfirmStandard>,
      );
    } catch (err) {
      reject(err);
    }
  });
}

export { confirmUpdateDevicesView };
