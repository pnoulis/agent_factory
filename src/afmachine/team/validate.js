import { afmTeam, backendTeam } from "./schemas.js";
import { createValidator } from "../createValidator.js";

function validate(team, options) {
  team ||= {};
  options ||= {};
  trace(team, "team.validate() team");
  trace(options, "team.validate() options");

  const _options = {
    form: options.backendForm ? "backend" : "afm",
  };
  trace(_options, "team.validate() _options");

  const validator = validate[_options.form];
  validator(team);

  trace(validator.errors, "team.validate() errors");
  return validator.errors ? [...validator.errors] : null;
}

validate.afm = createValidator(afmTeam);
validate.backend = createValidator(backendTeam);

export { validate };
