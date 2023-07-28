import { MAX_TEAM_SIZE } from "./constants.js";

class AgentFactoryError extends Error {
  constructor(message = "", cause) {
    super(message, { cause });
    this.name = this.constructor.name;
  }
}

class ERR_UNSUBSCRIBED extends AgentFactoryError {
  constructor() {
    super("Unsubscribed");
  }
}

class ERR_MAX_ROSTER_SIZE extends AgentFactoryError {
  constructor() {
    super(`Roster size cannot exceed ${MAX_TEAM_SIZE}`);
  }
}

class ERR_STATE_ACTION_BLOCK extends AgentFactoryError {
  constructor(entity, state, action) {
    super(`${state} ${entity} cannot ${action}`);
    this.entity = entity;
    this.state = state;
    this.action = action;
  }
}

class ERR_TIMEOUT extends AgentFactoryError {
  constructor(err) {
    super("timeout", err && { cause: err });
    this.statusCode = 408;
    this.statusLabel = "Request Timeout";
  }
}

/* ------------------------------ BACKEND SERVICES ERRORS ------------------------------ */
class ERR_BACKEND_VALIDATION extends AgentFactoryError {
  constructor(validationErrors) {
    super("Validation Errors");
    this.name = this.constructor.name;
    this.validationErrors = validationErrors;
    this.statusCode = 400;
    this.statusLabel = "Bad request";
  }
}

class ERR_BACKEND_MODEL extends AgentFactoryError {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.statusLabel = "Conflict";
  }
}

class ERR_MQTT_TANGLED_MSG extends AgentFactoryError {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

/* ------------------------------ WRISTBAND ERRORS ------------------------------ */
class ERR_WRISTBAND_LOCK extends AgentFactoryError {
  constructor() {
    super("Wristband scan handle locked!");
  }
}

class ERR_WRISTBAND_BOUND extends AgentFactoryError {
  constructor(number) {
    super(`Scanned wristband ${number} is paired to another player`);
  }
}

class ERR_SUPERSEDED_ACTION extends AgentFactoryError {
  constructor() {
    super();
  }
}

class ERR_WRISTBAND_COLOR_OUT_OF_BOUNDS extends AgentFactoryError {
  constructor(colorCode) {
    super(`Wristband colorCode ${colorCode} failed to match any color`);
  }
}
/* ------------------------------ PLAYER ERRORS ------------------------------ */
class ERR_PLAYER_REGISTERED extends AgentFactoryError {
  constructor(player) {
    super(`${player.username} already registered`);
  }
}

/* ------------------------------ TEAM ERRORS ------------------------------ */
class ERR_TEAM_MERGE_MISSING_NAME extends AgentFactoryError {
  constructor() {
    super("Missing team name");
  }
}
class ERR_TEAM_MERGE_INSUFFICIENT_PLAYERS extends AgentFactoryError {
  constructor() {
    super("Team requires a minimum of 2 players to merge");
  }
}

class ERR_TEAM_MERGE_UNPAIRED_PLAYERS extends AgentFactoryError {
  constructor(unpairedPlayers) {
    const ln = unpairedPlayers.length;
    super(
      `Player${ln > 1 ? "s" : ""} ${unpairedPlayers.join(", ")} need${ln > 1 ? "" : "s"
      } to pair a wristband`,
    );
  }
}

class ERR_TEAM_MERGE_DUPLICATE_COLORS extends AgentFactoryError {
  constructor(color) {
    super(`Duplicate ${color} wristband found in team`);
  }
}

export {
  AgentFactoryError,
  ERR_UNSUBSCRIBED,
  ERR_MAX_ROSTER_SIZE,
  ERR_STATE_ACTION_BLOCK,
  ERR_TIMEOUT,

  // Backend Service Errors
  ERR_BACKEND_VALIDATION,
  ERR_BACKEND_MODEL,
  ERR_MQTT_TANGLED_MSG,

  // Wristband Errors
  ERR_WRISTBAND_LOCK,
  ERR_WRISTBAND_BOUND,
  ERR_SUPERSEDED_ACTION,
  ERR_WRISTBAND_COLOR_OUT_OF_BOUNDS,

  // Player errors
  ERR_PLAYER_REGISTERED,

  // Team errors
  ERR_TEAM_MERGE_MISSING_NAME,
  ERR_TEAM_MERGE_INSUFFICIENT_PLAYERS,
  ERR_TEAM_MERGE_UNPAIRED_PLAYERS,
  ERR_TEAM_MERGE_DUPLICATE_COLORS,
};
