import { pkg } from "./pkg.js";
import deepmerge from "deepmerge";

const pkg_team = {
  type: "object",
  properties: {
    name: pkg.properties.name,
    cost: pkg.properties.cost,
    id: {
      type: "number",
    },
    started: {
      type: "number",
      nullable: true,
    },
    ended: {
      type: "number",
      nullable: true,
    },
    active: {
      type: "boolean",
    },
  },
};

const pkg_team_time = deepmerge(pkg_team, {
  properties: {
    duration: {
      type: "number",
      nullable: true,
    },
    paused: {
      type: "boolean",
    },
  },
  additionalProperties: false,
});

const pkg_team_mission = deepmerge(pkg_team, {
  properties: {
    missions: {
      type: "integer",
    },
    missionsPlayed: {
      type: "integer",
      nullable: true,
    },
  },
  additionalProperties: false,
});

export { pkg_team_time, pkg_team_mission };
