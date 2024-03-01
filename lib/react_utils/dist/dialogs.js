import * as o from "react";
const C = o.createContext(null), i = () => {
  const e = o.useContext(C);
  if (e == null)
    throw new Error("Component is not being provided the <Dialog/> context");
  return e;
}, P = ({ children: e, ...t }) => {
  const n = D(t);
  return /* @__PURE__ */ o.createElement(C.Provider, { value: n }, e);
};
function D({
  id: e = Math.random().toString(36).substring(2, 10),
  onClose: t = (d) => {
  },
  initialOpen: n = !1,
  open: r,
  onOpenChange: u
}) {
  const [d, f] = o.useState(n), a = r ?? d, l = u ?? f, s = o.createRef(null), $ = `${e}-label`, m = `${e}-description`;
  function p(c) {
    return {
      ...c,
      id: `${e}-trigger`,
      onClick(g) {
        g.preventDefault(), l(!0);
      }
    };
  }
  function b(c) {
    return {
      ...c,
      id: `${e}-close`,
      onClick(g) {
        g.preventDefault(), l(!1), t(!1);
      }
    };
  }
  function v(c) {
    return {
      ...c,
      id: `${e}-confirm`,
      onClick(g) {
        g.preventDefault(), l(!1), t(!0);
      }
    };
  }
  function y(c) {
    return {
      ...c,
      id: e,
      ref: s
    };
  }
  function E(c) {
    c.stopPropagation(), c.key === "Escape" && (l(!1), t(!1));
  }
  return o.useEffect(() => {
    a && s.current.open == !1 ? (s.current.showModal(), window.addEventListener("keydown", E)) : !a && s.current.open == !0 && (s.current.close(), window.removeEventListener("keydown", E));
  }, [a, l]), {
    getTriggerProps: p,
    getDialogProps: y,
    getCloseProps: b,
    getConfirmProps: v,
    labelledBy: $,
    describedBy: m
  };
}
function x({ className: e, children: t, ...n }) {
  const r = i();
  return /* @__PURE__ */ o.createElement(
    "button",
    {
      className: `${e || ""} trigger`,
      ...r.getTriggerProps(n)
    },
    t
  );
}
function w({ className: e, children: t, ...n }) {
  const r = i();
  return /* @__PURE__ */ o.createElement(
    "dialog",
    {
      className: `${e || ""} dialog`,
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": r.labelledBy,
      "aria-describedby": r.describedBy,
      ...r.getDialogProps(n)
    },
    t
  );
}
function h({ className: e, children: t, ...n }) {
  const r = i();
  return /* @__PURE__ */ o.createElement("h2", { id: r.labelledBy, className: `${e || ""} heading`, ...n }, t);
}
function N({ className: e, children: t, ...n }) {
  const r = i();
  return /* @__PURE__ */ o.createElement(
    "h3",
    {
      id: r.describedBy,
      className: `${e || ""} description`,
      ...n
    },
    t
  );
}
function O({ className: e, children: t, ...n }) {
  const r = i();
  return /* @__PURE__ */ o.createElement(
    "button",
    {
      className: `${e || ""} close`,
      type: "button",
      ...r.getCloseProps(n)
    },
    t
  );
}
function k({ className: e, children: t, ...n }) {
  const r = i();
  return /* @__PURE__ */ o.createElement(
    "button",
    {
      className: `${e || ""} confirm`,
      type: "button",
      ...r.getConfirmProps(n)
    },
    t
  );
}
const F = {
  Provider: P,
  Content: w,
  Trigger: x,
  Heading: h,
  Description: N,
  Close: O,
  Confirm: k
}, B = ({ children: e, ...t }) => {
  const n = R(t);
  return /* @__PURE__ */ o.createElement(C.Provider, { value: n }, e);
};
function R({
  id: e = Math.random().toString(36).substring(2, 10),
  onClose: t = (d) => {
  },
  initialOpen: n = !1,
  open: r,
  onOpenChange: u
}) {
  const [d, f] = o.useState(n), a = r ?? d, l = u ?? f, s = o.createRef(null), $ = `${e}-label`, m = `${e}-description`;
  function p(c) {
    return {
      ...c,
      id: `${e}-trigger`,
      onClick(g) {
        g.preventDefault(), l(!0);
      }
    };
  }
  function b(c) {
    return {
      ...c,
      id: `${e}-close`,
      onClick(g) {
        g.preventDefault(), l(!1), t(!1);
      }
    };
  }
  function v(c) {
    return {
      ...c,
      id: `${e}-confirm`
    };
  }
  function y(c) {
    return {
      ...c,
      id: e,
      ref: s
    };
  }
  function E(c) {
    c.stopPropagation(), c.key === "Escape" && (l(!1), t(!1));
  }
  return o.useEffect(() => {
    a && s.current.open == !1 ? (s.current.showModal(), window.addEventListener("keydown", E)) : !a && s.current.open == !0 && (s.current.close(), window.removeEventListener("keydown", E));
  }, [a, l]), {
    getTriggerProps: p,
    getDialogProps: y,
    getCloseProps: b,
    getConfirmProps: v,
    labelledBy: $,
    describedBy: m
  };
}
function T({ className: e, children: t, ...n }) {
  const r = i();
  return /* @__PURE__ */ o.createElement(
    "button",
    {
      className: `${e || ""} trigger`,
      ...r.getTriggerProps(n)
    },
    t
  );
}
function L({ className: e, children: t, ...n }) {
  const r = i();
  return /* @__PURE__ */ o.createElement(
    "dialog",
    {
      className: `${e || ""} dialog`,
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": r.labelledBy,
      "aria-describedby": r.describedBy,
      ...r.getDialogProps(n)
    },
    t
  );
}
function H({ className: e, children: t, ...n }) {
  const r = i();
  return /* @__PURE__ */ o.createElement("h2", { id: r.labelledBy, className: `${e || ""} heading`, ...n }, t);
}
function M({ className: e, children: t, ...n }) {
  const r = i();
  return /* @__PURE__ */ o.createElement(
    "h3",
    {
      id: r.describedBy,
      className: `${e || ""} description`,
      ...n
    },
    t
  );
}
const S = o.forwardRef(({ className: e, children: t, ...n }, r) => {
  const u = i();
  return /* @__PURE__ */ o.createElement(
    "button",
    {
      ref: r,
      className: `${e || ""} close`,
      type: "button",
      ...u.getCloseProps(n)
    },
    t
  );
}), I = o.forwardRef(
  ({ form: e, className: t, children: n, ...r }, u) => {
    const d = i();
    return /* @__PURE__ */ o.createElement(
      "button",
      {
        ref: u,
        form: e,
        className: `${t || ""} confirm`,
        type: "submit",
        ...d.getConfirmProps(r)
      },
      n
    );
  }
), G = {
  Provider: B,
  Content: L,
  Trigger: T,
  Heading: H,
  Description: M,
  Close: S,
  Confirm: I
}, U = ({ children: e, ...t }) => {
  const n = K(t);
  return /* @__PURE__ */ o.createElement(C.Provider, { value: n }, e);
};
function K({
  initialOpen: e = !1,
  open: t,
  onOpenChange: n,
  onClose: r = () => {
  }
}) {
  const [u, d] = o.useState(e), f = t ?? u, a = n ?? d, l = o.useRef(null), s = o.useRef(null);
  function $(p) {
    return {
      ...p,
      onClick(b) {
        b.preventDefault(), a(!0);
      }
    };
  }
  function m(p) {
    s.current.contains(p.target) && a(!1);
  }
  return o.useEffect(() => (f ? (s.current.removeAttribute("open"), s.current.showModal()) : (s.current.close(), r()), document.addEventListener("mousedown", m), () => document.removeEventListener("mousedown", m)), [f, a]), {
    open: f,
    setOpen: a,
    getTriggerProps: $,
    dialogRef: s,
    triggerRef: l
  };
}
function A({ className: e, children: t, ...n }) {
  const r = i();
  return /* @__PURE__ */ o.createElement("button", { className: e, ...r.getTriggerProps(n) }, t);
}
function j({ className: e, children: t, ...n }) {
  const r = i();
  return /* @__PURE__ */ o.createElement(
    "dialog",
    {
      ref: r.dialogRef,
      className: `${e || ""} dialog`,
      role: "dialog",
      "aria-modal": "true",
      ...n
    },
    t
  );
}
function q({ className: e, children: t, ...n }) {
  return /* @__PURE__ */ o.createElement("h2", { className: `${e || ""} heading`, ...n }, t);
}
function z({ className: e, children: t, ...n }) {
  return /* @__PURE__ */ o.createElement("h3", { className: `${e || ""} description`, ...n }, t);
}
const J = {
  Provider: U,
  Dialog: j,
  Trigger: A,
  Heading: q,
  Description: z
};
export {
  F as BasicDialog,
  G as InputDialog,
  J as alertDialog
};
