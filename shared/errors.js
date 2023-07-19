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
    super(`${entity} in state ${state} cannot run ${action}`);
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
    super("");
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
/* ------------------------------ PLAYER ERRORS ------------------------------ */
class ERR_PLAYER_REGISTERED extends AgentFactoryError {
  constructor(player) {
    super(`${player.username} already registered`);
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

  // Wristband Errors
  ERR_WRISTBAND_LOCK,
  ERR_WRISTBAND_BOUND,
  ERR_SUPERSEDED_ACTION,

  // Player errors
  ERR_PLAYER_REGISTERED,
};
