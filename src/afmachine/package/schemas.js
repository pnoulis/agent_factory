import { PACKAGE_TYPES, PACKAGES } from "../../constants.js";
import { unique } from "js_utils/misc";

const afmPackage = {
  type: "object",
  additionalProperties: true,
  required: [
    "id",
    "name",
    "type",
    "amount",
    "cost",
    "t_start",
    "t_end",
    "remainder",
    "state",
  ],
  properties: {
    id: { type: "integer", minimum: 1 },
    name: { type: "string", enum: PACKAGES.map((pkg) => pkg.name) },
    type: { type: "string", enum: unique(Object.values(PACKAGE_TYPES)) },
    amount: { type: "number", minimum: 1 },
    cost: { type: "number", minimum: 1 },
    t_start: { type: "number" }, // MILLISECONDS
    t_end: { type: "number" }, // MILLISECONDS
    remainder: { type: "number" }, // MILLISECONDS OR MISSIONS
    state: {
      oneOf: [
        {
          type: "string",
          enum: ["unregistered", "registered", "playing", "completed"],
        },
        {
          type: "object",
          required: ["name", "order"],
          additionalProperties: true,
          properties: {
            name: {
              type: "string",
              enum: ["unregistered", "registered", "playing", "completed"],
            },
            order: { type: "integer" },
          },
        },
      ],
    },
  },
};

const backendPackage = {
  type: "object",
  additionalProperties: false,
  required: ["id", "name", "cost", "started", "ended"],
  properties: {
    id: { type: "integer" },
    name: { type: "string", enum: PACKAGES.map((pkg) => pkg.name) },
    cost: { type: "null" },
    started: { type: "number" }, // MILLISECONDS
    ended: { type: "number" }, // MILLISECONDS
    active: { type: "boolean" },
  },
};
const backendMissionsPackage = {
  ...backendPackage,
  properties: {
    ...backendPackage.properties,
    missions: { type: "integer" },
    missionsPlayed: { type: "integer" },
  },
};
const backendTimePackage = {
  ...backendPackage,
  properties: {
    ...backendPackage.properties,
    duration: { type: "number" },
    paused: { type: "boolean" },
  },
};

export { afmPackage, backendMissionsPackage, backendTimePackage };
