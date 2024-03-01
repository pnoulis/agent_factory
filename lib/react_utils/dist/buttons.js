import * as o from "react";
import r from "styled-components";
import { Svg as c } from "./svgs.js";
const i = r("button")`
  // defaults
  all: unset;
  display: flex;
  box-sizing: border-box;

  // content
  flex-flow: column nowrap;
  font-family: NoirPro-Regular;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.4em;
  text-transform: uppercase;
  font-size: var(--tx-sm);
  text-align: center;
  background-color: var(--primary-base);
  padding: 8px;
  min-width: 60px;
  min-height: 60px;
  width: ${({ size: t }) => t || "60px"};
  height: ${({ size: t }) => t || "60px"};
  border-radius: var(--br-md);

  // appearance
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }

  &:disabled {
    opacity: 0.6;
  }
`, a = r(c)`
  display: block;
  fill: white;
`, l = r.p`
  color: white;
`;
function s({ className: t, children: e, ...n }) {
  return /* @__PURE__ */ o.createElement(i, { className: t, ...n }, e);
}
function m({ className: t, children: e, ...n }) {
  return /* @__PURE__ */ o.createElement(a, { className: t, ...n }, e);
}
function f({ className: t, children: e, ...n }) {
  return /* @__PURE__ */ o.createElement(l, { className: t, ...n }, e);
}
export {
  s as IconButton,
  m as IconButtonIcon,
  f as IconButtonText
};
