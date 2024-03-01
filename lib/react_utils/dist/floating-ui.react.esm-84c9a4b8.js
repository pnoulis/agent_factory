import * as f from "react";
import { useLayoutEffect as Dt, useEffect as kt, useRef as cn } from "react";
import * as un from "react-dom";
import { createPortal as ln } from "react-dom";
const me = Math.min, q = Math.max, De = Math.round, Ae = Math.floor, ce = (e) => ({
  x: e,
  y: e
}), an = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, fn = {
  start: "end",
  end: "start"
};
function gt(e, t, n) {
  return q(e, me(t, n));
}
function Re(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function ue(e) {
  return e.split("-")[0];
}
function Ee(e) {
  return e.split("-")[1];
}
function Ft(e) {
  return e === "x" ? "y" : "x";
}
function Nt(e) {
  return e === "y" ? "height" : "width";
}
function Ce(e) {
  return ["top", "bottom"].includes(ue(e)) ? "y" : "x";
}
function Wt(e) {
  return Ft(Ce(e));
}
function dn(e, t, n) {
  n === void 0 && (n = !1);
  const r = Ee(e), o = Wt(e), i = Nt(o);
  let s = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[i] > t.floating[i] && (s = ke(s)), [s, ke(s)];
}
function mn(e) {
  const t = ke(e);
  return [et(e), t, et(t)];
}
function et(e) {
  return e.replace(/start|end/g, (t) => fn[t]);
}
function gn(e, t, n) {
  const r = ["left", "right"], o = ["right", "left"], i = ["top", "bottom"], s = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? o : r : t ? r : o;
    case "left":
    case "right":
      return t ? i : s;
    default:
      return [];
  }
}
function pn(e, t, n, r) {
  const o = Ee(e);
  let i = gn(ue(e), n === "start", r);
  return o && (i = i.map((s) => s + "-" + o), t && (i = i.concat(i.map(et)))), i;
}
function ke(e) {
  return e.replace(/left|right|bottom|top/g, (t) => an[t]);
}
function hn(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function vn(e) {
  return typeof e != "number" ? hn(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Fe(e) {
  return {
    ...e,
    top: e.y,
    left: e.x,
    right: e.x + e.width,
    bottom: e.y + e.height
  };
}
function pt(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const i = Ce(t), s = Wt(t), c = Nt(s), u = ue(t), l = i === "y", g = r.x + r.width / 2 - o.width / 2, d = r.y + r.height / 2 - o.height / 2, v = r[c] / 2 - o[c] / 2;
  let a;
  switch (u) {
    case "top":
      a = {
        x: g,
        y: r.y - o.height
      };
      break;
    case "bottom":
      a = {
        x: g,
        y: r.y + r.height
      };
      break;
    case "right":
      a = {
        x: r.x + r.width,
        y: d
      };
      break;
    case "left":
      a = {
        x: r.x - o.width,
        y: d
      };
      break;
    default:
      a = {
        x: r.x,
        y: r.y
      };
  }
  switch (Ee(t)) {
    case "start":
      a[s] -= v * (n && l ? -1 : 1);
      break;
    case "end":
      a[s] += v * (n && l ? -1 : 1);
      break;
  }
  return a;
}
const yn = async (e, t, n) => {
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: i = [],
    platform: s
  } = n, c = i.filter(Boolean), u = await (s.isRTL == null ? void 0 : s.isRTL(t));
  let l = await s.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: g,
    y: d
  } = pt(l, r, u), v = r, a = {}, h = 0;
  for (let m = 0; m < c.length; m++) {
    const {
      name: b,
      fn: x
    } = c[m], {
      x: y,
      y: S,
      data: O,
      reset: E
    } = await x({
      x: g,
      y: d,
      initialPlacement: r,
      placement: v,
      strategy: o,
      middlewareData: a,
      rects: l,
      platform: s,
      elements: {
        reference: e,
        floating: t
      }
    });
    g = y ?? g, d = S ?? d, a = {
      ...a,
      [b]: {
        ...a[b],
        ...O
      }
    }, E && h <= 50 && (h++, typeof E == "object" && (E.placement && (v = E.placement), E.rects && (l = E.rects === !0 ? await s.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : E.rects), {
      x: g,
      y: d
    } = pt(l, v, u)), m = -1);
  }
  return {
    x: g,
    y: d,
    placement: v,
    strategy: o,
    middlewareData: a
  };
};
async function rt(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: r,
    y: o,
    platform: i,
    rects: s,
    elements: c,
    strategy: u
  } = e, {
    boundary: l = "clippingAncestors",
    rootBoundary: g = "viewport",
    elementContext: d = "floating",
    altBoundary: v = !1,
    padding: a = 0
  } = Re(t, e), h = vn(a), b = c[v ? d === "floating" ? "reference" : "floating" : d], x = Fe(await i.getClippingRect({
    element: (n = await (i.isElement == null ? void 0 : i.isElement(b))) == null || n ? b : b.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(c.floating)),
    boundary: l,
    rootBoundary: g,
    strategy: u
  })), y = d === "floating" ? {
    ...s.floating,
    x: r,
    y: o
  } : s.reference, S = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(c.floating)), O = await (i.isElement == null ? void 0 : i.isElement(S)) ? await (i.getScale == null ? void 0 : i.getScale(S)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, E = Fe(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: c,
    rect: y,
    offsetParent: S,
    strategy: u
  }) : y);
  return {
    top: (x.top - E.top + h.top) / O.y,
    bottom: (E.bottom - x.bottom + h.bottom) / O.y,
    left: (x.left - E.left + h.left) / O.x,
    right: (E.right - x.right + h.right) / O.x
  };
}
const bn = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        middlewareData: i,
        rects: s,
        initialPlacement: c,
        platform: u,
        elements: l
      } = t, {
        mainAxis: g = !0,
        crossAxis: d = !0,
        fallbackPlacements: v,
        fallbackStrategy: a = "bestFit",
        fallbackAxisSideDirection: h = "none",
        flipAlignment: m = !0,
        ...b
      } = Re(e, t);
      if ((n = i.arrow) != null && n.alignmentOffset)
        return {};
      const x = ue(o), y = ue(c) === c, S = await (u.isRTL == null ? void 0 : u.isRTL(l.floating)), O = v || (y || !m ? [ke(c)] : mn(c));
      !v && h !== "none" && O.push(...pn(c, m, h, S));
      const E = [c, ...O], w = await rt(t, b), W = [];
      let B = ((r = i.flip) == null ? void 0 : r.overflows) || [];
      if (g && W.push(w[x]), d) {
        const p = dn(o, s, S);
        W.push(w[p[0]], w[p[1]]);
      }
      if (B = [...B, {
        placement: o,
        overflows: W
      }], !W.every((p) => p <= 0)) {
        var I, R;
        const p = (((I = i.flip) == null ? void 0 : I.index) || 0) + 1, C = E[p];
        if (C)
          return {
            data: {
              index: p,
              overflows: B
            },
            reset: {
              placement: C
            }
          };
        let T = (R = B.filter((A) => A.overflows[0] <= 0).sort((A, F) => A.overflows[1] - F.overflows[1])[0]) == null ? void 0 : R.placement;
        if (!T)
          switch (a) {
            case "bestFit": {
              var L;
              const A = (L = B.map((F) => [F.placement, F.overflows.filter((N) => N > 0).reduce((N, P) => N + P, 0)]).sort((F, N) => F[1] - N[1])[0]) == null ? void 0 : L[0];
              A && (T = A);
              break;
            }
            case "initialPlacement":
              T = c;
              break;
          }
        if (o !== T)
          return {
            reset: {
              placement: T
            }
          };
      }
      return {};
    }
  };
};
async function wn(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, i = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), s = ue(n), c = Ee(n), u = Ce(n) === "y", l = ["left", "top"].includes(s) ? -1 : 1, g = i && u ? -1 : 1, d = Re(t, e);
  let {
    mainAxis: v,
    crossAxis: a,
    alignmentAxis: h
  } = typeof d == "number" ? {
    mainAxis: d,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...d
  };
  return c && typeof h == "number" && (a = c === "end" ? h * -1 : h), u ? {
    x: a * g,
    y: v * l
  } : {
    x: v * l,
    y: a * g
  };
}
const Fr = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, r;
      const {
        x: o,
        y: i,
        placement: s,
        middlewareData: c
      } = t, u = await wn(t, e);
      return s === ((n = c.offset) == null ? void 0 : n.placement) && (r = c.arrow) != null && r.alignmentOffset ? {} : {
        x: o + u.x,
        y: i + u.y,
        data: {
          ...u,
          placement: s
        }
      };
    }
  };
}, xn = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: r,
        placement: o
      } = t, {
        mainAxis: i = !0,
        crossAxis: s = !1,
        limiter: c = {
          fn: (b) => {
            let {
              x,
              y
            } = b;
            return {
              x,
              y
            };
          }
        },
        ...u
      } = Re(e, t), l = {
        x: n,
        y: r
      }, g = await rt(t, u), d = Ce(ue(o)), v = Ft(d);
      let a = l[v], h = l[d];
      if (i) {
        const b = v === "y" ? "top" : "left", x = v === "y" ? "bottom" : "right", y = a + g[b], S = a - g[x];
        a = gt(y, a, S);
      }
      if (s) {
        const b = d === "y" ? "top" : "left", x = d === "y" ? "bottom" : "right", y = h + g[b], S = h - g[x];
        h = gt(y, h, S);
      }
      const m = c.fn({
        ...t,
        [v]: a,
        [d]: h
      });
      return {
        ...m,
        data: {
          x: m.x - n,
          y: m.y - r
        }
      };
    }
  };
}, Rn = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      const {
        placement: n,
        rects: r,
        platform: o,
        elements: i
      } = t, {
        apply: s = () => {
        },
        ...c
      } = Re(e, t), u = await rt(t, c), l = ue(n), g = Ee(n), d = Ce(n) === "y", {
        width: v,
        height: a
      } = r.floating;
      let h, m;
      l === "top" || l === "bottom" ? (h = l, m = g === (await (o.isRTL == null ? void 0 : o.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (m = l, h = g === "end" ? "top" : "bottom");
      const b = a - u[h], x = v - u[m], y = !t.middlewareData.shift;
      let S = b, O = x;
      if (d) {
        const w = v - u.left - u.right;
        O = g || y ? me(x, w) : w;
      } else {
        const w = a - u.top - u.bottom;
        S = g || y ? me(b, w) : w;
      }
      if (y && !g) {
        const w = q(u.left, 0), W = q(u.right, 0), B = q(u.top, 0), I = q(u.bottom, 0);
        d ? O = v - 2 * (w !== 0 || W !== 0 ? w + W : q(u.left, u.right)) : S = a - 2 * (B !== 0 || I !== 0 ? B + I : q(u.top, u.bottom));
      }
      await s({
        ...t,
        availableWidth: O,
        availableHeight: S
      });
      const E = await o.getDimensions(i.floating);
      return v !== E.width || a !== E.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function le(e) {
  return Bt(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function U(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function re(e) {
  var t;
  return (t = (Bt(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Bt(e) {
  return e instanceof Node || e instanceof U(e).Node;
}
function ne(e) {
  return e instanceof Element || e instanceof U(e).Element;
}
function Q(e) {
  return e instanceof HTMLElement || e instanceof U(e).HTMLElement;
}
function ht(e) {
  return typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof U(e).ShadowRoot;
}
function Te(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = G(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !["inline", "contents"].includes(o);
}
function En(e) {
  return ["table", "td", "th"].includes(le(e));
}
function ot(e) {
  const t = it(), n = G(e);
  return n.transform !== "none" || n.perspective !== "none" || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || ["transform", "perspective", "filter"].some((r) => (n.willChange || "").includes(r)) || ["paint", "layout", "strict", "content"].some((r) => (n.contain || "").includes(r));
}
function Cn(e) {
  let t = ge(e);
  for (; Q(t) && !He(t); ) {
    if (ot(t))
      return t;
    t = ge(t);
  }
  return null;
}
function it() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function He(e) {
  return ["html", "body", "#document"].includes(le(e));
}
function G(e) {
  return U(e).getComputedStyle(e);
}
function ze(e) {
  return ne(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.pageXOffset,
    scrollTop: e.pageYOffset
  };
}
function ge(e) {
  if (le(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    ht(e) && e.host || // Fallback.
    re(e)
  );
  return ht(t) ? t.host : t;
}
function Vt(e) {
  const t = ge(e);
  return He(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Q(t) && Te(t) ? t : Vt(t);
}
function ie(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = Vt(e), i = o === ((r = e.ownerDocument) == null ? void 0 : r.body), s = U(o);
  return i ? t.concat(s, s.visualViewport || [], Te(o) ? o : [], s.frameElement && n ? ie(s.frameElement) : []) : t.concat(o, ie(o, [], n));
}
function Kt(e) {
  const t = G(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = Q(e), i = o ? e.offsetWidth : n, s = o ? e.offsetHeight : r, c = De(n) !== i || De(r) !== s;
  return c && (n = i, r = s), {
    width: n,
    height: r,
    $: c
  };
}
function st(e) {
  return ne(e) ? e : e.contextElement;
}
function de(e) {
  const t = st(e);
  if (!Q(t))
    return ce(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: i
  } = Kt(t);
  let s = (i ? De(n.width) : n.width) / r, c = (i ? De(n.height) : n.height) / o;
  return (!s || !Number.isFinite(s)) && (s = 1), (!c || !Number.isFinite(c)) && (c = 1), {
    x: s,
    y: c
  };
}
const Tn = /* @__PURE__ */ ce(0);
function Ht(e) {
  const t = U(e);
  return !it() || !t.visualViewport ? Tn : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Sn(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== U(e) ? !1 : t;
}
function fe(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), i = st(e);
  let s = ce(1);
  t && (r ? ne(r) && (s = de(r)) : s = de(e));
  const c = Sn(i, n, r) ? Ht(i) : ce(0);
  let u = (o.left + c.x) / s.x, l = (o.top + c.y) / s.y, g = o.width / s.x, d = o.height / s.y;
  if (i) {
    const v = U(i), a = r && ne(r) ? U(r) : r;
    let h = v, m = h.frameElement;
    for (; m && r && a !== h; ) {
      const b = de(m), x = m.getBoundingClientRect(), y = G(m), S = x.left + (m.clientLeft + parseFloat(y.paddingLeft)) * b.x, O = x.top + (m.clientTop + parseFloat(y.paddingTop)) * b.y;
      u *= b.x, l *= b.y, g *= b.x, d *= b.y, u += S, l += O, h = U(m), m = h.frameElement;
    }
  }
  return Fe({
    width: g,
    height: d,
    x: u,
    y: l
  });
}
const In = [":popover-open", ":modal"];
function zt(e) {
  return In.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
function On(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const i = o === "fixed", s = re(r), c = t ? zt(t.floating) : !1;
  if (r === s || c && i)
    return n;
  let u = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = ce(1);
  const g = ce(0), d = Q(r);
  if ((d || !d && !i) && ((le(r) !== "body" || Te(s)) && (u = ze(r)), Q(r))) {
    const v = fe(r);
    l = de(r), g.x = v.x + r.clientLeft, g.y = v.y + r.clientTop;
  }
  return {
    width: n.width * l.x,
    height: n.height * l.y,
    x: n.x * l.x - u.scrollLeft * l.x + g.x,
    y: n.y * l.y - u.scrollTop * l.y + g.y
  };
}
function An(e) {
  return Array.from(e.getClientRects());
}
function $t(e) {
  return fe(re(e)).left + ze(e).scrollLeft;
}
function Mn(e) {
  const t = re(e), n = ze(e), r = e.ownerDocument.body, o = q(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), i = q(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let s = -n.scrollLeft + $t(e);
  const c = -n.scrollTop;
  return G(r).direction === "rtl" && (s += q(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: i,
    x: s,
    y: c
  };
}
function Ln(e, t) {
  const n = U(e), r = re(e), o = n.visualViewport;
  let i = r.clientWidth, s = r.clientHeight, c = 0, u = 0;
  if (o) {
    i = o.width, s = o.height;
    const l = it();
    (!l || l && t === "fixed") && (c = o.offsetLeft, u = o.offsetTop);
  }
  return {
    width: i,
    height: s,
    x: c,
    y: u
  };
}
function Pn(e, t) {
  const n = fe(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, i = Q(e) ? de(e) : ce(1), s = e.clientWidth * i.x, c = e.clientHeight * i.y, u = o * i.x, l = r * i.y;
  return {
    width: s,
    height: c,
    x: u,
    y: l
  };
}
function vt(e, t, n) {
  let r;
  if (t === "viewport")
    r = Ln(e, n);
  else if (t === "document")
    r = Mn(re(e));
  else if (ne(t))
    r = Pn(t, n);
  else {
    const o = Ht(e);
    r = {
      ...t,
      x: t.x - o.x,
      y: t.y - o.y
    };
  }
  return Fe(r);
}
function _t(e, t) {
  const n = ge(e);
  return n === t || !ne(n) || He(n) ? !1 : G(n).position === "fixed" || _t(n, t);
}
function Dn(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = ie(e, [], !1).filter((c) => ne(c) && le(c) !== "body"), o = null;
  const i = G(e).position === "fixed";
  let s = i ? ge(e) : e;
  for (; ne(s) && !He(s); ) {
    const c = G(s), u = ot(s);
    !u && c.position === "fixed" && (o = null), (i ? !u && !o : !u && c.position === "static" && !!o && ["absolute", "fixed"].includes(o.position) || Te(s) && !u && _t(e, s)) ? r = r.filter((g) => g !== s) : o = c, s = ge(s);
  }
  return t.set(e, r), r;
}
function kn(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const s = [...n === "clippingAncestors" ? Dn(t, this._c) : [].concat(n), r], c = s[0], u = s.reduce((l, g) => {
    const d = vt(t, g, o);
    return l.top = q(d.top, l.top), l.right = me(d.right, l.right), l.bottom = me(d.bottom, l.bottom), l.left = q(d.left, l.left), l;
  }, vt(t, c, o));
  return {
    width: u.right - u.left,
    height: u.bottom - u.top,
    x: u.left,
    y: u.top
  };
}
function Fn(e) {
  const {
    width: t,
    height: n
  } = Kt(e);
  return {
    width: t,
    height: n
  };
}
function Nn(e, t, n) {
  const r = Q(t), o = re(t), i = n === "fixed", s = fe(e, !0, i, t);
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const u = ce(0);
  if (r || !r && !i)
    if ((le(t) !== "body" || Te(o)) && (c = ze(t)), r) {
      const d = fe(t, !0, i, t);
      u.x = d.x + t.clientLeft, u.y = d.y + t.clientTop;
    } else
      o && (u.x = $t(o));
  const l = s.left + c.scrollLeft - u.x, g = s.top + c.scrollTop - u.y;
  return {
    x: l,
    y: g,
    width: s.width,
    height: s.height
  };
}
function yt(e, t) {
  return !Q(e) || G(e).position === "fixed" ? null : t ? t(e) : e.offsetParent;
}
function jt(e, t) {
  const n = U(e);
  if (!Q(e) || zt(e))
    return n;
  let r = yt(e, t);
  for (; r && En(r) && G(r).position === "static"; )
    r = yt(r, t);
  return r && (le(r) === "html" || le(r) === "body" && G(r).position === "static" && !ot(r)) ? n : r || Cn(e) || n;
}
const Wn = async function(e) {
  const t = this.getOffsetParent || jt, n = this.getDimensions;
  return {
    reference: Nn(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      ...await n(e.floating)
    }
  };
};
function Bn(e) {
  return G(e).direction === "rtl";
}
const Vn = {
  convertOffsetParentRelativeRectToViewportRelativeRect: On,
  getDocumentElement: re,
  getClippingRect: kn,
  getOffsetParent: jt,
  getElementRects: Wn,
  getClientRects: An,
  getDimensions: Fn,
  getScale: de,
  isElement: ne,
  isRTL: Bn
};
function Kn(e, t) {
  let n = null, r;
  const o = re(e);
  function i() {
    var c;
    clearTimeout(r), (c = n) == null || c.disconnect(), n = null;
  }
  function s(c, u) {
    c === void 0 && (c = !1), u === void 0 && (u = 1), i();
    const {
      left: l,
      top: g,
      width: d,
      height: v
    } = e.getBoundingClientRect();
    if (c || t(), !d || !v)
      return;
    const a = Ae(g), h = Ae(o.clientWidth - (l + d)), m = Ae(o.clientHeight - (g + v)), b = Ae(l), y = {
      rootMargin: -a + "px " + -h + "px " + -m + "px " + -b + "px",
      threshold: q(0, me(1, u)) || 1
    };
    let S = !0;
    function O(E) {
      const w = E[0].intersectionRatio;
      if (w !== u) {
        if (!S)
          return s();
        w ? s(!1, w) : r = setTimeout(() => {
          s(!1, 1e-7);
        }, 100);
      }
      S = !1;
    }
    try {
      n = new IntersectionObserver(O, {
        ...y,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(O, y);
    }
    n.observe(e);
  }
  return s(!0), i;
}
function Nr(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: i = !0,
    elementResize: s = typeof ResizeObserver == "function",
    layoutShift: c = typeof IntersectionObserver == "function",
    animationFrame: u = !1
  } = r, l = st(e), g = o || i ? [...l ? ie(l) : [], ...ie(t)] : [];
  g.forEach((x) => {
    o && x.addEventListener("scroll", n, {
      passive: !0
    }), i && x.addEventListener("resize", n);
  });
  const d = l && c ? Kn(l, n) : null;
  let v = -1, a = null;
  s && (a = new ResizeObserver((x) => {
    let [y] = x;
    y && y.target === l && a && (a.unobserve(t), cancelAnimationFrame(v), v = requestAnimationFrame(() => {
      var S;
      (S = a) == null || S.observe(t);
    })), n();
  }), l && !u && a.observe(l), a.observe(t));
  let h, m = u ? fe(e) : null;
  u && b();
  function b() {
    const x = fe(e);
    m && (x.x !== m.x || x.y !== m.y || x.width !== m.width || x.height !== m.height) && n(), m = x, h = requestAnimationFrame(b);
  }
  return n(), () => {
    var x;
    g.forEach((y) => {
      o && y.removeEventListener("scroll", n), i && y.removeEventListener("resize", n);
    }), d?.(), (x = a) == null || x.disconnect(), a = null, u && cancelAnimationFrame(h);
  };
}
const Wr = xn, Br = bn, Vr = Rn, Hn = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: Vn,
    ...n
  }, i = {
    ...o.platform,
    _c: r
  };
  return yn(e, t, {
    ...o,
    platform: i
  });
};
var Le = typeof document < "u" ? Dt : kt;
function Ne(e, t) {
  if (e === t)
    return !0;
  if (typeof e != typeof t)
    return !1;
  if (typeof e == "function" && e.toString() === t.toString())
    return !0;
  let n, r, o;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (n = e.length, n != t.length)
        return !1;
      for (r = n; r-- !== 0; )
        if (!Ne(e[r], t[r]))
          return !1;
      return !0;
    }
    if (o = Object.keys(e), n = o.length, n !== Object.keys(t).length)
      return !1;
    for (r = n; r-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(t, o[r]))
        return !1;
    for (r = n; r-- !== 0; ) {
      const i = o[r];
      if (!(i === "_owner" && e.$$typeof) && !Ne(e[i], t[i]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function bt(e) {
  const t = f.useRef(e);
  return Le(() => {
    t.current = e;
  }), t;
}
function zn(e) {
  e === void 0 && (e = {});
  const {
    placement: t = "bottom",
    strategy: n = "absolute",
    middleware: r = [],
    platform: o,
    whileElementsMounted: i,
    open: s
  } = e, [c, u] = f.useState({
    x: null,
    y: null,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [l, g] = f.useState(r);
  Ne(l, r) || g(r);
  const d = f.useRef(null), v = f.useRef(null), a = f.useRef(c), h = bt(i), m = bt(o), [b, x] = f.useState(null), [y, S] = f.useState(null), O = f.useCallback((R) => {
    d.current !== R && (d.current = R, x(R));
  }, []), E = f.useCallback((R) => {
    v.current !== R && (v.current = R, S(R));
  }, []), w = f.useCallback(() => {
    if (!d.current || !v.current)
      return;
    const R = {
      placement: t,
      strategy: n,
      middleware: l
    };
    m.current && (R.platform = m.current), Hn(d.current, v.current, R).then((L) => {
      const p = {
        ...L,
        isPositioned: !0
      };
      W.current && !Ne(a.current, p) && (a.current = p, un.flushSync(() => {
        u(p);
      }));
    });
  }, [l, t, n, m]);
  Le(() => {
    s === !1 && a.current.isPositioned && (a.current.isPositioned = !1, u((R) => ({
      ...R,
      isPositioned: !1
    })));
  }, [s]);
  const W = f.useRef(!1);
  Le(() => (W.current = !0, () => {
    W.current = !1;
  }), []), Le(() => {
    if (b && y) {
      if (h.current)
        return h.current(b, y, w);
      w();
    }
  }, [b, y, w, h]);
  const B = f.useMemo(() => ({
    reference: d,
    floating: v,
    setReference: O,
    setFloating: E
  }), [O, E]), I = f.useMemo(() => ({
    reference: b,
    floating: y
  }), [b, y]);
  return f.useMemo(() => ({
    ...c,
    update: w,
    refs: B,
    elements: I,
    reference: O,
    floating: E
  }), [c, w, B, I, O, E]);
}
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var $n = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"], tt = /* @__PURE__ */ $n.join(","), qt = typeof Element > "u", we = qt ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, We = !qt && Element.prototype.getRootNode ? function(e) {
  var t;
  return e == null || (t = e.getRootNode) === null || t === void 0 ? void 0 : t.call(e);
} : function(e) {
  return e?.ownerDocument;
}, Be = function e(t, n) {
  var r;
  n === void 0 && (n = !0);
  var o = t == null || (r = t.getAttribute) === null || r === void 0 ? void 0 : r.call(t, "inert"), i = o === "" || o === "true", s = i || n && t && e(t.parentNode);
  return s;
}, _n = function(t) {
  var n, r = t == null || (n = t.getAttribute) === null || n === void 0 ? void 0 : n.call(t, "contenteditable");
  return r === "" || r === "true";
}, jn = function(t, n, r) {
  if (Be(t))
    return [];
  var o = Array.prototype.slice.apply(t.querySelectorAll(tt));
  return n && we.call(t, tt) && o.unshift(t), o = o.filter(r), o;
}, qn = function e(t, n, r) {
  for (var o = [], i = Array.from(t); i.length; ) {
    var s = i.shift();
    if (!Be(s, !1))
      if (s.tagName === "SLOT") {
        var c = s.assignedElements(), u = c.length ? c : s.children, l = e(u, !0, r);
        r.flatten ? o.push.apply(o, l) : o.push({
          scopeParent: s,
          candidates: l
        });
      } else {
        var g = we.call(s, tt);
        g && r.filter(s) && (n || !t.includes(s)) && o.push(s);
        var d = s.shadowRoot || // check for an undisclosed shadow
        typeof r.getShadowRoot == "function" && r.getShadowRoot(s), v = !Be(d, !1) && (!r.shadowRootFilter || r.shadowRootFilter(s));
        if (d && v) {
          var a = e(d === !0 ? s.children : d.children, !0, r);
          r.flatten ? o.push.apply(o, a) : o.push({
            scopeParent: s,
            candidates: a
          });
        } else
          i.unshift.apply(i, s.children);
      }
  }
  return o;
}, Ut = function(t) {
  return !isNaN(parseInt(t.getAttribute("tabindex"), 10));
}, Yt = function(t) {
  if (!t)
    throw new Error("No node provided");
  return t.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(t.tagName) || _n(t)) && !Ut(t) ? 0 : t.tabIndex;
}, Un = function(t, n) {
  var r = Yt(t);
  return r < 0 && n && !Ut(t) ? 0 : r;
}, Yn = function(t, n) {
  return t.tabIndex === n.tabIndex ? t.documentOrder - n.documentOrder : t.tabIndex - n.tabIndex;
}, Xt = function(t) {
  return t.tagName === "INPUT";
}, Xn = function(t) {
  return Xt(t) && t.type === "hidden";
}, Gn = function(t) {
  var n = t.tagName === "DETAILS" && Array.prototype.slice.apply(t.children).some(function(r) {
    return r.tagName === "SUMMARY";
  });
  return n;
}, Zn = function(t, n) {
  for (var r = 0; r < t.length; r++)
    if (t[r].checked && t[r].form === n)
      return t[r];
}, Jn = function(t) {
  if (!t.name)
    return !0;
  var n = t.form || We(t), r = function(c) {
    return n.querySelectorAll('input[type="radio"][name="' + c + '"]');
  }, o;
  if (typeof window < "u" && typeof window.CSS < "u" && typeof window.CSS.escape == "function")
    o = r(window.CSS.escape(t.name));
  else
    try {
      o = r(t.name);
    } catch (s) {
      return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", s.message), !1;
    }
  var i = Zn(o, t.form);
  return !i || i === t;
}, Qn = function(t) {
  return Xt(t) && t.type === "radio";
}, er = function(t) {
  return Qn(t) && !Jn(t);
}, tr = function(t) {
  var n, r = t && We(t), o = (n = r) === null || n === void 0 ? void 0 : n.host, i = !1;
  if (r && r !== t) {
    var s, c, u;
    for (i = !!((s = o) !== null && s !== void 0 && (c = s.ownerDocument) !== null && c !== void 0 && c.contains(o) || t != null && (u = t.ownerDocument) !== null && u !== void 0 && u.contains(t)); !i && o; ) {
      var l, g, d;
      r = We(o), o = (l = r) === null || l === void 0 ? void 0 : l.host, i = !!((g = o) !== null && g !== void 0 && (d = g.ownerDocument) !== null && d !== void 0 && d.contains(o));
    }
  }
  return i;
}, wt = function(t) {
  var n = t.getBoundingClientRect(), r = n.width, o = n.height;
  return r === 0 && o === 0;
}, nr = function(t, n) {
  var r = n.displayCheck, o = n.getShadowRoot;
  if (getComputedStyle(t).visibility === "hidden")
    return !0;
  var i = we.call(t, "details>summary:first-of-type"), s = i ? t.parentElement : t;
  if (we.call(s, "details:not([open]) *"))
    return !0;
  if (!r || r === "full" || r === "legacy-full") {
    if (typeof o == "function") {
      for (var c = t; t; ) {
        var u = t.parentElement, l = We(t);
        if (u && !u.shadowRoot && o(u) === !0)
          return wt(t);
        t.assignedSlot ? t = t.assignedSlot : !u && l !== t.ownerDocument ? t = l.host : t = u;
      }
      t = c;
    }
    if (tr(t))
      return !t.getClientRects().length;
    if (r !== "legacy-full")
      return !0;
  } else if (r === "non-zero-area")
    return wt(t);
  return !1;
}, rr = function(t) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(t.tagName))
    for (var n = t.parentElement; n; ) {
      if (n.tagName === "FIELDSET" && n.disabled) {
        for (var r = 0; r < n.children.length; r++) {
          var o = n.children.item(r);
          if (o.tagName === "LEGEND")
            return we.call(n, "fieldset[disabled] *") ? !0 : !o.contains(t);
        }
        return !0;
      }
      n = n.parentElement;
    }
  return !1;
}, or = function(t, n) {
  return !(n.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  Be(n) || Xn(n) || nr(n, t) || // For a details element with a summary, the summary element gets the focus
  Gn(n) || rr(n));
}, xt = function(t, n) {
  return !(er(n) || Yt(n) < 0 || !or(t, n));
}, ir = function(t) {
  var n = parseInt(t.getAttribute("tabindex"), 10);
  return !!(isNaN(n) || n >= 0);
}, sr = function e(t) {
  var n = [], r = [];
  return t.forEach(function(o, i) {
    var s = !!o.scopeParent, c = s ? o.scopeParent : o, u = Un(c, s), l = s ? e(o.candidates) : c;
    u === 0 ? s ? n.push.apply(n, l) : n.push(c) : r.push({
      documentOrder: i,
      tabIndex: u,
      item: o,
      isScope: s,
      content: l
    });
  }), r.sort(Yn).reduce(function(o, i) {
    return i.isScope ? o.push.apply(o, i.content) : o.push(i.content), o;
  }, []).concat(n);
}, Gt = function(t, n) {
  n = n || {};
  var r;
  return n.getShadowRoot ? r = qn([t], n.includeContainer, {
    filter: xt.bind(null, n),
    flatten: !1,
    getShadowRoot: n.getShadowRoot,
    shadowRootFilter: ir
  }) : r = jn(t, n.includeContainer, xt.bind(null, n)), sr(r);
};
function nt() {
  return nt = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, nt.apply(this, arguments);
}
var $ = typeof document < "u" ? Dt : kt;
let Ue = !1, cr = 0;
const Rt = () => "floating-ui-" + cr++;
function ur() {
  const [e, t] = f.useState(() => Ue ? Rt() : void 0);
  return $(() => {
    e == null && t(Rt());
  }, []), f.useEffect(() => {
    Ue || (Ue = !0);
  }, []), e;
}
const lr = f[/* @__PURE__ */ "useId".toString()], ct = lr || ur;
function ar() {
  const e = /* @__PURE__ */ new Map();
  return {
    emit(t, n) {
      var r;
      (r = e.get(t)) == null || r.forEach((o) => o(n));
    },
    on(t, n) {
      e.set(t, [...e.get(t) || [], n]);
    },
    off(t, n) {
      var r;
      e.set(t, ((r = e.get(t)) == null ? void 0 : r.filter((o) => o !== n)) || []);
    }
  };
}
const fr = /* @__PURE__ */ f.createContext(null), dr = /* @__PURE__ */ f.createContext(null), ut = () => {
  var e;
  return ((e = f.useContext(fr)) == null ? void 0 : e.id) || null;
}, $e = () => f.useContext(dr);
function Z(e) {
  return e?.ownerDocument || document;
}
function Zt() {
  const e = navigator.userAgentData;
  return e != null && e.platform ? e.platform : navigator.platform;
}
function mr() {
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands) ? e.brands.map((t) => {
    let {
      brand: n,
      version: r
    } = t;
    return n + "/" + r;
  }).join(" ") : navigator.userAgent;
}
function _e(e) {
  return Z(e).defaultView || window;
}
function J(e) {
  return e ? e instanceof _e(e).Element : !1;
}
function Se(e) {
  return e ? e instanceof _e(e).HTMLElement : !1;
}
function gr(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  const t = _e(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function Jt(e) {
  if (e.mozInputSource === 0 && e.isTrusted)
    return !0;
  const t = /Android/i;
  return (t.test(Zt()) || t.test(mr())) && e.pointerType ? e.type === "click" && e.buttons === 1 : e.detail === 0 && !e.pointerType;
}
function Qt(e) {
  return e.width === 0 && e.height === 0 || e.width === 1 && e.height === 1 && e.pressure === 0 && e.detail === 0 && e.pointerType !== "mouse" || // iOS VoiceOver returns 0.333• for width/height.
  e.width < 1 && e.height < 1 && e.pressure === 0 && e.detail === 0;
}
function en() {
  return /apple/i.test(navigator.vendor);
}
function pr() {
  return Zt().toLowerCase().startsWith("mac") && !navigator.maxTouchPoints;
}
function Ve(e, t) {
  const n = ["mouse", "pen"];
  return t || n.push("", void 0), n.includes(e);
}
function xe(e, t) {
  if (!e || !t)
    return !1;
  const n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && gr(n)) {
    let r = t;
    for (; r; ) {
      if (e === r)
        return !0;
      r = r.parentNode || r.host;
    }
  }
  return !1;
}
function ae(e) {
  const t = cn(e);
  return $(() => {
    t.current = e;
  }), t;
}
const Et = "data-floating-ui-safe-polygon";
function Ye(e, t, n) {
  return n && !Ve(n) ? 0 : typeof e == "number" ? e : e?.[t];
}
const Kr = function(e, t) {
  t === void 0 && (t = {});
  const {
    open: n,
    onOpenChange: r,
    dataRef: o,
    events: i,
    elements: {
      domReference: s,
      floating: c
    },
    refs: u
  } = e, {
    enabled: l = !0,
    delay: g = 0,
    handleClose: d = null,
    mouseOnly: v = !1,
    restMs: a = 0,
    move: h = !0
  } = t, m = $e(), b = ut(), x = ae(d), y = ae(g), S = f.useRef(), O = f.useRef(), E = f.useRef(), w = f.useRef(), W = f.useRef(!0), B = f.useRef(!1), I = f.useRef(() => {
  }), R = f.useCallback(() => {
    var T;
    const A = (T = o.current.openEvent) == null ? void 0 : T.type;
    return A?.includes("mouse") && A !== "mousedown";
  }, [o]);
  f.useEffect(() => {
    if (!l)
      return;
    function T() {
      clearTimeout(O.current), clearTimeout(w.current), W.current = !0;
    }
    return i.on("dismiss", T), () => {
      i.off("dismiss", T);
    };
  }, [l, i]), f.useEffect(() => {
    if (!l || !x.current || !n)
      return;
    function T() {
      R() && r(!1);
    }
    const A = Z(c).documentElement;
    return A.addEventListener("mouseleave", T), () => {
      A.removeEventListener("mouseleave", T);
    };
  }, [c, n, r, l, x, o, R]);
  const L = f.useCallback(function(T) {
    T === void 0 && (T = !0);
    const A = Ye(y.current, "close", S.current);
    A && !E.current ? (clearTimeout(O.current), O.current = setTimeout(() => r(!1), A)) : T && (clearTimeout(O.current), r(!1));
  }, [y, r]), p = f.useCallback(() => {
    I.current(), E.current = void 0;
  }, []), C = f.useCallback(() => {
    if (B.current) {
      const T = Z(u.floating.current).body;
      T.style.pointerEvents = "", T.removeAttribute(Et), B.current = !1;
    }
  }, [u]);
  return f.useEffect(() => {
    if (!l)
      return;
    function T() {
      return o.current.openEvent ? ["click", "mousedown"].includes(o.current.openEvent.type) : !1;
    }
    function A(P) {
      if (clearTimeout(O.current), W.current = !1, v && !Ve(S.current) || a > 0 && Ye(y.current, "open") === 0)
        return;
      o.current.openEvent = P;
      const _ = Ye(y.current, "open", S.current);
      _ ? O.current = setTimeout(() => {
        r(!0);
      }, _) : r(!0);
    }
    function F(P) {
      if (T())
        return;
      I.current();
      const _ = Z(c);
      if (clearTimeout(w.current), x.current) {
        n || clearTimeout(O.current), E.current = x.current({
          ...e,
          tree: m,
          x: P.clientX,
          y: P.clientY,
          onClose() {
            C(), p(), L();
          }
        });
        const Oe = E.current;
        _.addEventListener("mousemove", Oe), I.current = () => {
          _.removeEventListener("mousemove", Oe);
        };
        return;
      }
      (S.current === "touch" ? !xe(c, P.relatedTarget) : !0) && L();
    }
    function N(P) {
      T() || x.current == null || x.current({
        ...e,
        tree: m,
        x: P.clientX,
        y: P.clientY,
        onClose() {
          C(), p(), L();
        }
      })(P);
    }
    if (J(s)) {
      const P = s;
      return n && P.addEventListener("mouseleave", N), c?.addEventListener("mouseleave", N), h && P.addEventListener("mousemove", A, {
        once: !0
      }), P.addEventListener("mouseenter", A), P.addEventListener("mouseleave", F), () => {
        n && P.removeEventListener("mouseleave", N), c?.removeEventListener("mouseleave", N), h && P.removeEventListener("mousemove", A), P.removeEventListener("mouseenter", A), P.removeEventListener("mouseleave", F);
      };
    }
  }, [s, c, l, e, v, a, h, L, p, C, r, n, m, y, x, o]), $(() => {
    var T;
    if (l && n && (T = x.current) != null && T.__options.blockPointerEvents && R()) {
      const N = Z(c).body;
      if (N.setAttribute(Et, ""), N.style.pointerEvents = "none", B.current = !0, J(s) && c) {
        var A, F;
        const P = s, _ = m == null || (A = m.nodesRef.current.find((he) => he.id === b)) == null || (F = A.context) == null ? void 0 : F.elements.floating;
        return _ && (_.style.pointerEvents = ""), P.style.pointerEvents = "auto", c.style.pointerEvents = "auto", () => {
          P.style.pointerEvents = "", c.style.pointerEvents = "";
        };
      }
    }
  }, [l, n, b, c, s, m, x, o, R]), $(() => {
    n || (S.current = void 0, p(), C());
  }, [n, p, C]), f.useEffect(() => () => {
    p(), clearTimeout(O.current), clearTimeout(w.current), C();
  }, [l, p, C]), f.useMemo(() => {
    if (!l)
      return {};
    function T(A) {
      S.current = A.pointerType;
    }
    return {
      reference: {
        onPointerDown: T,
        onPointerEnter: T,
        onMouseMove() {
          n || a === 0 || (clearTimeout(w.current), w.current = setTimeout(() => {
            W.current || r(!0);
          }, a));
        }
      },
      floating: {
        onMouseEnter() {
          clearTimeout(O.current);
        },
        onMouseLeave() {
          i.emit("dismiss", {
            type: "mouseLeave",
            data: {
              returnFocus: !1
            }
          }), L(!1);
        }
      }
    };
  }, [i, l, a, n, r, L]);
};
function Ke(e) {
  let t = e.activeElement;
  for (; ((n = t) == null || (r = n.shadowRoot) == null ? void 0 : r.activeElement) != null; ) {
    var n, r;
    t = t.shadowRoot.activeElement;
  }
  return t;
}
let Ct = 0;
function Tt(e, t) {
  t === void 0 && (t = {});
  const {
    preventScroll: n = !1,
    cancelPrevious: r = !0,
    sync: o = !1
  } = t;
  r && cancelAnimationFrame(Ct);
  const i = () => e?.focus({
    preventScroll: n
  });
  o ? i() : Ct = requestAnimationFrame(i);
}
function Xe(e, t) {
  let n = e.filter((o) => {
    var i;
    return o.parentId === t && ((i = o.context) == null ? void 0 : i.open);
  }), r = n;
  for (; r.length; )
    r = e.filter((o) => {
      var i;
      return (i = r) == null ? void 0 : i.some((s) => {
        var c;
        return o.parentId === s.id && ((c = o.context) == null ? void 0 : c.open);
      });
    }), n = n.concat(r);
  return n;
}
function hr(e) {
  return "composedPath" in e ? e.composedPath()[0] : e.target;
}
const vr = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])";
function yr(e) {
  return Se(e) && e.matches(vr);
}
function X(e) {
  e.preventDefault(), e.stopPropagation();
}
const tn = () => ({
  getShadowRoot: !0,
  displayCheck: (
    // JSDOM does not support the `tabbable` library. To solve this we can
    // check if `ResizeObserver` is a real function (not polyfilled), which
    // determines if the current environment is JSDOM-like.
    typeof ResizeObserver == "function" && ResizeObserver.toString().includes("[native code]") ? "full" : "none"
  )
});
function nn(e, t) {
  const n = Gt(e, tn());
  t === "prev" && n.reverse();
  const r = n.indexOf(Ke(Z(e)));
  return n.slice(r + 1)[0];
}
function br() {
  return nn(document.body, "next");
}
function wr() {
  return nn(document.body, "prev");
}
function Ge(e, t) {
  const n = t || e.currentTarget, r = e.relatedTarget;
  return !r || !xe(n, r);
}
function xr(e) {
  Gt(e, tn()).forEach((n) => {
    n.dataset.tabindex = n.getAttribute("tabindex") || "", n.setAttribute("tabindex", "-1");
  });
}
function Rr(e) {
  e.querySelectorAll("[data-tabindex]").forEach((n) => {
    const r = n.dataset.tabindex;
    delete n.dataset.tabindex, r ? n.setAttribute("tabindex", r) : n.removeAttribute("tabindex");
  });
}
const rn = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: 0,
  position: "fixed",
  whiteSpace: "nowrap",
  width: "1px",
  top: 0,
  left: 0
};
let Er;
function St(e) {
  e.key === "Tab" && (e.target, clearTimeout(Er));
}
const It = /* @__PURE__ */ f.forwardRef(function(t, n) {
  const [r, o] = f.useState();
  return $(() => (en() && o("button"), document.addEventListener("keydown", St), () => {
    document.removeEventListener("keydown", St);
  }), []), /* @__PURE__ */ f.createElement("span", nt({}, t, {
    ref: n,
    tabIndex: 0,
    role: r,
    "aria-hidden": r ? void 0 : !0,
    "data-floating-ui-focus-guard": "",
    style: rn
  }));
}), on = /* @__PURE__ */ f.createContext(null), Cr = function(e) {
  let {
    id: t,
    root: n
  } = e === void 0 ? {} : e;
  const [r, o] = f.useState(null), i = f.useRef(null), s = ct(), c = Tr(), u = f.useMemo(() => ({
    id: t,
    root: n,
    portalContext: c,
    uniqueId: s
  }), [t, n, c, s]), l = f.useRef();
  return $(() => {
    const g = i.current;
    return () => {
      r?.remove(), g?.remove();
    };
  }, [r, u]), $(() => {
    if (l.current === u)
      return;
    l.current = u;
    const {
      id: g,
      root: d,
      portalContext: v,
      uniqueId: a
    } = u, h = g ? document.getElementById(g) : null, m = "data-floating-ui-portal";
    if (h) {
      const b = document.createElement("div");
      b.id = a, b.setAttribute(m, ""), h.appendChild(b), o(b);
    } else {
      let b = v?.portalNode || d || document.body, x = null;
      g && (x = document.createElement("div"), x.id = g, b.appendChild(x));
      const y = document.createElement("div");
      y.id = a, y.setAttribute(m, ""), b = x || b, b.appendChild(y), o(y);
    }
  }, [u]), r;
}, Hr = (e) => {
  let {
    children: t,
    id: n,
    root: r = null,
    preserveTabOrder: o = !0
  } = e;
  const i = Cr({
    id: n,
    root: r
  }), [s, c] = f.useState(null), u = f.useRef(null), l = f.useRef(null), g = f.useRef(null), d = f.useRef(null), v = (
    // The FocusManager and therefore floating element are currently open/
    // rendered.
    !!s && // Guards are only for non-modal focus management.
    !s.modal && !!(r || i) && o
  );
  return f.useEffect(() => {
    if (!i || !o || s != null && s.modal)
      return;
    function a(h) {
      i && Ge(h) && (h.type === "focusin" ? Rr : xr)(i);
    }
    return i.addEventListener("focusin", a, !0), i.addEventListener("focusout", a, !0), () => {
      i.removeEventListener("focusin", a, !0), i.removeEventListener("focusout", a, !0);
    };
  }, [i, o, s?.modal]), /* @__PURE__ */ f.createElement(on.Provider, {
    value: f.useMemo(() => ({
      preserveTabOrder: o,
      beforeOutsideRef: u,
      afterOutsideRef: l,
      beforeInsideRef: g,
      afterInsideRef: d,
      portalNode: i,
      setFocusManagerState: c
    }), [o, i])
  }, v && i && /* @__PURE__ */ f.createElement(It, {
    "data-type": "outside",
    ref: u,
    onFocus: (a) => {
      if (Ge(a, i)) {
        var h;
        (h = g.current) == null || h.focus();
      } else {
        const m = wr() || s?.refs.domReference.current;
        m?.focus();
      }
    }
  }), v && i && /* @__PURE__ */ f.createElement("span", {
    "aria-owns": i.id,
    style: rn
  }), i && /* @__PURE__ */ ln(t, i), v && i && /* @__PURE__ */ f.createElement(It, {
    "data-type": "outside",
    ref: l,
    onFocus: (a) => {
      if (Ge(a, i)) {
        var h;
        (h = d.current) == null || h.focus();
      } else {
        const m = br() || s?.refs.domReference.current;
        m?.focus(), s?.closeOnFocusOut && s?.onOpenChange(!1);
      }
    }
  }));
}, Tr = () => f.useContext(on);
function Ot(e) {
  return Se(e.target) && e.target.tagName === "BUTTON";
}
function At(e) {
  return yr(e);
}
const zr = function(e, t) {
  t === void 0 && (t = {});
  const {
    open: n,
    onOpenChange: r,
    dataRef: o,
    elements: {
      domReference: i
    }
  } = e, {
    enabled: s = !0,
    event: c = "click",
    toggle: u = !0,
    ignoreMouse: l = !1,
    keyboardHandlers: g = !0
  } = t, d = f.useRef(), v = f.useRef(!1);
  return f.useMemo(() => s ? {
    reference: {
      onPointerDown(a) {
        d.current = a.pointerType;
      },
      onMouseDown(a) {
        a.button === 0 && (Ve(d.current, !0) && l || c !== "click" && (n ? u && (!o.current.openEvent || o.current.openEvent.type === "mousedown") && r(!1) : (a.preventDefault(), r(!0)), o.current.openEvent = a.nativeEvent));
      },
      onClick(a) {
        if (c === "mousedown" && d.current) {
          d.current = void 0;
          return;
        }
        Ve(d.current, !0) && l || (n ? u && (!o.current.openEvent || o.current.openEvent.type === "click") && r(!1) : r(!0), o.current.openEvent = a.nativeEvent);
      },
      onKeyDown(a) {
        d.current = void 0, !(!g || Ot(a)) && (a.key === " " && !At(i) && (a.preventDefault(), v.current = !0), a.key === "Enter" && (n ? u && r(!1) : r(!0)));
      },
      onKeyUp(a) {
        !g || Ot(a) || At(i) || a.key === " " && v.current && (v.current = !1, n ? u && r(!1) : r(!0));
      }
    }
  } : {}, [s, o, c, l, g, i, u, n, r]);
}, Sr = f[/* @__PURE__ */ "useInsertionEffect".toString()], Ir = Sr || ((e) => e());
function se(e) {
  const t = f.useRef(() => {
    if (process.env.NODE_ENV !== "production")
      throw new Error("Cannot call an event handler while rendering.");
  });
  return Ir(() => {
    t.current = e;
  }), f.useCallback(function() {
    for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)
      r[o] = arguments[o];
    return t.current == null ? void 0 : t.current(...r);
  }, []);
}
function Pe(e, t) {
  if (t == null)
    return !1;
  if ("composedPath" in e)
    return e.composedPath().includes(t);
  const n = e;
  return n.target != null && t.contains(n.target);
}
const Or = {
  pointerdown: "onPointerDown",
  mousedown: "onMouseDown",
  click: "onClick"
}, Ar = {
  pointerdown: "onPointerDownCapture",
  mousedown: "onMouseDownCapture",
  click: "onClickCapture"
}, Mr = (e) => {
  var t, n;
  return {
    escapeKeyBubbles: typeof e == "boolean" ? e : (t = e?.escapeKey) != null ? t : !1,
    outsidePressBubbles: typeof e == "boolean" ? e : (n = e?.outsidePress) != null ? n : !0
  };
}, $r = function(e, t) {
  t === void 0 && (t = {});
  const {
    open: n,
    onOpenChange: r,
    events: o,
    nodeId: i,
    elements: {
      reference: s,
      domReference: c,
      floating: u
    },
    dataRef: l
  } = e, {
    enabled: g = !0,
    escapeKey: d = !0,
    outsidePress: v = !0,
    outsidePressEvent: a = "pointerdown",
    referencePress: h = !1,
    referencePressEvent: m = "pointerdown",
    ancestorScroll: b = !1,
    bubbles: x
  } = t, y = $e(), S = ut() != null, O = se(typeof v == "function" ? v : () => !1), E = typeof v == "function" ? O : v, w = f.useRef(!1), {
    escapeKeyBubbles: W,
    outsidePressBubbles: B
  } = Mr(x), I = se((L) => {
    if (!n || !g || !d || L.key !== "Escape")
      return;
    const p = y ? Xe(y.nodesRef.current, i) : [];
    if (!W && (L.stopPropagation(), p.length > 0)) {
      let C = !0;
      if (p.forEach((T) => {
        var A;
        if ((A = T.context) != null && A.open && !T.context.dataRef.current.__escapeKeyBubbles) {
          C = !1;
          return;
        }
      }), !C)
        return;
    }
    o.emit("dismiss", {
      type: "escapeKey",
      data: {
        returnFocus: {
          preventScroll: !1
        }
      }
    }), r(!1);
  }), R = se((L) => {
    const p = w.current;
    if (w.current = !1, p || typeof E == "function" && !E(L))
      return;
    const C = hr(L);
    if (Se(C) && u) {
      const F = C.clientWidth > 0 && C.scrollWidth > C.clientWidth, N = C.clientHeight > 0 && C.scrollHeight > C.clientHeight;
      let P = N && L.offsetX > C.clientWidth;
      if (N && _e(u).getComputedStyle(C).direction === "rtl" && (P = L.offsetX <= C.offsetWidth - C.clientWidth), P || F && L.offsetY > C.clientHeight)
        return;
    }
    const T = y && Xe(y.nodesRef.current, i).some((F) => {
      var N;
      return Pe(L, (N = F.context) == null ? void 0 : N.elements.floating);
    });
    if (Pe(L, u) || Pe(L, c) || T)
      return;
    const A = y ? Xe(y.nodesRef.current, i) : [];
    if (A.length > 0) {
      let F = !0;
      if (A.forEach((N) => {
        var P;
        if ((P = N.context) != null && P.open && !N.context.dataRef.current.__outsidePressBubbles) {
          F = !1;
          return;
        }
      }), !F)
        return;
    }
    o.emit("dismiss", {
      type: "outsidePress",
      data: {
        returnFocus: S ? {
          preventScroll: !0
        } : Jt(L) || Qt(L)
      }
    }), r(!1);
  });
  return f.useEffect(() => {
    if (!n || !g)
      return;
    l.current.__escapeKeyBubbles = W, l.current.__outsidePressBubbles = B;
    function L() {
      r(!1);
    }
    const p = Z(u);
    d && p.addEventListener("keydown", I), E && p.addEventListener(a, R);
    let C = [];
    return b && (J(c) && (C = ie(c)), J(u) && (C = C.concat(ie(u))), !J(s) && s && s.contextElement && (C = C.concat(ie(s.contextElement)))), C = C.filter((T) => {
      var A;
      return T !== ((A = p.defaultView) == null ? void 0 : A.visualViewport);
    }), C.forEach((T) => {
      T.addEventListener("scroll", L, {
        passive: !0
      });
    }), () => {
      d && p.removeEventListener("keydown", I), E && p.removeEventListener(a, R), C.forEach((T) => {
        T.removeEventListener("scroll", L);
      });
    };
  }, [l, u, c, s, d, E, a, n, r, b, g, W, B, I, R]), f.useEffect(() => {
    w.current = !1;
  }, [E, a]), f.useMemo(() => g ? {
    reference: {
      onKeyDown: I,
      [Or[m]]: () => {
        h && (o.emit("dismiss", {
          type: "referencePress",
          data: {
            returnFocus: !1
          }
        }), r(!1));
      }
    },
    floating: {
      onKeyDown: I,
      [Ar[a]]: () => {
        w.current = !0;
      }
    }
  } : {}, [g, o, h, a, m, r, I]);
}, _r = function(e, t) {
  t === void 0 && (t = {});
  const {
    open: n,
    onOpenChange: r,
    dataRef: o,
    events: i,
    refs: s,
    elements: {
      floating: c,
      domReference: u
    }
  } = e, {
    enabled: l = !0,
    keyboardOnly: g = !0
  } = t, d = f.useRef(""), v = f.useRef(!1), a = f.useRef();
  return f.useEffect(() => {
    if (!l)
      return;
    const m = Z(c).defaultView || window;
    function b() {
      !n && Se(u) && u === Ke(Z(u)) && (v.current = !0);
    }
    return m.addEventListener("blur", b), () => {
      m.removeEventListener("blur", b);
    };
  }, [c, u, n, l]), f.useEffect(() => {
    if (!l)
      return;
    function h(m) {
      (m.type === "referencePress" || m.type === "escapeKey") && (v.current = !0);
    }
    return i.on("dismiss", h), () => {
      i.off("dismiss", h);
    };
  }, [i, l]), f.useEffect(() => () => {
    clearTimeout(a.current);
  }, []), f.useMemo(() => l ? {
    reference: {
      onPointerDown(h) {
        let {
          pointerType: m
        } = h;
        d.current = m, v.current = !!(m && g);
      },
      onMouseLeave() {
        v.current = !1;
      },
      onFocus(h) {
        var m;
        v.current || h.type === "focus" && ((m = o.current.openEvent) == null ? void 0 : m.type) === "mousedown" && o.current.openEvent && Pe(o.current.openEvent, u) || (o.current.openEvent = h.nativeEvent, r(!0));
      },
      onBlur(h) {
        v.current = !1;
        const m = h.relatedTarget, b = J(m) && m.hasAttribute("data-floating-ui-focus-guard") && m.getAttribute("data-type") === "outside";
        a.current = setTimeout(() => {
          xe(s.floating.current, m) || xe(u, m) || b || r(!1);
        });
      }
    }
  } : {}, [l, g, u, s, o, r]);
};
let Mt = !1;
const lt = "ArrowUp", je = "ArrowDown", pe = "ArrowLeft", Ie = "ArrowRight";
function Me(e, t, n) {
  return Math.floor(e / t) !== n;
}
function be(e, t) {
  return t < 0 || t >= e.current.length;
}
function z(e, t) {
  let {
    startingIndex: n = -1,
    decrement: r = !1,
    disabledIndices: o,
    amount: i = 1
  } = t === void 0 ? {} : t;
  const s = e.current;
  let c = n;
  do {
    var u, l;
    c = c + (r ? -i : i);
  } while (c >= 0 && c <= s.length - 1 && (o ? o.includes(c) : s[c] == null || (u = s[c]) != null && u.hasAttribute("disabled") || ((l = s[c]) == null ? void 0 : l.getAttribute("aria-disabled")) === "true"));
  return c;
}
function qe(e, t, n) {
  switch (e) {
    case "vertical":
      return t;
    case "horizontal":
      return n;
    default:
      return t || n;
  }
}
function Lt(e, t) {
  return qe(t, e === lt || e === je, e === pe || e === Ie);
}
function Ze(e, t, n) {
  return qe(t, e === je, n ? e === pe : e === Ie) || e === "Enter" || e == " " || e === "";
}
function Lr(e, t, n) {
  return qe(t, n ? e === pe : e === Ie, e === je);
}
function Pr(e, t, n) {
  return qe(t, n ? e === Ie : e === pe, e === lt);
}
function Je(e, t) {
  return z(e, {
    disabledIndices: t
  });
}
function Pt(e, t) {
  return z(e, {
    decrement: !0,
    startingIndex: e.current.length,
    disabledIndices: t
  });
}
const jr = (e, t) => {
  const {
    open: n,
    onOpenChange: r,
    refs: o,
    elements: {
      domReference: i,
      floating: s
    }
  } = e, {
    listRef: c,
    activeIndex: u,
    onNavigate: l = () => {
    },
    enabled: g = !0,
    selectedIndex: d = null,
    allowEscape: v = !1,
    loop: a = !1,
    nested: h = !1,
    rtl: m = !1,
    virtual: b = !1,
    focusItemOnOpen: x = "auto",
    focusItemOnHover: y = !0,
    openOnArrowKeyDown: S = !0,
    disabledIndices: O = void 0,
    orientation: E = "vertical",
    cols: w = 1,
    scrollItemIntoView: W = !0
  } = t;
  process.env.NODE_ENV !== "production" && (v && (a || console.warn(["Floating UI: `useListNavigation` looping must be enabled to allow", "escaping."].join(" ")), b || console.warn(["Floating UI: `useListNavigation` must be virtual to allow", "escaping."].join(" "))), E === "vertical" && w > 1 && console.warn(["Floating UI: In grid list navigation mode (`cols` > 1), the", '`orientation` should be either "horizontal" or "both".'].join(" ")));
  const B = ut(), I = $e(), R = se(l), L = f.useRef(x), p = f.useRef(d ?? -1), C = f.useRef(null), T = f.useRef(!0), A = f.useRef(R), F = f.useRef(!!s), N = f.useRef(!1), P = f.useRef(!1), _ = ae(O), he = ae(n), Oe = ae(W), [at, sn] = f.useState(), ve = se(function(k, Y, K) {
    K === void 0 && (K = !1);
    const V = k.current[Y.current];
    V && (b ? sn(V.id) : Tt(V, {
      preventScroll: !0,
      // Mac Safari does not move the virtual cursor unless the focus call
      // is sync. However, for the very first focus call, we need to wait
      // for the position to be ready in order to prevent unwanted
      // scrolling. This means the virtual cursor will not move to the first
      // item when first opening the floating element, but will on
      // subsequent calls. `preventScroll` is supported in modern Safari,
      // so we can use that instead.
      // iOS Safari must be async or the first item will not be focused.
      sync: pr() && en() ? Mt || N.current : !1
    }), requestAnimationFrame(() => {
      const oe = Oe.current;
      oe && V && (K || !T.current) && (V.scrollIntoView == null || V.scrollIntoView(typeof oe == "boolean" ? {
        block: "nearest",
        inline: "nearest"
      } : oe));
    }));
  });
  $(() => {
    document.createElement("div").focus({
      get preventScroll() {
        return Mt = !0, !1;
      }
    });
  }, []), $(() => {
    g && (n && s ? L.current && d != null && (P.current = !0, R(d)) : F.current && (p.current = -1, A.current(null)));
  }, [g, n, s, d, R]), $(() => {
    if (g && n && s)
      if (u == null) {
        if (N.current = !1, d != null)
          return;
        if (F.current && (p.current = -1, ve(c, p)), !F.current && L.current && (C.current != null || L.current === !0 && C.current == null)) {
          let k = 0;
          const Y = () => {
            c.current[0] == null ? (k < 2 && (k ? requestAnimationFrame : queueMicrotask)(Y), k++) : (p.current = C.current == null || Ze(C.current, E, m) || h ? Je(c, _.current) : Pt(c, _.current), C.current = null, R(p.current));
          };
          Y();
        }
      } else
        be(c, u) || (p.current = u, ve(c, p, P.current), P.current = !1);
  }, [g, n, s, u, d, h, c, E, m, R, ve, _]), $(() => {
    if (g && F.current && !s && I) {
      var k, Y;
      const K = I.nodesRef.current, V = (k = K.find((H) => H.id === B)) == null || (Y = k.context) == null ? void 0 : Y.elements.floating, oe = Ke(Z(s)), M = K.some((H) => H.context && xe(H.context.elements.floating, oe));
      V && !M && V.focus({
        preventScroll: !0
      });
    }
  }, [g, s, I, B]), $(() => {
    A.current = R, F.current = !!s;
  }), $(() => {
    n || (C.current = null);
  }, [n]);
  const ft = u != null, dt = f.useMemo(() => {
    function k(K) {
      if (!n)
        return;
      const V = c.current.indexOf(K);
      V !== -1 && R(V);
    }
    return {
      onFocus(K) {
        let {
          currentTarget: V
        } = K;
        k(V);
      },
      onClick: (K) => {
        let {
          currentTarget: V
        } = K;
        return V.focus({
          preventScroll: !0
        });
      },
      // Safari
      ...y && {
        onMouseMove(K) {
          let {
            currentTarget: V
          } = K;
          k(V);
        },
        onPointerLeave(K) {
          let {
            pointerType: V
          } = K;
          !T.current || V === "touch" || (p.current = -1, ve(c, p), R(null), b || Tt(o.floating.current, {
            preventScroll: !0
          }));
        }
      }
    };
  }, [n, o, ve, y, c, R, b]);
  return f.useMemo(() => {
    if (!g)
      return {};
    const k = _.current;
    function Y(M) {
      if (T.current = !1, N.current = !0, !he.current && M.currentTarget === o.floating.current)
        return;
      if (h && Pr(M.key, E, m)) {
        X(M), r(!1), Se(i) && i.focus();
        return;
      }
      const H = p.current, ee = Je(c, k), j = Pt(c, k);
      if (M.key === "Home" && (X(M), p.current = ee, R(p.current)), M.key === "End" && (X(M), p.current = j, R(p.current)), w > 1) {
        const D = p.current;
        if (M.key === lt) {
          if (X(M), D === -1)
            p.current = j;
          else if (p.current = z(c, {
            startingIndex: D,
            amount: w,
            decrement: !0,
            disabledIndices: k
          }), a && (D - w < ee || p.current < 0)) {
            const te = D % w, ye = j % w, mt = j - (ye - te);
            ye === te ? p.current = j : p.current = ye > te ? mt : mt - w;
          }
          be(c, p.current) && (p.current = D), R(p.current);
        }
        if (M.key === je && (X(M), D === -1 ? p.current = ee : (p.current = z(c, {
          startingIndex: D,
          amount: w,
          disabledIndices: k
        }), a && D + w > j && (p.current = z(c, {
          startingIndex: D % w - w,
          amount: w,
          disabledIndices: k
        }))), be(c, p.current) && (p.current = D), R(p.current)), E === "both") {
          const te = Math.floor(D / w);
          M.key === Ie && (X(M), D % w !== w - 1 ? (p.current = z(c, {
            startingIndex: D,
            disabledIndices: k
          }), a && Me(p.current, w, te) && (p.current = z(c, {
            startingIndex: D - D % w - 1,
            disabledIndices: k
          }))) : a && (p.current = z(c, {
            startingIndex: D - D % w - 1,
            disabledIndices: k
          })), Me(p.current, w, te) && (p.current = D)), M.key === pe && (X(M), D % w !== 0 ? (p.current = z(c, {
            startingIndex: D,
            disabledIndices: k,
            decrement: !0
          }), a && Me(p.current, w, te) && (p.current = z(c, {
            startingIndex: D + (w - D % w),
            decrement: !0,
            disabledIndices: k
          }))) : a && (p.current = z(c, {
            startingIndex: D + (w - D % w),
            decrement: !0,
            disabledIndices: k
          })), Me(p.current, w, te) && (p.current = D));
          const ye = Math.floor(j / w) === te;
          be(c, p.current) && (a && ye ? p.current = M.key === pe ? j : z(c, {
            startingIndex: D - D % w - 1,
            disabledIndices: k
          }) : p.current = D), R(p.current);
          return;
        }
      }
      if (Lt(M.key, E)) {
        if (X(M), n && !b && Ke(M.currentTarget.ownerDocument) === M.currentTarget) {
          p.current = Ze(M.key, E, m) ? ee : j, R(p.current);
          return;
        }
        Ze(M.key, E, m) ? a ? p.current = H >= j ? v && H !== c.current.length ? -1 : ee : z(c, {
          startingIndex: H,
          disabledIndices: k
        }) : p.current = Math.min(j, z(c, {
          startingIndex: H,
          disabledIndices: k
        })) : a ? p.current = H <= ee ? v && H !== -1 ? c.current.length : j : z(c, {
          startingIndex: H,
          decrement: !0,
          disabledIndices: k
        }) : p.current = Math.max(ee, z(c, {
          startingIndex: H,
          decrement: !0,
          disabledIndices: k
        })), be(c, p.current) ? R(null) : R(p.current);
      }
    }
    function K(M) {
      x === "auto" && Jt(M.nativeEvent) && (L.current = !0);
    }
    function V(M) {
      L.current = x, x === "auto" && Qt(M.nativeEvent) && (L.current = !0);
    }
    const oe = b && n && ft && {
      "aria-activedescendant": at
    };
    return {
      reference: {
        ...oe,
        onKeyDown(M) {
          T.current = !1;
          const H = M.key.indexOf("Arrow") === 0;
          if (b && n)
            return Y(M);
          if (!n && !S && H)
            return;
          const ee = H || M.key === "Enter" || M.key.trim() === "", j = Lt(M.key, E), D = Lr(M.key, E, m);
          if (ee && (C.current = h && j ? null : M.key), h) {
            D && (X(M), n ? (p.current = Je(c, k), R(p.current)) : r(!0));
            return;
          }
          j && (d != null && (p.current = d), X(M), !n && S ? r(!0) : Y(M), n && R(p.current));
        },
        onFocus() {
          n && R(null);
        },
        onPointerDown: V,
        onMouseDown: K,
        onClick: K
      },
      floating: {
        "aria-orientation": E === "both" ? void 0 : E,
        ...oe,
        onKeyDown: Y,
        onPointerMove() {
          T.current = !0;
        }
      },
      item: dt
    };
  }, [i, o, at, _, he, c, g, E, m, b, n, ft, h, d, S, v, w, a, x, R, r, dt]);
};
function qr(e) {
  return f.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((n) => {
      typeof n == "function" ? n(t) : n != null && (n.current = t);
    });
  }, e);
}
const Ur = function(e, t) {
  t === void 0 && (t = {});
  const {
    open: n,
    floatingId: r
  } = e, {
    enabled: o = !0,
    role: i = "dialog"
  } = t, s = ct();
  return f.useMemo(() => {
    const c = {
      id: r,
      role: i
    };
    return o ? i === "tooltip" ? {
      reference: {
        "aria-describedby": n ? r : void 0
      },
      floating: c
    } : {
      reference: {
        "aria-expanded": n ? "true" : "false",
        "aria-haspopup": i === "alertdialog" ? "dialog" : i,
        "aria-controls": n ? r : void 0,
        ...i === "listbox" && {
          role: "combobox"
        },
        ...i === "menu" && {
          id: s
        }
      },
      floating: {
        ...c,
        ...i === "menu" && {
          "aria-labelledby": s
        }
      }
    } : {};
  }, [o, i, n, r, s]);
}, Yr = (e, t) => {
  var n;
  const {
    open: r,
    dataRef: o
  } = e, {
    listRef: i,
    activeIndex: s,
    onMatch: c,
    onTypingChange: u,
    enabled: l = !0,
    findMatch: g = null,
    resetMs: d = 750,
    ignoreKeys: v = [],
    selectedIndex: a = null
  } = t, h = f.useRef(), m = f.useRef(""), b = f.useRef((n = a ?? s) != null ? n : -1), x = f.useRef(null), y = se(c), S = se(u), O = ae(g), E = ae(v);
  return $(() => {
    r && (clearTimeout(h.current), x.current = null, m.current = "");
  }, [r]), $(() => {
    if (r && m.current === "") {
      var w;
      b.current = (w = a ?? s) != null ? w : -1;
    }
  }, [r, a, s]), f.useMemo(() => {
    if (!l)
      return {};
    function w(I) {
      I ? o.current.typing || (o.current.typing = I, S(I)) : o.current.typing && (o.current.typing = I, S(I));
    }
    function W(I, R, L) {
      const p = O.current ? O.current(R, L) : R.find((C) => C?.toLocaleLowerCase().indexOf(L.toLocaleLowerCase()) === 0);
      return p ? I.indexOf(p) : -1;
    }
    function B(I) {
      const R = i.current;
      if (m.current.length > 0 && m.current[0] !== " " && (W(R, R, m.current) === -1 ? w(!1) : I.key === " " && X(I)), R == null || E.current.includes(I.key) || // Character key.
      I.key.length !== 1 || // Modifier key.
      I.ctrlKey || I.metaKey || I.altKey)
        return;
      r && I.key !== " " && (X(I), w(!0)), R.every((T) => {
        var A, F;
        return T ? ((A = T[0]) == null ? void 0 : A.toLocaleLowerCase()) !== ((F = T[1]) == null ? void 0 : F.toLocaleLowerCase()) : !0;
      }) && m.current === I.key && (m.current = "", b.current = x.current), m.current += I.key, clearTimeout(h.current), h.current = setTimeout(() => {
        m.current = "", b.current = x.current, w(!1);
      }, d);
      const p = b.current, C = W(R, [...R.slice((p || 0) + 1), ...R.slice(0, (p || 0) + 1)], m.current);
      C !== -1 ? (y(C), x.current = C) : (m.current = "", w(!1));
    }
    return {
      reference: {
        onKeyDown: B
      },
      floating: {
        onKeyDown: B
      }
    };
  }, [l, r, o, i, d, E, O, y, S]);
};
function Xr(e) {
  e === void 0 && (e = {});
  const {
    open: t = !1,
    onOpenChange: n,
    nodeId: r
  } = e, o = zn(e), i = $e(), s = f.useRef(null), c = f.useRef({}), u = f.useState(() => ar())[0], l = ct(), [g, d] = f.useState(null), v = f.useCallback((y) => {
    const S = J(y) ? {
      getBoundingClientRect: () => y.getBoundingClientRect(),
      contextElement: y
    } : y;
    o.refs.setReference(S);
  }, [o.refs]), a = f.useCallback((y) => {
    (J(y) || y === null) && (s.current = y, d(y)), (J(o.refs.reference.current) || o.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    y !== null && !J(y)) && o.refs.setReference(y);
  }, [o.refs]), h = f.useMemo(() => ({
    ...o.refs,
    setReference: a,
    setPositionReference: v,
    domReference: s
  }), [o.refs, a, v]), m = f.useMemo(() => ({
    ...o.elements,
    domReference: g
  }), [o.elements, g]), b = se(n), x = f.useMemo(() => ({
    ...o,
    refs: h,
    elements: m,
    dataRef: c,
    nodeId: r,
    floatingId: l,
    events: u,
    open: t,
    onOpenChange: b
  }), [o, r, l, u, t, b, h, m]);
  return $(() => {
    const y = i?.nodesRef.current.find((S) => S.id === r);
    y && (y.context = x);
  }), f.useMemo(() => ({
    ...o,
    context: x,
    refs: h,
    elements: m,
    reference: a,
    positionReference: v
  }), [o, h, m, x, a, v]);
}
function Qe(e, t, n) {
  const r = /* @__PURE__ */ new Map();
  return {
    ...n === "floating" && {
      tabIndex: -1
    },
    ...e,
    ...t.map((o) => o ? o[n] : null).concat(e).reduce((o, i) => (i && Object.entries(i).forEach((s) => {
      let [c, u] = s;
      if (c.indexOf("on") === 0) {
        if (r.has(c) || r.set(c, []), typeof u == "function") {
          var l;
          (l = r.get(c)) == null || l.push(u), o[c] = function() {
            for (var g, d = arguments.length, v = new Array(d), a = 0; a < d; a++)
              v[a] = arguments[a];
            return (g = r.get(c)) == null ? void 0 : g.map((h) => h(...v)).find((h) => h !== void 0);
          };
        }
      } else
        o[c] = u;
    }), o), {})
  };
}
const Gr = function(e) {
  e === void 0 && (e = []);
  const t = e, n = f.useCallback(
    (i) => Qe(i, e, "reference"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    t
  ), r = f.useCallback(
    (i) => Qe(i, e, "floating"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    t
  ), o = f.useCallback(
    (i) => Qe(i, e, "item"),
    // Granularly check for `item` changes, because the `getItemProps` getter
    // should be as referentially stable as possible since it may be passed as
    // a prop to many components. All `item` key values must therefore be
    // memoized.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    e.map((i) => i?.item)
  );
  return f.useMemo(() => ({
    getReferenceProps: n,
    getFloatingProps: r,
    getItemProps: o
  }), [n, r, o]);
};
export {
  Hr as F,
  Gr as a,
  jr as b,
  $r as c,
  _r as d,
  zr as e,
  Yr as f,
  Nr as g,
  Br as h,
  Wr as i,
  Kr as j,
  Ur as k,
  qr as l,
  Fr as o,
  Vr as s,
  Xr as u
};
