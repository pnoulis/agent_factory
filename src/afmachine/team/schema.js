import {
  afmPackage,
  backendMissionsPackage,
  backendTimePackage,
} from "../package/schema.js";
import { afmPlayer } from "../player/schemas.js~";
import { unique } from "js_utils/misc";
import { TEAM_STATES } from "../../constants.js";

const afmTeam = {
  type: "object",
  additionalProperties: true,
  required: ["name", "t_created", "points", "state", "packages", "roster"],
  properties: {
    name: { type: "string", minLength: 1 },
    t_created: { type: "number", minimum: 1 },
    points: { type: "integer" },
    state: {
      oneOf: [
        {
          type: "string",
          enum: ["unregistered", "registered", "playing"],
        },
        {
          type: "object",
          required: ["name", "order"],
          additionalProperties: true,
          properties: {
            name: {
              type: "string",
              enum: ["unregistered", "registered", "playing"],
            },
            order: { type: "integer" },
          },
        },
      ],
    },
    packages: {
      type: "array",
      items: afmPackage,
    },
    roster: {
      type: "array",
      items: afmPlayer,
    },
  },
};

const backendTeam = {
  type: "object",
  additionalProperties: false,
  required: [
    "name",
    "totalPoints",
    "teamState",
    "created",
    "lastRegisterAttempt",
    "currentRoster",
    "roomType",
    "packages",
  ],
  properties: {
    name: { type: "string", minLength: 1 },
    totalPoints: { type: "integer" },
    teamState: {
      type: "string",
      enum: unique(Object.values(TEAM_STATES)),
    },
    created: { type: "number" },
    lastRegisterAttempt: { type: ["integer", "null"] },
    roomType: { type: "string" },
    currentRoster: {
      type: "object",
      additionalProperties: false,
      required: ["version", "players"],
      properties: {
        version: schemas.team.version,
        players: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["username", "wristbandNumber", "wristbandColor"],
            properties: {
              username: { type: "string", minLength: 1 },
              wristbandNumber: {
                type: "integer",
                minimum: MIN_WRISTBAND_ID,
                maximum: MAX_WRISTBAND_ID,
              },
              wristbandColor: {
                type: "integer",
                minimum: MIN_WRISTBAND_CC,
                maximum: MAX_WRISTBAND_CC,
              },
            },
          },
        },
      },
    },
    packages: {
      type: "array",
      items: {
        oneOf: [backendMissionsPackage, backendTimePackage],
      },
    },
  },
};

export { afmTeam };
