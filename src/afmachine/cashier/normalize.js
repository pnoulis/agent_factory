import { isArray } from "js_utils/misc";

function normalize(sources, options = {}) {
  trace("normalize cashier");

  const _options = {
    nullSupersede: options.nullSupersede ?? false,
  };
  trace(_options, "cashier _options");

  const _sources = [sources].flat(2).filter((src) => !!src);
  trace(_sources, "cashier _sources");

  const target = {
    id: null,
    username: "",
    email: "",
    role: "cashier",
  };

  if (_options.nullSupersede) {
    for (let i = 0; i < _sources.length; i++) {
      target.id = _sources[i].id ?? null;
      target.username = _sources[i].username || "";
      target.email = _sources[i].email || "";
      target.role = _sources[i].role || _sources[i].roles || "";
    }
  } else {
    for (let i = 0; i < _sources.length; i++) {
      target.id = _sources[i].id ?? target.id;
      target.username = _sources[i].username || target.username;
      target.email = _sources[i].email || target.email;
      target.role = _sources[i].role || _sources[i].roles || target.role;
    }
  }
  trace(_sources, "cashier _sources");

  if (isArray(target.role)) {
    // [ROLE_CASHIER] -> cashier
    target.role = target.role.at(0).split("_").at(1).toLowerCase();
  }

  trace(target, "cashier target");
  return target;
}

export { normalize };
