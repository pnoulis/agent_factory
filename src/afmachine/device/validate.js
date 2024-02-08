import { afmDevice, backendDevice } from "./schemas.js";
import { createValidator } from "../createValidator.js";

function validate(device, options) {
  device ||= {};
  options ||= {};
  trace(device, "device.validate() device");
  trace(options, "device.validate() options");

  const _options = {
    form: options.backendForm ? "backend" : "afm",
  };
  trace(_options, "device.validate() _options");

  const validator = validate[_options.form];
  validator(device);

  trace(validator.errors, "device.validate() errors");
  return validator.errors ? [...validator.errors] : null;
}

validate.afm = createValidator(afmDevice);
validate.backend = createValidator(backendDevice);

export { validate };
