import * as e from "react";
function F({ ancestor: s, renderProps: i, children: a }) {
  const [r, c] = e.useState(null), n = e.useRef(null);
  return e.useLayoutEffect(() => {
    n.current == null && (n.current = document.querySelector(s));
    const t = window.getComputedStyle(n.current), o = n.current.scrollWidth, l = n.current.scrollHeight, u = parseFloat(t.paddingLeft) + parseFloat(t.paddingRight), p = parseFloat(t.paddingTop) + parseFloat(t.paddingBottom), d = parseFloat(t.borderLeft) + parseFloat(t.borderRight), g = parseFloat(t.borderTop) + parseFloat(t.borderBottom), m = parseFloat(t.marginLeft) + parseFloat(t.marginRight), h = parseFloat(t.marginTop) + parseFloat(t.marginRight);
    c({
      $width: o - u,
      $height: l - p,
      $widthPadding: o,
      $heightPadding: l,
      $widthBorder: o + d,
      $heightBorder: l + g,
      $widthMargin: o + d + m,
      $heightMargin: l + g + h
    });
  }, []), r ? a ? e.cloneElement(a, {
    ...r
  }) : i(r) : null;
}
function f({ state: s, onPending: i, onResolved: a, onRejected: r, children: c }) {
  switch (s) {
    case "pending":
      return /* @__PURE__ */ e.createElement(e.Fragment, null, i || /* @__PURE__ */ e.createElement("p", null, "pending"));
    case "resolved":
      return /* @__PURE__ */ e.createElement(e.Fragment, null, a || /* @__PURE__ */ e.createElement("p", null, "resolved"));
    case "rejected":
      return /* @__PURE__ */ e.createElement(e.Fragment, null, r || /* @__PURE__ */ e.createElement("p", null, "rejected"));
    default:
      return /* @__PURE__ */ e.createElement(e.Fragment, null, c);
  }
}
export {
  F as AncestorDimensions,
  f as AsyncStates
};
