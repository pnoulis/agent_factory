import { isObject, isArray, unique } from "js_utils/misc";
import { Player } from "../../player/thin/Player.js";

function normalize(sources, options = {}) {
  // debug("normalize roster");
  const _sources = unique(
    [sources].flat(2).reduce((cdr, src) => {
      if (src == null) return cdr;
      src = Object.hasOwn(src, "roster") ? src.roster : src;
      if (src instanceof Map) {
        cdr.push(...Array.from(src.values()));
      } else if (isArray(src)) {
        cdr.push(...src);
      } else if (isObject(src)) {
        cdr.push(src);
      }
      return cdr;
    }, []),
  ).reduce(
    (cdr, src, i) => {
      if (src.username !== "") {
        Object.hasOwn(cdr, src.username)
          ? cdr[src.username].push(src)
          : (cdr[src.username] = [src]);
      } else if (src.name !== "") {
        Object.hasOwn(cdr, src.name)
          ? cdr[src.name].push(src)
          : (cdr[src.name] = [src]);
      } else if (src.surname !== "") {
        Object.hasOwn(cdr, src.surname)
          ? cdr[src.surname].push(src)
          : (cdr[src.surname] = [src]);
      } else if (src.email !== "") {
        Object.hasOwn(cdr, src.email)
          ? cdr[src.email].push(src)
          : (cdr[src.email] = [src]);
      } else {
        cdr.singles.push(src);
      }
      return cdr;
    },
    { singles: [] },
  );
  // debug(_sources);

  // second pass
  const __sources = [..._sources.singles];
  delete _sources.singles;
  __sources.push(...Object.values(_sources));
  // debug(__sources);

  const target = __sources.map((src) => Player.normalize(src, options));
  // debug(target);
  return target;
}

export { normalize };
