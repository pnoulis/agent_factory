function normalize(sources, options = {}) {
  trace("normalize device");
  trace(sources, "device normalize sources");
  trace(options, "device normalize options");

  const _options = {
    nullSupersede: options.nullSupersede || false,
  };
  trace(_options, "device normalize _options");

  const _sources = [sources].flat(2).filter((src) => !!src);
  trace(_sources, "device normalize _sources");

  const target = {
    id: null,
    type: null,
    room: null,
  };
  let status = null;

  if (_options.nullSupersede) {
    for (let i = 0; i < _sources.length; i++) {
      target.id = _sources[i].id || _sources[i].deviceId || null;
      target.type = _sources[i].type || _sources[i].deviceType || null;
      target.room = _sources[i].room || _sources[i].roomType || null;
      status = _sources[i].status || null;
    }
  } else {
    for (let i = 0; i < _sources.length; i++) {
      target.id = _sources[i].id || _sources[i].deviceId || target.id;
      target.type = _sources[i].type || _sources[i].deviceType || target.type;
      target.room = _sources[i].room || _sources[i].roomType || target.room;
      status = _sources[i].status || status;
    }
  }

  if (status) {
    target.status = status;
  }

  trace(target, 'device normalize target');
  return target;
}

export { normalize };
