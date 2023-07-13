class AgentFactoryError extends Error {
  constructor(message = "") {
    super(message);
    this.message = 'AgentFactoryError'
  }
}

class ERR_UNSUBSCRIBED extends AgentFactoryError {
  constructor() {
    super('Unsubscribed');
  }
}


export { ERR_UNSUBSCRIBED };
