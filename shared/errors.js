import { MAX_TEAM_SIZE } from "./constants.js";
class AgentFactoryError extends Error {
  constructor(message = "") {
    super(message);
    this.name = "AgentFactoryError";
  }
}

class ERR_UNSUBSCRIBED extends AgentFactoryError {
  constructor() {
    super("Unsubscribed");
  }
}

class ERR_WRISTBAND_LOCK extends AgentFactoryError {
  constructor() {
    super("Wristband scan handle locked!");
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

export {
  ERR_UNSUBSCRIBED,
  ERR_WRISTBAND_LOCK,
  ERR_MAX_ROSTER_SIZE,
  ERR_STATE_ACTION_BLOCK,
};
