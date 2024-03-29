import { isArray } from "js_utils/misc";
/*
  Copy from koa-compose.
  The pattern is however widespread.
 */
function compose(middleware) {
  if (!isArray(middleware))
    throw new TypeError("Middleware stack must be an array!");
  return function (context, next) {
    let index = -1;
    return dispatch(0);
    function dispatch(i) {
      if (i <= index)
        return Promise.reject(new Error("next() called multiple times"));
      index = i;
      let fn = middleware[i];
      if (i === middleware.length) fn = next;
      if (!fn) return Promise.resolve();
      try {
        // Ensures asynchronisity
        return Promise.resolve().then(() =>
          fn(context, dispatch.bind(null, i + 1)),
        );
      } catch (err) {
        return Promise.reject(err);
      }
    }
  };
}

export { compose };
