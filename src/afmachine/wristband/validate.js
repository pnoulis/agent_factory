import { afmForm, backendForm } from "./schemas.js";
import { createValidator } from "../createValidator.js";

function validate(wristband, options) {
  wristband ||= {};
  options ||= {};
  trace(wristband, "wristband.validate() wristband");
  trace(options, "wristband.validate() options");

  const _options = {
    form: options.backendForm ? "backend" : "afm",
  };
  trace(_options, "wristband.validate() _options");

  const validator = validate[_options.form];
  validator(wristband);

  trace(validator.errors, "wristband.validate() errors");
  return validator.errors ? [...validator.errors] : null;
}

validate.afm = createValidator(afmForm);
// validate.backend = createValidator(backendForm);

export { validate };
