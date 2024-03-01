import * as e from "react";
const E = e.createContext(null), F = () => {
  const r = e.useContext(E);
  if (r == null)
    throw new Error("Component requires <RemoteContextProvider/>");
  return r;
}, w = ({ value: r, children: s }) => /* @__PURE__ */ e.createElement(E.Provider, { value: r }, s);
function D({
  getRemoteData: r = () => {
  },
  parseRes: s = (n) => n,
  parseError: d = (n) => console.log(n),
  fetchDelay: i = 1e3,
  successDelay: f = 1500,
  errorDelay: v = 1500
}) {
  const [n, u] = e.useState(0), t = e.useRef({
    idle: 0,
    pending: 1,
    success: 2,
    error: 3
  }), c = e.useRef(null), l = e.useRef(null), a = e.useRef(null);
  a.current = n;
  const m = (R) => R !== l.current.timeOfRequest, g = () => Date.now() - l.current.timeOfRequest > i, x = e.useCallback(
    (...R) => new Promise((p, C) => {
      u(t.current.pending);
      const o = Date.now();
      l.current = {
        fired: !1,
        timeOfRequest: o,
        fetch: () => r(...R).then(s).then((h) => {
          !m(o) && a.current > t.current.idle && (u(t.current.success), setTimeout(() => {
            !m(o) && a.current > t.current.idle && (u(t.current.idle), p(h));
          }, f));
        }).catch(d).catch((h) => {
          !m(o) && a.current > t.current.idle && (u(t.current.error), setTimeout(() => {
            !m(o) && a.current > t.current.idle && (u(t.current.idle), C(h));
          }, v));
        })
      };
    }),
    [r]
  );
  return e.useEffect(() => (n === t.current.idle && c.current !== null ? (clearInterval(c.current), c.current = null) : n === t.current.pending && c.current === null && (c.current = setInterval(() => {
    !l.current.fired && g() && (l.current.fetch(), l.current.fired = !0);
  }, i)), () => {
    c.current && (clearInterval(c.current), c.current = null);
  }), [n, u]), {
    state: n,
    setState: u,
    states: t.current,
    startFetching: x
  };
}
function S({
  context: r,
  RenderPending: s,
  RenderSuccess: d,
  RenderError: i,
  children: f
}) {
  switch ((r || F()).state) {
    case 1:
      return /* @__PURE__ */ e.createElement(e.Fragment, null, s || /* @__PURE__ */ e.createElement("div", null, "pending"));
    case 2:
      return /* @__PURE__ */ e.createElement(e.Fragment, null, d || /* @__PURE__ */ e.createElement("div", null, "success"));
    case 3:
      return /* @__PURE__ */ e.createElement(e.Fragment, null, i || /* @__PURE__ */ e.createElement("div", null, "error"));
    default:
      return /* @__PURE__ */ e.createElement(e.Fragment, null, f || null);
  }
}
export {
  w as RemoteDataProvider,
  S as RemoteDataStates,
  D as useRemoteData,
  F as useRemoteDataContext
};
