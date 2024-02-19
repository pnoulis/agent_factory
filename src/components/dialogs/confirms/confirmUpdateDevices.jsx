import { DialogConfirmStandard } from "./DialogConfirmStandard.jsx";
import { renderDialog } from "../renderDialog.jsx";

function confirmUpdateDevices(action, devices) {
  return new Promise((resolve, reject) => {
    try {
      renderDialog(
        <DialogConfirmStandard
          initialOpen
          heading={`${action} ${
            devices.length > 1
              ? "devices"
              : devices.length === 1
                ? "device"
                : "all devices?"
          }`}
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

export { confirmUpdateDevices };
