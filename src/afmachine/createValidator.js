import Ajv from "ajv";

const ajv = new Ajv({
  allErrors: true,
  coerceTypes: true,
  allowUnionTypes: true,
});

function createValidator(schema) {
  return ajv.compile(schema);
}

export { createValidator };
