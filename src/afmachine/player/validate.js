import { afmPlayer, backendPlayer } from "./schemas.js";
import { createValidator } from "../createValidator.js";

function validate(player, options) {
  player ||= {};
  options ||= {};
  trace(player, "player.validate() player");
  trace(options, "player.validate() options");

  const _options = {
    form: options.backendForm ? "backend" : "afm",
  };
  trace(_options, "player.validate() _options");

  const validator = validate[_options.form];
  validator(player);

  trace(validator.errors, "player.validate() errors");
  return validator.errors ? [...validator.errors] : null;
}

validate.afm = createValidator(afmPlayer);
validate.backend = createValidator(backendPlayer);

export { validate };
