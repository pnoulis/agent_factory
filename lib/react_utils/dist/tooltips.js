import * as o from "react";
import { u as C, g as E, o as b, h as w, i as F, j as h, d as y, c as P, k as M, a as k, l as d, F as A } from "./floating-ui.react.esm-84c9a4b8.js";
import "react-dom";
const m = o.createContext(), g = () => {
  const n = o.useContext(m);
  if (n == null)
    throw new Error("Tooltip components must be wrapped in <Tooltip />");
  return n;
};
function D({
  initialOpen: n = !1,
  placement: e = "top",
  offset: s = 5,
  open: t,
  onOpenChange: l
} = {}) {
  const [a, c] = o.useState(n), i = t ?? a, u = l ?? c, p = C({
    placement: e,
    open: i,
    onOpenChange: u,
    whileElementsMounted: E,
    middleware: [
      b(s),
      w({
        fallbackAxisSideDirection: "start",
        crossAxis: e.includes("-")
      }),
      F({ padding: s })
    ]
  }), r = p.context, x = h(r, {
    move: !1,
    enabled: t == null
  }), T = y(r, {
    enabled: t == null
  }), R = P(r), v = M(r, { role: "tooltip" }), f = k([x, T, R, v]);
  return o.useMemo(
    () => ({
      open: i,
      setOpen: u,
      ...f,
      ...p
    }),
    [i, u, f, p]
  );
}
function S({ children: n, ...e }) {
  const s = D(e);
  return /* @__PURE__ */ o.createElement(m.Provider, { value: s }, n);
}
const U = o.forwardRef(function(e, s) {
  const t = g(), l = d([t.refs.setFloating, s]);
  return /* @__PURE__ */ o.createElement(A, null, t.open && /* @__PURE__ */ o.createElement(
    "div",
    {
      className: e.className,
      ref: l,
      style: {
        position: t.strategy,
        top: t.y ?? 0,
        left: t.x ?? 0,
        visibility: t.x == null ? "hidden" : "visible",
        ...e.style
      },
      ...t.getFloatingProps(e)
    }
  ));
}), j = o.forwardRef(function({ children: e, asChild: s = !1, ...t }, l) {
  const a = g(), c = e.ref, i = d([a.refs.setReference, l, c]);
  return s && o.isValidElement(e) ? o.cloneElement(
    e,
    a.getReferenceProps({
      ref: i,
      ...t,
      ...e.props,
      "data-state": a.open ? "open" : "closed"
    })
  ) : /* @__PURE__ */ o.createElement(
    "button",
    {
      ref: i,
      "data-state": a.open ? "open" : "closed",
      ...a.getReferenceProps(t)
    },
    e
  );
});
export {
  S as Tooltip,
  U as TooltipContent,
  j as TooltipTrigger
};
