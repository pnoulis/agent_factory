import * as t from "react";
import v from "react-dom";
import { Svg as h } from "./svgs.js";
import d from "styled-components";
var u, m = v;
if (process.env.NODE_ENV === "production")
  u = m.createRoot, m.hydrateRoot;
else {
  var q = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  u = function(e, n) {
    q.usingClientEntryPoint = !0;
    try {
      return m.createRoot(e, n);
    } finally {
      q.usingClientEntryPoint = !1;
    }
  };
}
const x = (e) => /* @__PURE__ */ t.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", height: 48, width: 48, ...e }, /* @__PURE__ */ t.createElement("path", { d: "M22.7 33.9h2.9V22h-2.9ZM24 18.4q.65 0 1.125-.45t.475-1.1q0-.8-.45-1.225Q24.7 15.2 24 15.2q-.75 0-1.175.425-.425.425-.425 1.175 0 .7.45 1.15.45.45 1.15.45Zm0 25.4q-4.1 0-7.7-1.575-3.6-1.575-6.275-4.25Q7.35 35.3 5.775 31.7 4.2 28.1 4.2 24t1.575-7.725q1.575-3.625 4.275-6.3t6.275-4.225Q19.9 4.2 24 4.2t7.725 1.55q3.625 1.55 6.3 4.225t4.225 6.3Q43.8 19.9 43.8 24q0 4.15-1.55 7.7t-4.225 6.25q-2.675 2.7-6.3 4.275Q28.1 43.8 24 43.8Zm.05-2.9q6.95 0 11.9-4.95t4.95-12q0-6.95-4.925-11.9T24 7.1q-7 0-11.95 4.925Q7.1 16.95 7.1 24q0 7 4.95 11.95 4.95 4.95 12 4.95ZM24 24Z" })), R = (e) => /* @__PURE__ */ t.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", height: 48, width: 48, ...e }, /* @__PURE__ */ t.createElement("path", { d: "M24 33.85q.75 0 1.175-.425.425-.425.425-1.175t-.425-1.175Q24.75 30.65 24 30.65t-1.175.425q-.425.425-.425 1.175t.425 1.175q.425.425 1.175.425Zm-1.3-7.5h2.9v-12.6h-2.9ZM24 43.8q-4.1 0-7.7-1.575-3.6-1.575-6.275-4.25Q7.35 35.3 5.775 31.7 4.2 28.1 4.2 24t1.575-7.725q1.575-3.625 4.275-6.3t6.275-4.225Q19.9 4.2 24 4.2t7.725 1.55q3.625 1.55 6.3 4.225t4.225 6.3Q43.8 19.9 43.8 24q0 4.15-1.55 7.7t-4.225 6.25q-2.675 2.7-6.3 4.275Q28.1 43.8 24 43.8Zm.05-2.9q6.95 0 11.9-4.95t4.95-12q0-6.95-4.925-11.9T24 7.1q-7 0-11.95 4.925Q7.1 16.95 7.1 24q0 7 4.95 11.95 4.95 4.95 12 4.95ZM24 24Z" })), M = (e) => /* @__PURE__ */ t.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", height: 48, width: 48, ...e }, /* @__PURE__ */ t.createElement("path", { d: "M2.45 42.05 24 4.85l21.55 37.2Zm5.05-2.9h33L24 10.7Zm16.7-2.75q.65 0 1.1-.475.45-.475.45-1.125 0-.6-.475-1.075t-1.125-.475q-.65 0-1.1.475-.45.475-.45 1.125 0 .6.475 1.075t1.125.475Zm-1.5-5.45h2.95v-11H22.7ZM24 24.9Z" })), S = (e) => /* @__PURE__ */ t.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", height: 48, width: 48, ...e }, /* @__PURE__ */ t.createElement("path", { d: "M24 43.8q-4.15 0-7.775-1.525t-6.3-4.2q-2.675-2.675-4.2-6.3Q4.2 28.15 4.2 24t1.525-7.775q1.525-3.625 4.2-6.3 2.675-2.675 6.3-4.2Q19.85 4.2 24 4.2q3.6 0 6.75 1.125T36.5 8.5l-2.05 2.1q-2.2-1.65-4.825-2.575Q27 7.1 24 7.1q-7.15 0-12.025 4.875T7.1 24q0 7.15 4.875 12.025T24 40.9q7.15 0 12.025-4.875T40.9 24q0-1.45-.225-2.775T40 18.6l2.3-2.3q.7 1.8 1.1 3.725.4 1.925.4 3.975 0 4.15-1.525 7.775t-4.2 6.3q-2.675 2.675-6.3 4.2Q28.15 43.8 24 43.8Zm-2.95-10.85-8.1-8.15 2.15-2.2 5.95 6L41.65 8l2.2 2.15Z" })), f = d.div`
  pointer-events: none;
  padding: 10px 20px;
  min-width: 400px;
  max-width: 600px;
  width: max-content;
  margin: auto;
  border-radius: 6px;
  font-size: 1.2rem;
  letter-spacing: 1px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: white;
  gap: 20px;
  box-shadow: 5px -5px 50px rgba(17, 17, 26, 0.1),
    -5px 5px 50px rgba(17, 17, 26, 0.1);

  background-color: ${({ variant: e }) => {
  switch (e) {
    case "info":
      return "green";
    case "success":
      return "blue";
    case "warning":
      return "orange";
    case "error":
      return "red";
    default:
      return "black";
  }
}};
`, g = d.section`
  flex: 0 0 50px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`, p = d.section`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`, F = d.div`
  pointer-events: none;
  position: fixed;
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;
  gap: 20px;
  width: 100%;
  bottom: 0;
  margin-bottom: 30px;
  justify-items: end;
  padding-right: 70px;
`;
function b({ message: e }) {
  return /* @__PURE__ */ t.createElement(f, { variant: "info" }, /* @__PURE__ */ t.createElement(g, null, /* @__PURE__ */ t.createElement(h, { color: "white" }, /* @__PURE__ */ t.createElement(x, null))), /* @__PURE__ */ t.createElement(p, null, e));
}
function Z({ message: e }) {
  return /* @__PURE__ */ t.createElement(f, { variant: "warning" }, /* @__PURE__ */ t.createElement(g, null, /* @__PURE__ */ t.createElement(h, { color: "white" }, /* @__PURE__ */ t.createElement(M, null))), /* @__PURE__ */ t.createElement(p, null, e));
}
function Q({ message: e }) {
  return /* @__PURE__ */ t.createElement(f, { variant: "error" }, /* @__PURE__ */ t.createElement(g, null, /* @__PURE__ */ t.createElement(h, { color: "white" }, /* @__PURE__ */ t.createElement(R, null))), /* @__PURE__ */ t.createElement(p, null, e));
}
function I({ message: e }) {
  return /* @__PURE__ */ t.createElement(f, { variant: "success" }, /* @__PURE__ */ t.createElement(g, null, /* @__PURE__ */ t.createElement(h, { color: "white" }, /* @__PURE__ */ t.createElement(S, null))), /* @__PURE__ */ t.createElement(p, null, e));
}
const _ = t.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t.createElement(
  F,
  {
    ref: r,
    className: `${e || ""} flash-messages`,
    ...n
  }
));
function T({ FlashMessages: e, rootRef: n, children: r }) {
  const [o, l] = t.useState([]), c = t.useRef([]);
  return t.useEffect(() => {
    e.mountPoint = n.current, e.setFm = (i) => l((s) => [...s, i]);
  }, []), t.useEffect(() => {
    for (let s = 0; s < n.current.children.length; s++)
      c.current[s] = n.current.children[s];
    let i = null;
    return o.length > 0 ? i = window.setInterval(() => {
      const s = Date.now();
      l(
        o.reduce((E, w, y) => (s > w.timeout ? c.current[y].remove() : E.push(w), E), [])
      );
    }, 1e3) : i && window.clearInterval(i), () => i && window.clearInterval(i);
  }, [o, l]), /* @__PURE__ */ t.createElement(t.Fragment, null, r);
}
function a({
  id: e = Math.random().toString(36).substring(2, 10),
  Info: n,
  Warn: r,
  Error: o,
  Success: l,
  FmRoot: c
} = {}) {
  this.id = e, this.Info = n || b, this.Warn = r || Z, this.Error = o || Q, this.Success = l || I, this.FmRoot = c || _, this.mount();
}
a.prototype.mount = function() {
  if (this.mountPoint = document.getElementById("flash-messages-react-root"), this.mountPoint == null) {
    this.mountPoint = document.createElement("div"), this.mountPoint.setAttribute("id", "flash-messages-react-root");
    const r = document.getElementsByTagName("body")[0];
    if (r == null)
      throw new Error("Missing <body></body> element");
    r.appendChild(this.mountPoint);
  }
  const n = t.createRef(null);
  u(this.mountPoint).render(
    /* @__PURE__ */ t.createElement(t.StrictMode, null, /* @__PURE__ */ t.createElement(T, { FlashMessages: this, rootRef: n }, /* @__PURE__ */ t.createElement(this.FmRoot, { ref: n, id: this.id })))
  );
};
a.prototype.render = function(n, r) {
  this.mountPoint.appendChild(n), u(n).render(r), this.setFm({ timeout: n.getAttribute("data-timeout") });
};
a.prototype.createRoot = function({
  timeout: n = 7e3
} = {}) {
  n = Date.now() + n;
  const r = document.createElement("article");
  return r.setAttribute("class", "flash-message"), r.setAttribute("data-timeout", n), r;
};
a.prototype.info = function(n, r) {
  const o = this.createRoot(r);
  this.render(o, /* @__PURE__ */ t.createElement(this.Info, { ...n }));
};
a.prototype.warn = function(n, r) {
  const o = this.createRoot(r);
  this.render(o, /* @__PURE__ */ t.createElement(this.Warn, { ...n }));
};
a.prototype.error = function(n, r) {
  const o = this.createRoot(r);
  this.render(o, /* @__PURE__ */ t.createElement(this.Error, { ...n }));
};
a.prototype.success = function(n, r) {
  const o = this.createRoot(r);
  this.render(o, /* @__PURE__ */ t.createElement(this.Success, { ...n }));
};
a.prototype.custom = function(n, r) {
  if (!t.isValidElement(n))
    throw new Error("Custom Flash Message is not a valid React Element");
  const o = this.createRoot(r);
  this.render(o, n);
};
export {
  a as FlashMessages
};
