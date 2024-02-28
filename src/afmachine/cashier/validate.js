import { afmCashier, backendCashier } from "./schemas.js";
import { createValidator } from "../createValidator.js";

function validate(cashier, options) {
  cashier ||= {};
  options ||= {};
  trace(cashier, "cashier.validate() cashier");
  trace(options, "cashier.validate() options");

  const _options = {
    form: options.backendForm ? "backend" : "afm",
  };
  trace(_options, "cashier.validate() _options");

  const validator = validate[_options.form];
  validator(cashier);

  trace(validator.errors, "cashier.validate() errors");
  return validator.errors ? [...validator.errors] : null;
}

validate.afm = createValidator(afmCashier);
validate.backend = createValidator(backendCashier);

export { validate };
