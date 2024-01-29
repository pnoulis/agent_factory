import { isObject, isArray, unique } from "js_utils/misc";
import { Player } from "../player/Player.js";

function normalize(sources, options = {}) {
  // debug("normalize roster");

  debug("options", options);
  debug("sources", sources, { depth: 1 });

  // Reduce sources into unique players. If a Player
  // is repeated within the set but is not the exact same
  // object, it is assumed that the caller intended for
  // the Player permutations to be merged.
  // The __sources output looks like that in the end:
  // [ [PlayerAA_#1, PlayerAA_#2], PlayerBB, PlayerCC, [ PlayerCC_#1, PlayerCC_#2]]
  const _sources = (function findPlayer(src, accumulate) {
    if (isArray(src)) {
      for (let i = 0; i < src.length; i++) {
        findPlayer(src[i], accumulate);
      }
    } else if (Object.hasOwn(src, "roster")) {
      findPlayer(src.roster, accumulate);
    } else if (isObject(src)) {
      accumulate(src);
    }
    return accumulate;
  })([sources], []);

  const __sources = unique(
    [sources].flat(2).reduce((cdr, src) => {
      if (src == null) return cdr;

      if (src != null) {
        Object.hasOwn(src, "roster") ? cdr.push(...src.roster) : cdr.push(src);
      }
      return cdr;
    }, []),
  );

  debug("__sources", __sources, { depth: 1 });

  return;

  // const _sources = unique(
  //   [sources].flat(2).reduce((cdr, src) => {
  //     if (src == null) return cdr;
  //     src = Object.hasOwn(src, "roster") ? src.roster : src;
  //     if (src instanceof Map) {
  //       cdr.push(...Array.from(src.values()));
  //     } else if (isArray(src)) {
  //       cdr.push(...src);
  //     } else if (isObject(src)) {
  //       cdr.push(src);
  //     }
  //     return cdr;
  //   }, []),
  // ).reduce(
  //   (cdr, src, i) => {
  //     if (src.username !== "") {
  //       Object.hasOwn(cdr, src.username)
  //         ? cdr[src.username].push(src)
  //         : (cdr[src.username] = [src]);
  //     } else if (src.name !== "") {
  //       Object.hasOwn(cdr, src.name)
  //         ? cdr[src.name].push(src)
  //         : (cdr[src.name] = [src]);
  //     } else if (src.surname !== "") {
  //       Object.hasOwn(cdr, src.surname)
  //         ? cdr[src.surname].push(src)
  //         : (cdr[src.surname] = [src]);
  //     } else if (src.email !== "") {
  //       Object.hasOwn(cdr, src.email)
  //         ? cdr[src.email].push(src)
  //         : (cdr[src.email] = [src]);
  //     } else {
  //       cdr.singles.push(src);
  //     }
  //     return cdr;
  //   },
  //   { singles: [] },
  // );
  // // debug(_sources);

  // // second pass
  // const __sources = [..._sources.singles];
  // delete _sources.singles;
  // __sources.push(...Object.values(_sources));
  // // debug(__sources);

  // const target = __sources.map((src) => Player.normalize(src, options));
  // // debug(target);
  // return target;
}

export { normalize };
