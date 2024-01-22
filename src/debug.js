function debug(any) {
  console.dir(any, { depth: null });
}

function logStateChange(eventful) {
  eventful.on("stateChange", (nstate, ostate, entity) => {
    debug(`${entity.constructor.name} changed state: ${ostate} -> ${nstate}`);
  });
}

globalThis.debug = debug;
globalThis.logStateChange = logStateChange;
