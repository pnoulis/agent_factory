function tobject(team, options) {
  team ||= {};
  options ||= {};

  const _options = {
    depth: options.depth ?? 2, // Player + Wristband
    backendForm: options.backendForm || false,
    defaultState: options.defaultState || "unregistered",
  };
  trace(_options, "team.tobject() _options");
}

export { tobject };
