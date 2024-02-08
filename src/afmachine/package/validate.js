import {
  afmPackage,
  backendMissionsPackage,
  backendTimePackage,
} from "./schemas.js";
import { createValidator } from "../createValidator.js";

function validate(pkg, options) {
  pkg ||= {};
  options ||= {};
  trace(pkg, "pkg.validate() pkg");
  trace(options, "pkg.validate() options");

  const _options = {
    form: options.backendForm || "afm",
  };
  trace(_options, "pkg.validate() _options");

  // throws TypeError if backendForm and pkg.type is not
  // either mission or time
  const validator = validate[_options.form];
  validator(pkg);

  trace(validator.errors, "pkg.validate() errors");
  return validator.errors ? [...validator.errors] : null;
}

validate.afm = createValidator(afmPackage);
validate.mission = createValidator(backendMissionsPackage);
validate.time = createValidator(backendTimePackage);

export { validate };
