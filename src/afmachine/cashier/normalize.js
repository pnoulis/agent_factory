import { isArray } from "js_utils/misc";

function normalize(sources, options) {
  trace("normalize cashier");
  trace(sources, "cashier normalize sources");
  trace(options, "cashier normalize options");

  options ||= {};
  const _options = {
    nullSupersede: options.nullSupersede || false,
  };
  trace(_options, "cashier normalize _options");

  const _sources = [sources].flat(2).filter((src) => !!src);
  trace(_sources, "cashier normalize _sources");

  const target = {
    id: null,
    username: null,
    email: null,
    role: null,
  };

  if (_options.nullSupersede) {
    for (let i = 0; i < _sources.length; i++) {
      target.id = _sources[i].id || null;
      target.username = _sources[i].username || null;
      target.email = _sources[i].email || null;
      target.role = _sources[i].role || _sources[i].roles || null;
    }
  } else {
    for (let i = 0; i < _sources.length; i++) {
      target.id = _sources[i].id || target.id;
      target.username = _sources[i].username || target.username;
      target.email = _sources[i].email || target.email;
      target.role = _sources[i].role || _sources[i].roles || target.role;
    }
  }
  if (isArray(target.role)) {
    // [ROLE_CASHIER] -> cashier
    target.role = target.role.at(0).split("_").at(1).toLowerCase();
  }

  trace(target, "cashier normalize target");
  return target;
}

export { normalize };
