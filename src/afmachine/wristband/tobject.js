// wristband = AFM FORM

/*
  debug(Wristband.tobject());
  debug(Wristband.tobject(null, { backendForm: true }));
  debug(Wristband.tobject(null, { defaultState: "paired" }));
  debug(Wristband.tobject(null, { defaultState: "paired", backendForm: true }));
 */
function tobject(wristband, options) {
  wristband ??= {};
  options ??= {};
  const _options = {
    defaultState: options.defaultState || "unpaired",
    backendForm: options.backendForm || false,
  };
  trace(_options, "wristband.tobject() options");

  const afmWristband = {
    id: wristband.id || null,
    color: wristband.color || null,
    colorCode: wristband.colorCode || null,
    state: wristband.state?.name || wristband.state || _options.defaultState,
  };

  if (!_options.backendForm) return afmWristband;

  return {
    wristbandNumber: afmWristband.id,
    wristbandColor: afmWristband.colorCode,
    active: afmWristband.state === "paired",
  };
}

export { tobject };
