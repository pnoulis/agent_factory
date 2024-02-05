import Ajv from "ajv";
import { wristband } from "./wristband.js";

const ajv = new Ajv({
  allErrors: true,
  coerceType: true,
  allowUnionType: true,
});

const validate = {
  wristband: ajv.compile(wristband),
};

export { validate };
