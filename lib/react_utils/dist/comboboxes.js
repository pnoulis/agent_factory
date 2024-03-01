import * as i from "react";
import { u as W, a as z, b as H, c as U, d as Y, e as G, f as Me, g as Q, s as X, h as J, i as Z } from "./floating-ui.react.esm-84c9a4b8.js";
import "react-dom";
const j = i.createContext(null), P = () => {
  const r = i.useContext(j);
  if (r == null)
    throw new Error("Component is not being provided the <Combobox/> context");
  return r;
}, Ce = ({ children: r, ...n }) => {
  const s = Se(n);
  return /* @__PURE__ */ i.createElement(j.Provider, { value: s }, r);
};
function Se({
  name: r,
  labelledBy: n = "",
  options: s,
  getLabels: t = (f) => f,
  defaultLabel: e = "",
  onSelect: o = () => {
  },
  initialOpen: c = !1,
  open: a,
  onOpenChange: l,
  asTable: u = !1,
  placement: h = "bottom-start"
} = {}) {
  const [f, d] = i.useState(c), [x, m] = i.useState(null), [y, E] = i.useState(""), v = a ?? f, I = u ? () => !0 : l ?? d, M = i.useRef(null), S = i.useRef(null), $ = i.useRef([]);
  if (M.current == null) {
    if (S.current = t(s) || [], S.current.length !== s.length)
      throw new Error("Error by getLabels()");
    M.current = /* @__PURE__ */ new Map(), S.current.forEach(
      (p, b) => M.current.set(p, s[b])
    );
  }
  i.useEffect(() => {
    y || S.current.forEach((p, b) => {
      p === e && (m(b), E(p));
    });
  }, [v, s, e]);
  const R = W({
    open: v,
    initialPlacement: h,
    onOpenChange: I,
    whileElementsMounted: Q,
    middleware: [
      X({
        apply({ rects: p, elements: b }) {
          b.floating.style.minWidth = `${p.reference.width}px`;
        }
      }),
      J({
        fallbackStrategy: "initialPlacement"
      }),
      Z()
    ]
  }), w = z([
    H(R.context, {
      listRef: $,
      activeIndex: x,
      onNavigate: m,
      virtual: !0,
      loop: !0
    }),
    U(R.context),
    Y(R.context, { keyboardOnly: !0 }),
    G(R.context, {
      keyboardHandlers: !1
    }),
    Me(R.context, {
      listRef: S,
      activeIndex: x,
      onMatch: m,
      resetMs: 500
    })
  ]), C = (p) => {
    let b;
    p.target ? (b = p.target.value, I(!0)) : b = p, E(b);
  };
  return i.useMemo(
    () => ({
      name: r,
      labelledBy: n,
      isOpen: v,
      setIsOpen: I,
      inputValue: y,
      onSelect: o,
      setInputValue: E,
      onInputValueChange: C,
      activeIndex: x,
      setActiveIndex: m,
      optionsRef: M,
      labelsRef: S,
      listRef: $,
      ...R,
      ...w
    }),
    [v, I, y, E, w, R]
  );
}
function we({ placeholder: r, className: n, children: s, ...t }) {
  const e = P();
  return typeof s == "function" ? s({
    readOnly: !0,
    id: `${e.name}-trigger`,
    ref: e.refs.setReference,
    role: "combobox",
    "aria-controls": `${e.name}-listbox`,
    "aria-expanded": e.isOpen,
    "aria-haspopup": "listbox",
    "aria-labelledby": e.labelledBy,
    tabIndex: 0,
    name: e.name,
    type: "text",
    placeholder: r,
    value: e.inputValue,
    onChange: e.onInputValueChange,
    ...e.getReferenceProps({
      onKeyDown: (o) => {
        switch (o.code) {
          case "Enter":
            if (e.activeIndex != null && e.labelsRef.current[e.activeIndex]) {
              const c = e.labelsRef.current[e.activeIndex];
              e.onInputValueChange(c), e.setActiveIndex(null), e.setIsOpen(!1), e.onSelect(
                e.optionsRef.current.get(c),
                e.onInputValueChange
              );
            }
            break;
          case "Space":
            e.setIsOpen(!1);
            break;
          case "Escape":
            e.isOpen || (e.onInputValueChange(""), e.setActiveIndex(null), e.refs.domReference.current?.blur(), e.onSelect("", e.onInputValueChange));
            break;
        }
      }
    }),
    ...t
  }) : /* @__PURE__ */ i.createElement(
    "input",
    {
      readOnly: !0,
      id: `${e.name}-trigger`,
      ref: e.refs.setReference,
      className: `combobox trigger ${n || ""}`,
      role: "combobox",
      "aria-controls": `${e.name}-listbox`,
      "aria-expanded": e.isOpen,
      "aria-haspopup": "listbox",
      "aria-labelledby": e.labelledBy,
      tabIndex: 0,
      name: e.name,
      type: "text",
      placeholder: r,
      value: e.inputValue,
      onChange: e.onInputValueChange,
      ...e.getReferenceProps({
        onKeyDown: (o) => {
          switch (o.code) {
            case "Enter":
              if (e.activeIndex != null && e.labelsRef.current[e.activeIndex]) {
                const c = e.labelsRef.current[e.activeIndex];
                e.onInputValueChange(c), e.setActiveIndex(null), e.setIsOpen(!1), e.onSelect(
                  e.optionsRef.current.get(c),
                  e.onInputValueChange
                );
              }
              break;
            case "Space":
              e.setIsOpen(!1);
              break;
            case "Escape":
              e.isOpen || (e.onInputValueChange(""), e.setActiveIndex(null), e.refs.domReference.current?.blur(), e.onSelect("", e.onInputValueChange));
              break;
          }
        },
        ...t
      })
    }
  );
}
function $e({ renderOnEmpty: r, renderOption: n, className: s, ...t }) {
  const e = P();
  return /* @__PURE__ */ i.createElement(i.Fragment, null, e.isOpen && /* @__PURE__ */ i.createElement(
    "ul",
    {
      id: `${e.name}-listbox`,
      ref: e.refs.setFloating,
      className: `combobox listbox ${s}`,
      role: "listbox",
      "aria-labelledby": e.labelledBy,
      style: {
        position: e.strategy,
        top: e.y ?? 0,
        left: e.x ?? 0
      },
      ...e.getFloatingProps(t)
    },
    e.optionsRef.current.size >= 1 ? e.labelsRef.current.map(
      (o, c) => n({
        id: `${e.name}-opt-${c}`,
        key: o,
        label: o,
        option: e.optionsRef.current.get(o),
        i: c,
        ctx: e,
        ref: (a) => e.listRef.current[c] = a,
        selected: o === e.inputValue,
        active: e.activeIndex === c,
        role: "option",
        tabIndex: -1,
        onClick: (a) => {
          a.preventDefault(), e.onInputValueChange(o), e.setIsOpen(!1), e.onSelect(
            e.optionsRef.current.get(o),
            e.onInputValueChange
          );
        }
      })
    ) : r
  ));
}
const Oe = i.forwardRef(
  ({ active: r, selected: n, label: s, ctx: t, className: e, children: o, ...c }, a) => /* @__PURE__ */ i.createElement(
    "li",
    {
      className: `combobox option ${e}`,
      "aria-selected": n,
      ...t.getItemProps({
        ref: a,
        ...c
      })
    },
    o || s
  )
), Tt = {
  Provider: Ce,
  Trigger: we,
  Listbox: $e,
  Option: Oe
}, Ae = ({ children: r, ...n }) => {
  const s = ke(n);
  return /* @__PURE__ */ i.createElement(j.Provider, { value: s }, r);
};
function ke({
  name: r,
  labelledBy: n = "",
  options: s,
  getLabels: t = () => {
  },
  defaultLabel: e = "",
  onSelect: o = () => {
  },
  initialOpen: c = !1,
  open: a,
  onOpenChange: l,
  asTable: u = !1
} = {}) {
  const [h, f] = i.useState(c), [d, x] = i.useState(null), [m, y] = i.useState(""), E = a ?? h, v = u ? () => !0 : l ?? f, I = i.useRef(null), M = i.useRef(null), S = i.useRef([]);
  if (I.current == null) {
    if (M.current = t(s) || [], M.current.length !== s.length)
      throw new Error("Error by getLabels()");
    I.current = /* @__PURE__ */ new Map(), M.current.forEach(
      (C, p) => I.current.set(C, s[p])
    );
  }
  i.useEffect(() => {
    m || M.current.forEach((C, p) => {
      C === e && (x(p), y(C));
    });
  }, [E, s, e]);
  const $ = W({
    open: E,
    onOpenChange: v,
    whileElementsMounted: Q,
    middleware: [
      J(),
      Z(),
      X({
        apply({ rects: C, elements: p }) {
          p.floating.style.width = `${C.reference.width}px`;
        }
      })
    ]
  }), R = z([
    H($.context, {
      listRef: S,
      activeIndex: d,
      onNavigate: x,
      virtual: !0,
      loop: !0
    }),
    U($.context),
    Y($.context, { keyboardOnly: !0 }),
    G($.context, { keyboardHandlers: !1 })
  ]), w = (C) => {
    let p;
    C.target ? (p = C.target.value, v(!0), x(null)) : p = C, y(p);
  };
  return i.useMemo(
    () => ({
      name: r,
      labelledBy: n,
      isOpen: E,
      setIsOpen: v,
      inputValue: m,
      onSelect: o,
      setInputValue: y,
      onInputValueChange: w,
      activeIndex: d,
      setActiveIndex: x,
      optionsRef: I,
      labelsRef: M,
      listRef: S,
      ...$,
      ...R
    }),
    [E, v, m, y, R, $]
  );
}
function Ve({ placeholder: r, className: n, ...s }) {
  const t = P();
  return /* @__PURE__ */ i.createElement(
    "input",
    {
      id: `${t.name}-trigger`,
      ref: t.refs.setReference,
      className: `combobox trigger ${n || ""}`,
      role: "combobox",
      "aria-controls": `${t.name}-listbox`,
      "aria-expanded": t.isOpen,
      "aria-haspopup": "listbox",
      "aria-labelledby": t.labelledBy,
      "aria-autocomplete": "none",
      tabIndex: 0,
      name: t.name,
      type: "text",
      placeholder: r,
      value: t.inputValue,
      onChange: t.onInputValueChange,
      ...t.getReferenceProps({
        onKeyDown: (e) => {
          switch (e.code) {
            case "Enter":
              if (t.activeIndex != null && t.labelsRef.current[t.activeIndex]) {
                const o = t.labelsRef.current[t.activeIndex];
                t.onInputValueChange(o), t.setActiveIndex(null), t.setIsOpen(!1), t.onSelect(t.optionsRef.current.get(o));
              } else
                t.setActiveIndex(null), t.setIsOpen(!1), t.onSelect(t.inputValue);
              break;
            case "Escape":
              t.isOpen || (t.onInputValueChange(""), t.setActiveIndex(null), t.refs.domReference.current?.blur(), t.onSelect(""));
              break;
          }
        },
        ...s
      })
    }
  );
}
function _e({ renderOnEmpty: r, renderOption: n, className: s, ...t }) {
  const e = P();
  return /* @__PURE__ */ i.createElement(i.Fragment, null, e.isOpen && /* @__PURE__ */ i.createElement(
    "ul",
    {
      id: `${e.name}-listbox`,
      ref: e.refs.setFloating,
      className: `combobox listbox ${s}`,
      role: "listbox",
      "aria-labelledby": e.labelledBy,
      style: {
        position: e.strategy,
        top: e.y ?? 0,
        left: e.x ?? 0
      },
      ...e.getFloatingProps(t)
    },
    e.optionsRef.current.size >= 1 ? e.labelsRef.current.map(
      (o, c) => n({
        id: `${e.name}-opt-${c}`,
        key: o,
        label: o,
        option: e.optionsRef.current.get(o),
        i: c,
        ctx: e,
        ref: (a) => e.listRef.current[c] = a,
        selected: o === e.inputValue,
        active: e.activeIndex === c,
        role: "option",
        tabIndex: -1,
        onClick: (a) => {
          a.preventDefault(), e.onInputValueChange(o), e.setIsOpen(!1), e.onSelect(e.optionsRef.current.get(o));
        }
      })
    ) : r
  ));
}
const Ne = i.forwardRef(
  ({ active: r, selected: n, label: s, ctx: t, className: e, children: o, ...c }, a) => /* @__PURE__ */ i.createElement(
    "li",
    {
      className: `combobox option ${e}`,
      "aria-selected": n,
      ...t.getItemProps({
        ref: a,
        ...c
      })
    },
    o || s
  )
), Dt = {
  Provider: Ae,
  Trigger: Ve,
  Listbox: _e,
  Option: Ne
};
function F(r) {
  return Array.isArray ? Array.isArray(r) : me(r) === "[object Array]";
}
const Le = 1 / 0;
function Pe(r) {
  if (typeof r == "string")
    return r;
  let n = r + "";
  return n == "0" && 1 / r == -Le ? "-0" : n;
}
function Fe(r) {
  return r == null ? "" : Pe(r);
}
function L(r) {
  return typeof r == "string";
}
function ge(r) {
  return typeof r == "number";
}
function Te(r) {
  return r === !0 || r === !1 || De(r) && me(r) == "[object Boolean]";
}
function xe(r) {
  return typeof r == "object";
}
function De(r) {
  return xe(r) && r !== null;
}
function N(r) {
  return r != null;
}
function ne(r) {
  return !r.trim().length;
}
function me(r) {
  return r == null ? r === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(r);
}
const Be = "Incorrect 'index' type", je = (r) => `Invalid value for key ${r}`, Ke = (r) => `Pattern length exceeds max of ${r}.`, We = (r) => `Missing ${r} property in key`, ze = (r) => `Property 'weight' in key '${r}' must be a positive integer`, ue = Object.prototype.hasOwnProperty;
class He {
  constructor(n) {
    this._keys = [], this._keyMap = {};
    let s = 0;
    n.forEach((t) => {
      let e = be(t);
      s += e.weight, this._keys.push(e), this._keyMap[e.id] = e, s += e.weight;
    }), this._keys.forEach((t) => {
      t.weight /= s;
    });
  }
  get(n) {
    return this._keyMap[n];
  }
  keys() {
    return this._keys;
  }
  toJSON() {
    return JSON.stringify(this._keys);
  }
}
function be(r) {
  let n = null, s = null, t = null, e = 1, o = null;
  if (L(r) || F(r))
    t = r, n = he(r), s = se(r);
  else {
    if (!ue.call(r, "name"))
      throw new Error(We("name"));
    const c = r.name;
    if (t = c, ue.call(r, "weight") && (e = r.weight, e <= 0))
      throw new Error(ze(c));
    n = he(c), s = se(c), o = r.getFn;
  }
  return { path: n, id: s, weight: e, src: t, getFn: o };
}
function he(r) {
  return F(r) ? r : r.split(".");
}
function se(r) {
  return F(r) ? r.join(".") : r;
}
function Ue(r, n) {
  let s = [], t = !1;
  const e = (o, c, a) => {
    if (N(o))
      if (!c[a])
        s.push(o);
      else {
        let l = c[a];
        const u = o[l];
        if (!N(u))
          return;
        if (a === c.length - 1 && (L(u) || ge(u) || Te(u)))
          s.push(Fe(u));
        else if (F(u)) {
          t = !0;
          for (let h = 0, f = u.length; h < f; h += 1)
            e(u[h], c, a + 1);
        } else
          c.length && e(u, c, a + 1);
      }
  };
  return e(r, L(n) ? n.split(".") : n, 0), t ? s : s[0];
}
const Ye = {
  // Whether the matches should be included in the result set. When `true`, each record in the result
  // set will include the indices of the matched characters.
  // These can consequently be used for highlighting purposes.
  includeMatches: !1,
  // When `true`, the matching function will continue to the end of a search pattern even if
  // a perfect match has already been located in the string.
  findAllMatches: !1,
  // Minimum number of characters that must be matched before a result is considered a match
  minMatchCharLength: 1
}, Ge = {
  // When `true`, the algorithm continues searching to the end of the input even if a perfect
  // match is found before the end of the same input.
  isCaseSensitive: !1,
  // When true, the matching function will continue to the end of a search pattern even if
  includeScore: !1,
  // List of properties that will be searched. This also supports nested properties.
  keys: [],
  // Whether to sort the result list, by score
  shouldSort: !0,
  // Default sort function: sort by ascending score, ascending index
  sortFn: (r, n) => r.score === n.score ? r.idx < n.idx ? -1 : 1 : r.score < n.score ? -1 : 1
}, Qe = {
  // Approximately where in the text is the pattern expected to be found?
  location: 0,
  // At what point does the match algorithm give up. A threshold of '0.0' requires a perfect match
  // (of both letters and location), a threshold of '1.0' would match anything.
  threshold: 0.6,
  // Determines how close the match must be to the fuzzy location (specified above).
  // An exact letter match which is 'distance' characters away from the fuzzy location
  // would score as a complete mismatch. A distance of '0' requires the match be at
  // the exact location specified, a threshold of '1000' would require a perfect match
  // to be within 800 characters of the fuzzy location to be found using a 0.8 threshold.
  distance: 100
}, Xe = {
  // When `true`, it enables the use of unix-like search commands
  useExtendedSearch: !1,
  // The get function to use when fetching an object's properties.
  // The default will search nested paths *ie foo.bar.baz*
  getFn: Ue,
  // When `true`, search will ignore `location` and `distance`, so it won't matter
  // where in the string the pattern appears.
  // More info: https://fusejs.io/concepts/scoring-theory.html#fuzziness-score
  ignoreLocation: !1,
  // When `true`, the calculation for the relevance score (used for sorting) will
  // ignore the field-length norm.
  // More info: https://fusejs.io/concepts/scoring-theory.html#field-length-norm
  ignoreFieldNorm: !1,
  // The weight to determine how much field length norm effects scoring.
  fieldNormWeight: 1
};
var g = {
  ...Ge,
  ...Ye,
  ...Qe,
  ...Xe
};
const Je = /[^ ]+/g;
function Ze(r = 1, n = 3) {
  const s = /* @__PURE__ */ new Map(), t = Math.pow(10, n);
  return {
    get(e) {
      const o = e.match(Je).length;
      if (s.has(o))
        return s.get(o);
      const c = 1 / Math.pow(o, 0.5 * r), a = parseFloat(Math.round(c * t) / t);
      return s.set(o, a), a;
    },
    clear() {
      s.clear();
    }
  };
}
class le {
  constructor({
    getFn: n = g.getFn,
    fieldNormWeight: s = g.fieldNormWeight
  } = {}) {
    this.norm = Ze(s, 3), this.getFn = n, this.isCreated = !1, this.setIndexRecords();
  }
  setSources(n = []) {
    this.docs = n;
  }
  setIndexRecords(n = []) {
    this.records = n;
  }
  setKeys(n = []) {
    this.keys = n, this._keysMap = {}, n.forEach((s, t) => {
      this._keysMap[s.id] = t;
    });
  }
  create() {
    this.isCreated || !this.docs.length || (this.isCreated = !0, L(this.docs[0]) ? this.docs.forEach((n, s) => {
      this._addString(n, s);
    }) : this.docs.forEach((n, s) => {
      this._addObject(n, s);
    }), this.norm.clear());
  }
  // Adds a doc to the end of the index
  add(n) {
    const s = this.size();
    L(n) ? this._addString(n, s) : this._addObject(n, s);
  }
  // Removes the doc at the specified index of the index
  removeAt(n) {
    this.records.splice(n, 1);
    for (let s = n, t = this.size(); s < t; s += 1)
      this.records[s].i -= 1;
  }
  getValueForItemAtKeyId(n, s) {
    return n[this._keysMap[s]];
  }
  size() {
    return this.records.length;
  }
  _addString(n, s) {
    if (!N(n) || ne(n))
      return;
    let t = {
      v: n,
      i: s,
      n: this.norm.get(n)
    };
    this.records.push(t);
  }
  _addObject(n, s) {
    let t = { i: s, $: {} };
    this.keys.forEach((e, o) => {
      let c = e.getFn ? e.getFn(n) : this.getFn(n, e.path);
      if (N(c)) {
        if (F(c)) {
          let a = [];
          const l = [{ nestedArrIndex: -1, value: c }];
          for (; l.length; ) {
            const { nestedArrIndex: u, value: h } = l.pop();
            if (N(h))
              if (L(h) && !ne(h)) {
                let f = {
                  v: h,
                  i: u,
                  n: this.norm.get(h)
                };
                a.push(f);
              } else
                F(h) && h.forEach((f, d) => {
                  l.push({
                    nestedArrIndex: d,
                    value: f
                  });
                });
          }
          t.$[o] = a;
        } else if (L(c) && !ne(c)) {
          let a = {
            v: c,
            n: this.norm.get(c)
          };
          t.$[o] = a;
        }
      }
    }), this.records.push(t);
  }
  toJSON() {
    return {
      keys: this.keys,
      records: this.records
    };
  }
}
function Ie(r, n, { getFn: s = g.getFn, fieldNormWeight: t = g.fieldNormWeight } = {}) {
  const e = new le({ getFn: s, fieldNormWeight: t });
  return e.setKeys(r.map(be)), e.setSources(n), e.create(), e;
}
function qe(r, { getFn: n = g.getFn, fieldNormWeight: s = g.fieldNormWeight } = {}) {
  const { keys: t, records: e } = r, o = new le({ getFn: n, fieldNormWeight: s });
  return o.setKeys(t), o.setIndexRecords(e), o;
}
function q(r, {
  errors: n = 0,
  currentLocation: s = 0,
  expectedLocation: t = 0,
  distance: e = g.distance,
  ignoreLocation: o = g.ignoreLocation
} = {}) {
  const c = n / r.length;
  if (o)
    return c;
  const a = Math.abs(t - s);
  return e ? c + a / e : a ? 1 : c;
}
function et(r = [], n = g.minMatchCharLength) {
  let s = [], t = -1, e = -1, o = 0;
  for (let c = r.length; o < c; o += 1) {
    let a = r[o];
    a && t === -1 ? t = o : !a && t !== -1 && (e = o - 1, e - t + 1 >= n && s.push([t, e]), t = -1);
  }
  return r[o - 1] && o - t >= n && s.push([t, o - 1]), s;
}
const B = 32;
function tt(r, n, s, {
  location: t = g.location,
  distance: e = g.distance,
  threshold: o = g.threshold,
  findAllMatches: c = g.findAllMatches,
  minMatchCharLength: a = g.minMatchCharLength,
  includeMatches: l = g.includeMatches,
  ignoreLocation: u = g.ignoreLocation
} = {}) {
  if (n.length > B)
    throw new Error(Ke(B));
  const h = n.length, f = r.length, d = Math.max(0, Math.min(t, f));
  let x = o, m = d;
  const y = a > 1 || l, E = y ? Array(f) : [];
  let v;
  for (; (v = r.indexOf(n, m)) > -1; ) {
    let w = q(n, {
      currentLocation: v,
      expectedLocation: d,
      distance: e,
      ignoreLocation: u
    });
    if (x = Math.min(w, x), m = v + h, y) {
      let C = 0;
      for (; C < h; )
        E[v + C] = 1, C += 1;
    }
  }
  m = -1;
  let I = [], M = 1, S = h + f;
  const $ = 1 << h - 1;
  for (let w = 0; w < h; w += 1) {
    let C = 0, p = S;
    for (; C < p; )
      q(n, {
        errors: w,
        currentLocation: d + p,
        expectedLocation: d,
        distance: e,
        ignoreLocation: u
      }) <= x ? C = p : S = p, p = Math.floor((S - C) / 2 + C);
    S = p;
    let b = Math.max(1, d - p + 1), O = c ? f : Math.min(d + p, f) + h, _ = Array(O + 2);
    _[O + 1] = (1 << w) - 1;
    for (let V = O; V >= b; V -= 1) {
      let A = V - 1, k = s[r.charAt(A)];
      if (y && (E[A] = +!!k), _[V] = (_[V + 1] << 1 | 1) & k, w && (_[V] |= (I[V + 1] | I[V]) << 1 | 1 | I[V + 1]), _[V] & $ && (M = q(n, {
        errors: w,
        currentLocation: A,
        expectedLocation: d,
        distance: e,
        ignoreLocation: u
      }), M <= x)) {
        if (x = M, m = A, m <= d)
          break;
        b = Math.max(1, 2 * d - m);
      }
    }
    if (q(n, {
      errors: w + 1,
      currentLocation: d,
      expectedLocation: d,
      distance: e,
      ignoreLocation: u
    }) > x)
      break;
    I = _;
  }
  const R = {
    isMatch: m >= 0,
    // Count exact matches (those with a score of 0) to be "almost" exact
    score: Math.max(1e-3, M)
  };
  if (y) {
    const w = et(E, a);
    w.length ? l && (R.indices = w) : R.isMatch = !1;
  }
  return R;
}
function nt(r) {
  let n = {};
  for (let s = 0, t = r.length; s < t; s += 1) {
    const e = r.charAt(s);
    n[e] = (n[e] || 0) | 1 << t - s - 1;
  }
  return n;
}
class ye {
  constructor(n, {
    location: s = g.location,
    threshold: t = g.threshold,
    distance: e = g.distance,
    includeMatches: o = g.includeMatches,
    findAllMatches: c = g.findAllMatches,
    minMatchCharLength: a = g.minMatchCharLength,
    isCaseSensitive: l = g.isCaseSensitive,
    ignoreLocation: u = g.ignoreLocation
  } = {}) {
    if (this.options = {
      location: s,
      threshold: t,
      distance: e,
      includeMatches: o,
      findAllMatches: c,
      minMatchCharLength: a,
      isCaseSensitive: l,
      ignoreLocation: u
    }, this.pattern = l ? n : n.toLowerCase(), this.chunks = [], !this.pattern.length)
      return;
    const h = (d, x) => {
      this.chunks.push({
        pattern: d,
        alphabet: nt(d),
        startIndex: x
      });
    }, f = this.pattern.length;
    if (f > B) {
      let d = 0;
      const x = f % B, m = f - x;
      for (; d < m; )
        h(this.pattern.substr(d, B), d), d += B;
      if (x) {
        const y = f - B;
        h(this.pattern.substr(y), y);
      }
    } else
      h(this.pattern, 0);
  }
  searchIn(n) {
    const { isCaseSensitive: s, includeMatches: t } = this.options;
    if (s || (n = n.toLowerCase()), this.pattern === n) {
      let m = {
        isMatch: !0,
        score: 0
      };
      return t && (m.indices = [[0, n.length - 1]]), m;
    }
    const {
      location: e,
      distance: o,
      threshold: c,
      findAllMatches: a,
      minMatchCharLength: l,
      ignoreLocation: u
    } = this.options;
    let h = [], f = 0, d = !1;
    this.chunks.forEach(({ pattern: m, alphabet: y, startIndex: E }) => {
      const { isMatch: v, score: I, indices: M } = tt(n, m, y, {
        location: e + E,
        distance: o,
        threshold: c,
        findAllMatches: a,
        minMatchCharLength: l,
        includeMatches: t,
        ignoreLocation: u
      });
      v && (d = !0), f += I, v && M && (h = [...h, ...M]);
    });
    let x = {
      isMatch: d,
      score: d ? f / this.chunks.length : 1
    };
    return d && t && (x.indices = h), x;
  }
}
class D {
  constructor(n) {
    this.pattern = n;
  }
  static isMultiMatch(n) {
    return fe(n, this.multiRegex);
  }
  static isSingleMatch(n) {
    return fe(n, this.singleRegex);
  }
  search() {
  }
}
function fe(r, n) {
  const s = r.match(n);
  return s ? s[1] : null;
}
class st extends D {
  constructor(n) {
    super(n);
  }
  static get type() {
    return "exact";
  }
  static get multiRegex() {
    return /^="(.*)"$/;
  }
  static get singleRegex() {
    return /^=(.*)$/;
  }
  search(n) {
    const s = n === this.pattern;
    return {
      isMatch: s,
      score: s ? 0 : 1,
      indices: [0, this.pattern.length - 1]
    };
  }
}
class rt extends D {
  constructor(n) {
    super(n);
  }
  static get type() {
    return "inverse-exact";
  }
  static get multiRegex() {
    return /^!"(.*)"$/;
  }
  static get singleRegex() {
    return /^!(.*)$/;
  }
  search(n) {
    const t = n.indexOf(this.pattern) === -1;
    return {
      isMatch: t,
      score: t ? 0 : 1,
      indices: [0, n.length - 1]
    };
  }
}
class ot extends D {
  constructor(n) {
    super(n);
  }
  static get type() {
    return "prefix-exact";
  }
  static get multiRegex() {
    return /^\^"(.*)"$/;
  }
  static get singleRegex() {
    return /^\^(.*)$/;
  }
  search(n) {
    const s = n.startsWith(this.pattern);
    return {
      isMatch: s,
      score: s ? 0 : 1,
      indices: [0, this.pattern.length - 1]
    };
  }
}
class ct extends D {
  constructor(n) {
    super(n);
  }
  static get type() {
    return "inverse-prefix-exact";
  }
  static get multiRegex() {
    return /^!\^"(.*)"$/;
  }
  static get singleRegex() {
    return /^!\^(.*)$/;
  }
  search(n) {
    const s = !n.startsWith(this.pattern);
    return {
      isMatch: s,
      score: s ? 0 : 1,
      indices: [0, n.length - 1]
    };
  }
}
class at extends D {
  constructor(n) {
    super(n);
  }
  static get type() {
    return "suffix-exact";
  }
  static get multiRegex() {
    return /^"(.*)"\$$/;
  }
  static get singleRegex() {
    return /^(.*)\$$/;
  }
  search(n) {
    const s = n.endsWith(this.pattern);
    return {
      isMatch: s,
      score: s ? 0 : 1,
      indices: [n.length - this.pattern.length, n.length - 1]
    };
  }
}
class it extends D {
  constructor(n) {
    super(n);
  }
  static get type() {
    return "inverse-suffix-exact";
  }
  static get multiRegex() {
    return /^!"(.*)"\$$/;
  }
  static get singleRegex() {
    return /^!(.*)\$$/;
  }
  search(n) {
    const s = !n.endsWith(this.pattern);
    return {
      isMatch: s,
      score: s ? 0 : 1,
      indices: [0, n.length - 1]
    };
  }
}
class ve extends D {
  constructor(n, {
    location: s = g.location,
    threshold: t = g.threshold,
    distance: e = g.distance,
    includeMatches: o = g.includeMatches,
    findAllMatches: c = g.findAllMatches,
    minMatchCharLength: a = g.minMatchCharLength,
    isCaseSensitive: l = g.isCaseSensitive,
    ignoreLocation: u = g.ignoreLocation
  } = {}) {
    super(n), this._bitapSearch = new ye(n, {
      location: s,
      threshold: t,
      distance: e,
      includeMatches: o,
      findAllMatches: c,
      minMatchCharLength: a,
      isCaseSensitive: l,
      ignoreLocation: u
    });
  }
  static get type() {
    return "fuzzy";
  }
  static get multiRegex() {
    return /^"(.*)"$/;
  }
  static get singleRegex() {
    return /^(.*)$/;
  }
  search(n) {
    return this._bitapSearch.searchIn(n);
  }
}
class Re extends D {
  constructor(n) {
    super(n);
  }
  static get type() {
    return "include";
  }
  static get multiRegex() {
    return /^'"(.*)"$/;
  }
  static get singleRegex() {
    return /^'(.*)$/;
  }
  search(n) {
    let s = 0, t;
    const e = [], o = this.pattern.length;
    for (; (t = n.indexOf(this.pattern, s)) > -1; )
      s = t + o, e.push([t, s - 1]);
    const c = !!e.length;
    return {
      isMatch: c,
      score: c ? 0 : 1,
      indices: e
    };
  }
}
const re = [
  st,
  Re,
  ot,
  ct,
  it,
  at,
  rt,
  ve
], pe = re.length, lt = / +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/, ut = "|";
function ht(r, n = {}) {
  return r.split(ut).map((s) => {
    let t = s.trim().split(lt).filter((o) => o && !!o.trim()), e = [];
    for (let o = 0, c = t.length; o < c; o += 1) {
      const a = t[o];
      let l = !1, u = -1;
      for (; !l && ++u < pe; ) {
        const h = re[u];
        let f = h.isMultiMatch(a);
        f && (e.push(new h(f, n)), l = !0);
      }
      if (!l)
        for (u = -1; ++u < pe; ) {
          const h = re[u];
          let f = h.isSingleMatch(a);
          if (f) {
            e.push(new h(f, n));
            break;
          }
        }
    }
    return e;
  });
}
const ft = /* @__PURE__ */ new Set([ve.type, Re.type]);
class pt {
  constructor(n, {
    isCaseSensitive: s = g.isCaseSensitive,
    includeMatches: t = g.includeMatches,
    minMatchCharLength: e = g.minMatchCharLength,
    ignoreLocation: o = g.ignoreLocation,
    findAllMatches: c = g.findAllMatches,
    location: a = g.location,
    threshold: l = g.threshold,
    distance: u = g.distance
  } = {}) {
    this.query = null, this.options = {
      isCaseSensitive: s,
      includeMatches: t,
      minMatchCharLength: e,
      findAllMatches: c,
      ignoreLocation: o,
      location: a,
      threshold: l,
      distance: u
    }, this.pattern = s ? n : n.toLowerCase(), this.query = ht(this.pattern, this.options);
  }
  static condition(n, s) {
    return s.useExtendedSearch;
  }
  searchIn(n) {
    const s = this.query;
    if (!s)
      return {
        isMatch: !1,
        score: 1
      };
    const { includeMatches: t, isCaseSensitive: e } = this.options;
    n = e ? n : n.toLowerCase();
    let o = 0, c = [], a = 0;
    for (let l = 0, u = s.length; l < u; l += 1) {
      const h = s[l];
      c.length = 0, o = 0;
      for (let f = 0, d = h.length; f < d; f += 1) {
        const x = h[f], { isMatch: m, indices: y, score: E } = x.search(n);
        if (m) {
          if (o += 1, a += E, t) {
            const v = x.constructor.type;
            ft.has(v) ? c = [...c, ...y] : c.push(y);
          }
        } else {
          a = 0, o = 0, c.length = 0;
          break;
        }
      }
      if (o) {
        let f = {
          isMatch: !0,
          score: a / o
        };
        return t && (f.indices = c), f;
      }
    }
    return {
      isMatch: !1,
      score: 1
    };
  }
}
const oe = [];
function dt(...r) {
  oe.push(...r);
}
function ce(r, n) {
  for (let s = 0, t = oe.length; s < t; s += 1) {
    let e = oe[s];
    if (e.condition(r, n))
      return new e(r, n);
  }
  return new ye(r, n);
}
const ee = {
  AND: "$and",
  OR: "$or"
}, ae = {
  PATH: "$path",
  PATTERN: "$val"
}, ie = (r) => !!(r[ee.AND] || r[ee.OR]), gt = (r) => !!r[ae.PATH], xt = (r) => !F(r) && xe(r) && !ie(r), de = (r) => ({
  [ee.AND]: Object.keys(r).map((n) => ({
    [n]: r[n]
  }))
});
function Ee(r, n, { auto: s = !0 } = {}) {
  const t = (e) => {
    let o = Object.keys(e);
    const c = gt(e);
    if (!c && o.length > 1 && !ie(e))
      return t(de(e));
    if (xt(e)) {
      const l = c ? e[ae.PATH] : o[0], u = c ? e[ae.PATTERN] : e[l];
      if (!L(u))
        throw new Error(je(l));
      const h = {
        keyId: se(l),
        pattern: u
      };
      return s && (h.searcher = ce(u, n)), h;
    }
    let a = {
      children: [],
      operator: o[0]
    };
    return o.forEach((l) => {
      const u = e[l];
      F(u) && u.forEach((h) => {
        a.children.push(t(h));
      });
    }), a;
  };
  return ie(r) || (r = de(r)), t(r);
}
function mt(r, { ignoreFieldNorm: n = g.ignoreFieldNorm }) {
  r.forEach((s) => {
    let t = 1;
    s.matches.forEach(({ key: e, norm: o, score: c }) => {
      const a = e ? e.weight : null;
      t *= Math.pow(
        c === 0 && a ? Number.EPSILON : c,
        (a || 1) * (n ? 1 : o)
      );
    }), s.score = t;
  });
}
function bt(r, n) {
  const s = r.matches;
  n.matches = [], N(s) && s.forEach((t) => {
    if (!N(t.indices) || !t.indices.length)
      return;
    const { indices: e, value: o } = t;
    let c = {
      indices: e,
      value: o
    };
    t.key && (c.key = t.key.src), t.idx > -1 && (c.refIndex = t.idx), n.matches.push(c);
  });
}
function It(r, n) {
  n.score = r.score;
}
function yt(r, n, {
  includeMatches: s = g.includeMatches,
  includeScore: t = g.includeScore
} = {}) {
  const e = [];
  return s && e.push(bt), t && e.push(It), r.map((o) => {
    const { idx: c } = o, a = {
      item: n[c],
      refIndex: c
    };
    return e.length && e.forEach((l) => {
      l(o, a);
    }), a;
  });
}
class T {
  constructor(n, s = {}, t) {
    this.options = { ...g, ...s }, this.options.useExtendedSearch, this._keyStore = new He(this.options.keys), this.setCollection(n, t);
  }
  setCollection(n, s) {
    if (this._docs = n, s && !(s instanceof le))
      throw new Error(Be);
    this._myIndex = s || Ie(this.options.keys, this._docs, {
      getFn: this.options.getFn,
      fieldNormWeight: this.options.fieldNormWeight
    });
  }
  add(n) {
    N(n) && (this._docs.push(n), this._myIndex.add(n));
  }
  remove(n = () => !1) {
    const s = [];
    for (let t = 0, e = this._docs.length; t < e; t += 1) {
      const o = this._docs[t];
      n(o, t) && (this.removeAt(t), t -= 1, e -= 1, s.push(o));
    }
    return s;
  }
  removeAt(n) {
    this._docs.splice(n, 1), this._myIndex.removeAt(n);
  }
  getIndex() {
    return this._myIndex;
  }
  search(n, { limit: s = -1 } = {}) {
    const {
      includeMatches: t,
      includeScore: e,
      shouldSort: o,
      sortFn: c,
      ignoreFieldNorm: a
    } = this.options;
    let l = L(n) ? L(this._docs[0]) ? this._searchStringList(n) : this._searchObjectList(n) : this._searchLogical(n);
    return mt(l, { ignoreFieldNorm: a }), o && l.sort(c), ge(s) && s > -1 && (l = l.slice(0, s)), yt(l, this._docs, {
      includeMatches: t,
      includeScore: e
    });
  }
  _searchStringList(n) {
    const s = ce(n, this.options), { records: t } = this._myIndex, e = [];
    return t.forEach(({ v: o, i: c, n: a }) => {
      if (!N(o))
        return;
      const { isMatch: l, score: u, indices: h } = s.searchIn(o);
      l && e.push({
        item: o,
        idx: c,
        matches: [{ score: u, value: o, norm: a, indices: h }]
      });
    }), e;
  }
  _searchLogical(n) {
    const s = Ee(n, this.options), t = (a, l, u) => {
      if (!a.children) {
        const { keyId: f, searcher: d } = a, x = this._findMatches({
          key: this._keyStore.get(f),
          value: this._myIndex.getValueForItemAtKeyId(l, f),
          searcher: d
        });
        return x && x.length ? [
          {
            idx: u,
            item: l,
            matches: x
          }
        ] : [];
      }
      const h = [];
      for (let f = 0, d = a.children.length; f < d; f += 1) {
        const x = a.children[f], m = t(x, l, u);
        if (m.length)
          h.push(...m);
        else if (a.operator === ee.AND)
          return [];
      }
      return h;
    }, e = this._myIndex.records, o = {}, c = [];
    return e.forEach(({ $: a, i: l }) => {
      if (N(a)) {
        let u = t(s, a, l);
        u.length && (o[l] || (o[l] = { idx: l, item: a, matches: [] }, c.push(o[l])), u.forEach(({ matches: h }) => {
          o[l].matches.push(...h);
        }));
      }
    }), c;
  }
  _searchObjectList(n) {
    const s = ce(n, this.options), { keys: t, records: e } = this._myIndex, o = [];
    return e.forEach(({ $: c, i: a }) => {
      if (!N(c))
        return;
      let l = [];
      t.forEach((u, h) => {
        l.push(
          ...this._findMatches({
            key: u,
            value: c[h],
            searcher: s
          })
        );
      }), l.length && o.push({
        idx: a,
        item: c,
        matches: l
      });
    }), o;
  }
  _findMatches({ key: n, value: s, searcher: t }) {
    if (!N(s))
      return [];
    let e = [];
    if (F(s))
      s.forEach(({ v: o, i: c, n: a }) => {
        if (!N(o))
          return;
        const { isMatch: l, score: u, indices: h } = t.searchIn(o);
        l && e.push({
          score: u,
          key: n,
          value: o,
          idx: c,
          norm: a,
          indices: h
        });
      });
    else {
      const { v: o, n: c } = s, { isMatch: a, score: l, indices: u } = t.searchIn(o);
      a && e.push({ score: l, key: n, value: o, norm: c, indices: u });
    }
    return e;
  }
}
T.version = "6.6.2";
T.createIndex = Ie;
T.parseIndex = qe;
T.config = g;
T.parseQuery = Ee;
dt(pt);
const vt = ({ children: r, ...n }) => {
  const s = Rt(n);
  return /* @__PURE__ */ i.createElement(j.Provider, { value: s }, r);
};
function Rt({
  name: r,
  labelledBy: n = "",
  options: s,
  parseOptions: t,
  onSelect: e = () => {
  },
  initialOpen: o = !1,
  open: c,
  onOpenChange: a
} = {}) {
  const [l, u] = i.useState(o), [h, f] = i.useState(null), [d, x] = i.useState(""), m = c ?? l, y = a ?? u, [E, v] = i.useState(() => /* @__PURE__ */ new Map()), I = i.useRef([]), M = i.useRef([]), S = i.useMemo(
    () => new T(Array.from(E.keys()), {
      thershold: 0.1
    }),
    [E]
  ), $ = (p) => S.search(p).map((b) => b.item), R = W({
    open: m,
    onOpenChange: y,
    whileElementsMounted: Q,
    middleware: [
      X({
        apply({ rects: p, elements: b }) {
          b.floating.style.minWidth = `${p.reference.width}px`;
        }
      }),
      J(),
      Z()
    ]
  }), w = z([
    H(R.context, {
      listRef: M,
      activeIndex: h,
      onNavigate: f,
      virtual: !0,
      loop: !0
    }),
    Y(R.context, { keyboardOnly: !0 }),
    a ?? U(R.context),
    a ?? G(R.context, { keyboardHandlers: !1 })
  ]), C = (p) => {
    let b;
    p.target ? (b = p.target.value, y(!0)) : b = p, x(b), f(0), s(b).then((O) => {
      if (!m)
        return;
      const { labels: _, options: K } = t(O), V = /* @__PURE__ */ new Map();
      _.forEach((A, k) => V.set(A, K[k])), v(V), f(0), I.current = Array.from(V.keys());
    }).catch((O) => console.log(O)), b ? I.current = $(b) : I.current = Array.from(E.keys());
  };
  return i.useMemo(
    () => ({
      name: r,
      labelledBy: n,
      isOpen: m,
      setIsOpen: y,
      inputValue: d,
      onSelect: e,
      setInputValue: x,
      onInputValueChange: C,
      activeIndex: h,
      setActiveIndex: f,
      data: E,
      options: I.current,
      listRef: M,
      ...R,
      ...w
    }),
    [
      m,
      y,
      d,
      x,
      w,
      R,
      E,
      v
    ]
  );
}
function Et({ placeholder: r, className: n, ...s }) {
  const t = P();
  return /* @__PURE__ */ i.createElement(
    "input",
    {
      id: `${t.name}-trigger`,
      ref: t.refs.setReference,
      className: `combobox trigger ${n}`,
      role: "combobox",
      "aria-controls": `${t.name}-listbox`,
      "aria-expanded": t.isOpen,
      "aria-haspopup": "listbox",
      "aria-labelledby": t.labelledBy,
      "aria-autocomplete": "list",
      tabIndex: 0,
      name: t.name,
      type: "text",
      placeholder: r,
      value: t.inputValue,
      onChange: t.onInputValueChange,
      ...t.getReferenceProps({
        onKeyDown: (e) => {
          switch (e.code) {
            case "Enter":
              t.activeIndex != null && t.options[t.activeIndex] ? (t.onInputValueChange(t.options[t.activeIndex]), t.setActiveIndex(null), t.onSelect(t.data.get(t.options[t.activeIndex]))) : t.setActiveIndex(null);
              break;
            case "Escape":
              t.isOpen || (t.onInputValueChange(""), t.setActiveIndex(null), t.refs.domReference.current?.blur());
              break;
            case "Tab":
              if (!t.isOpen)
                return;
              t.activeIndex != null && t.options[t.activeIndex] ? (t.onInputValueChange(t.options[t.activeIndex]), t.setActiveIndex(null), t.setIsOpen(!1), t.refs.domReference.current?.blur(), t.onSelect(t.data.get(t.options[t.activeIndex]))) : (t.setActiveIndex(null), t.setIsOpen(!1), t.refs.domReference.current?.blur());
          }
        },
        ...s
      })
    }
  );
}
function Mt({ renderOption: r, className: n, ...s }) {
  const t = P();
  return /* @__PURE__ */ i.createElement(i.Fragment, null, t.isOpen && t.options.length >= 1 && /* @__PURE__ */ i.createElement(
    "ul",
    {
      id: `${t.name}-listbox`,
      ref: t.refs.setFloating,
      className: `combobox listbox ${n}`,
      role: "listbox",
      "aria-labelledby": t.labelledBy,
      style: {
        position: t.strategy,
        top: t.y ?? 0,
        left: t.x ?? 0
      },
      ...t.getFloatingProps(s)
    },
    t.options.map(
      (e, o) => r({
        id: `${t.name}-opt-${o}`,
        key: e,
        label: e,
        option: t.data.get(e),
        i: o,
        ctx: t,
        ref: (c) => t.listRef.current[o] = c,
        selected: e === t.inputValue,
        active: t.activeIndex === o,
        role: "option",
        tabIndex: -1,
        onClick: (c) => {
          c.preventDefault(), t.onInputValueChange(e), t.refs.domReference.current?.focus(), t.onSelect(t.data.get(t.options[t.activeIndex]));
        }
      })
    )
  ));
}
const Ct = i.forwardRef(
  ({ active: r, selected: n, label: s, ctx: t, className: e, children: o, ...c }, a) => /* @__PURE__ */ i.createElement(
    "li",
    {
      className: `combobox option ${e}`,
      "aria-selected": n,
      ...t.getItemProps({
        ref: a,
        ...c
      })
    },
    o || s
  )
), Bt = {
  Provider: vt,
  Trigger: Et,
  Listbox: Mt,
  Option: Ct
}, St = ({ children: r, ...n }) => {
  const s = wt(n);
  return /* @__PURE__ */ i.createElement(j.Provider, { value: s }, r);
};
function wt({
  name: r,
  labelledBy: n = "",
  options: s,
  getLabels: t = (d) => d,
  defaultLabel: e = "",
  onSelect: o = () => {
  },
  initialOpen: c = !1,
  open: a,
  onOpenChange: l,
  asTable: u = !1,
  allowCustomValue: h = !0,
  placement: f = "bottom-start"
} = {}) {
  const [d, x] = i.useState(c), [m, y] = i.useState(null), [E, v] = i.useState(""), I = a ?? d, M = u ? () => !0 : l ?? x, S = i.useRef(null), $ = i.useRef(null), R = i.useRef([]), w = h ? 0 : 1, C = i.useRef([]), [p, b] = i.useState(), O = (A) => C.current.search(A).map((k) => k.item);
  i.useEffect(() => {
    if ($.current = t(s) || [], $.current.length !== s.length)
      throw new Error("Error by getLabels()");
    S.current = /* @__PURE__ */ new Map(), $.current.forEach((A, k) => {
      A === e && (y(k), v(A)), S.current.set(A, s[k]);
    }), C.current = new T($.current, { threshold: 0.1 }), b(Math.random().toString(32).substring(2, 8));
  }, [s, e]);
  const _ = W({
    open: I,
    initialPlacement: f,
    onOpenChange: M,
    whileElementsMounted: Q,
    middleware: [
      J({
        fallbackStrategy: "initialPlacement"
      }),
      Z(),
      X({
        apply({ rects: A, elements: k }) {
          k.floating.style.minWidth = `${A.reference.width}px`;
        }
      })
    ]
  }), K = z([
    H(_.context, {
      listRef: R,
      activeIndex: m,
      onNavigate: y,
      virtual: !0,
      loop: !0
    }),
    U(_.context),
    Y(_.context, { keyboardOnly: !0 }),
    G(_.context, { keyboardHandlers: !1 })
  ]), V = (A) => {
    let k;
    if (A.target ? (k = A.target.value, M(!0)) : k = A, !k)
      v(k), $.current = Array.from(S.current.keys());
    else {
      const te = O(k);
      te.length >= 1 && y(0), te.length >= w && ($.current = te, v(k));
    }
  };
  return i.useMemo(
    () => ({
      name: r,
      labelledBy: n,
      isOpen: I,
      setIsOpen: M,
      inputValue: E,
      onSelect: o,
      setInputValue: v,
      onInputValueChange: V,
      asTable: u,
      activeIndex: m,
      setActiveIndex: y,
      optionsRef: S,
      labelsRef: $,
      listRef: R,
      ..._,
      ...K
    }),
    [
      I,
      M,
      E,
      v,
      K,
      _,
      s
    ]
  );
}
function $t({ onInputValueChange: r, placeholder: n, className: s, ...t }) {
  const e = P();
  return /* @__PURE__ */ i.createElement(
    "input",
    {
      id: `${e.name}-trigger`,
      ref: e.refs.setReference,
      className: `combobox trigger ${s || ""}`,
      role: "combobox",
      "aria-controls": `${e.name}-listbox`,
      "aria-expanded": e.isOpen,
      "aria-haspopup": "listbox",
      "aria-labelledby": e.labelledBy,
      "aria-autocomplete": "none",
      tabIndex: 0,
      name: e.name,
      type: "text",
      placeholder: n,
      value: e.inputValue,
      onChange: (o) => {
        e.onInputValueChange(o), r?.(o);
      },
      ...e.getReferenceProps({
        onKeyDown: (o) => {
          switch (o.code) {
            case "Enter":
              if (e.activeIndex != null && e.labelsRef.current[e.activeIndex]) {
                const c = e.labelsRef.current[e.activeIndex];
                e.asTable || (e.onInputValueChange(c), e.setActiveIndex(null)), e.setIsOpen(!1), e.onSelect(
                  e.optionsRef.current.get(c),
                  e.onInputValueChange
                );
              } else
                e.setActiveIndex(null), e.setIsOpen(!1), e.onSelect(e.inputValue, e.onInputValueChange);
              break;
            case "Escape":
              e.isOpen || (e.onInputValueChange(""), e.setActiveIndex(null), e.refs.domReference.current?.blur(), e.onSelect("", e.onInputValueChange));
              break;
          }
        },
        ...t
      })
    }
  );
}
function Ot({ renderOnEmpty: r, renderOption: n, className: s, ...t }) {
  const e = P();
  return /* @__PURE__ */ i.createElement(i.Fragment, null, e.isOpen && /* @__PURE__ */ i.createElement(
    "ul",
    {
      id: `${e.name}-listbox`,
      ref: e.refs.setFloating,
      className: `combobox listbox ${s}`,
      role: "listbox",
      "aria-labelledby": e.labelledBy,
      style: {
        position: e.strategy,
        top: e.y ?? 0,
        left: e.x ?? 0
      },
      ...e.getFloatingProps(t)
    },
    e.optionsRef.current?.size >= 1 ? e.labelsRef.current.map(
      (o, c) => n({
        id: `${e.name}-opt-${c}`,
        key: o,
        label: o,
        option: e.optionsRef.current.get(o),
        i: c,
        ctx: e,
        ref: (a) => e.listRef.current[c] = a,
        selected: o === e.inputValue,
        active: e.activeIndex === c,
        role: "option",
        tabIndex: -1,
        onClick: (a) => {
          a.preventDefault(), !e.asTable && e.onInputValueChange(o), e.setIsOpen(!1), e.onSelect(
            e.optionsRef.current.get(o),
            e.onInputValueChange
          );
        }
      })
    ) : r(e)
  ));
}
const At = i.forwardRef(
  ({ active: r, selected: n, label: s, ctx: t, className: e, children: o, ...c }, a) => /* @__PURE__ */ i.createElement(
    "li",
    {
      className: `combobox option ${e}`,
      "aria-selected": n,
      ...t.getItemProps({
        ref: a,
        ...c
      })
    },
    o || s
  )
), jt = {
  Provider: St,
  Trigger: $t,
  Listbox: Ot,
  Option: At
}, kt = ({ children: r, ...n }) => {
  const s = Vt(n);
  return /* @__PURE__ */ i.createElement(j.Provider, { value: s }, r);
};
function Vt({
  name: r,
  labelledBy: n = "",
  options: s = () => {
  },
  onSelect: t = () => {
  },
  initialOpen: e = !1,
  open: o,
  onOpenChange: c,
  asTable: a = !1
} = {}) {
  const [l, u] = i.useState(e), [h, f] = i.useState(null), [d, x] = i.useState(""), m = o ?? l, y = a ? () => !0 : c ?? u, [E, v] = i.useState(() => /* @__PURE__ */ new Map()), I = i.useRef(null), M = i.useRef([]), S = i.useRef(null);
  S.current == null && (S.current = new T([], { threshold: 0.1 }));
  const $ = (p) => S.current.search(p).map((b) => b.item);
  i.useEffect(() => {
    d && s(d || "").then((p) => {
      I.current = Array.from(p.keys()), S.current = new T(I.current, { threshold: 0.1 }), v(p);
    }).catch((p) => console.log(p));
  }, [s]);
  const R = W({
    open: m,
    placement: "bottom-start",
    onOpenChange: y,
    whileElementsMounted: Q,
    middleware: [
      J(),
      Z(),
      X({
        apply({ rects: p, elements: b }) {
          b.floating.style.minWidth = `${p.reference.width}px`;
        }
      })
    ]
  }), w = z([
    H(R.context, {
      listRef: M,
      activeIndex: h,
      onNavigate: f,
      virtual: !0,
      loop: !0
    }),
    U(R.context),
    Y(R.context, { keyboardOnly: !0 }),
    G(R.context, { keyboardHandlers: !1 })
  ]), C = (p) => {
    let b;
    p.target ? (b = p.target.value, y(!0)) : b = p, x(b), b ? b.length < d.length ? (I.current = $(b), s(b).then((O) => {
      I.current = Array.from(O.keys()), I.current.length >= 1 && f(0), v(O);
    }).catch((O) => console.log(O))) : (I.current = $(b), I.current.length < 1 ? s(b).then((O) => {
      I.current = Array.from(O.keys()), I.current.length >= 1 && f(0), v(O);
    }).catch((O) => console.log(O)) : f(0)) : I.current = Array.from(E.keys());
  };
  return i.useMemo(
    () => ({
      name: r,
      labelledBy: n,
      isOpen: m,
      setIsOpen: y,
      inputValue: d,
      onSelect: t,
      setInputValue: x,
      asTable: a,
      onInputValueChange: C,
      activeIndex: h,
      setActiveIndex: f,
      options: E,
      labelsRef: I,
      listRef: M,
      ...R,
      ...w
    }),
    [
      m,
      y,
      d,
      x,
      w,
      R,
      E,
      v
    ]
  );
}
function _t({ placeholder: r, className: n, ...s }) {
  const t = P();
  return /* @__PURE__ */ i.createElement(
    "input",
    {
      id: `${t.name}-trigger`,
      ref: t.refs.setReference,
      className: `combobox trigger ${n || ""}`,
      role: "combobox",
      "aria-controls": `${t.name}-listbox`,
      "aria-expanded": t.isOpen,
      "aria-haspopup": "listbox",
      "aria-labelledby": t.labelledBy,
      "aria-autocomplete": "none",
      tabIndex: 0,
      name: t.name,
      type: "text",
      placeholder: r,
      value: t.inputValue,
      onChange: t.onInputValueChange,
      ...t.getReferenceProps({
        onKeyDown: (e) => {
          switch (e.code) {
            case "Enter":
              if (t.activeIndex != null && t.labelsRef.current[t.activeIndex]) {
                const o = t.labelsRef.current[t.activeIndex];
                t.asTable || (t.onInputValueChange(o), t.setActiveIndex(null)), t.setIsOpen(!1), t.onSelect(t.options.get(o));
              } else
                t.setActiveIndex(null), t.setIsOpen(!1), t.onSelect(t.inputValue);
              break;
            case "Escape":
              t.isOpen || (t.onInputValueChange(""), t.setActiveIndex(null), t.refs.domReference.current?.blur(), t.onSelect(""));
              break;
          }
        },
        ...s
      })
    }
  );
}
function Nt({ renderOnEmpty: r, renderOption: n, className: s, ...t }) {
  const e = P();
  return /* @__PURE__ */ i.createElement(i.Fragment, null, e.isOpen && /* @__PURE__ */ i.createElement(
    "ul",
    {
      id: `${e.name}-listbox`,
      ref: e.refs.setFloating,
      className: `combobox listbox ${s}`,
      role: "listbox",
      "aria-labelledby": e.labelledBy,
      style: {
        position: e.strategy,
        top: e.y ?? 0,
        left: e.x ?? 0
      },
      ...e.getFloatingProps(t)
    },
    e.options.size >= 1 ? e.labelsRef.current.map(
      (o, c) => n({
        id: `${e.name}-opt-${c}`,
        key: o,
        label: o,
        option: e.options.get(o),
        i: c,
        ctx: e,
        ref: (a) => e.listRef.current[c] = a,
        selected: o === e.inputValue,
        active: e.activeIndex === c,
        role: "option",
        tabIndex: -1,
        onClick: (a) => {
          a.preventDefault(), !e.asTable && e.onInputValueChange(o), e.setIsOpen(!1), e.onSelect(e.options.get(o));
        }
      })
    ) : r(e)
  ));
}
const Lt = i.forwardRef(
  ({ active: r, selected: n, label: s, ctx: t, className: e, children: o, ...c }, a) => /* @__PURE__ */ i.createElement(
    "li",
    {
      className: `combobox option ${e}`,
      "aria-selected": n,
      ...t.getItemProps({
        ref: a,
        ...c
      })
    },
    o || s
  )
), Kt = {
  Provider: kt,
  Trigger: _t,
  Listbox: Nt,
  Option: Lt
};
export {
  Bt as AsyncCombobox,
  Kt as AsyncSearchableCombobox,
  Dt as EditableCombobox,
  jt as SearchableCombobox,
  Tt as SelectOnlyCombobox
};
