import * as e from "react";
import u from "styled-components";
const l = e.forwardRef(
  ({ className: t, size: o = "100%", color: c = "black", children: r, ...n }, s) => {
    const { current: d } = e.useRef(
      e.Children.count(r) >= 1 && r.type && r.type().props.children
    );
    let a;
    const h = (p) => {
      s && s(p), a = p;
      const i = a?.getBBox();
      a?.setAttribute(
        "viewBox",
        [
          Math.round(i.x),
          Math.round(i.y),
          Math.round(i.width),
          Math.round(i.height)
        ].join(" ")
      );
    };
    return /* @__PURE__ */ e.createElement(
      "svg",
      {
        className: t,
        ref: h,
        width: o,
        height: o,
        fill: c,
        ...n
      },
      d
    );
  }
), g = u.span`
  display: flex;
  box-sizing: content-box;
  justify-content: center;
  align-items: center;
  width: ${({ size: t }) => t || "30px"};
  height: ${({ size: t }) => t || "30px"};
  padding: 6px;
  border-radius: 50%;
`;
function f({ className: t, size: o, svgSize: c, children: r, ...n }) {
  return /* @__PURE__ */ e.createElement(g, { className: t, size: o, ...n }, /* @__PURE__ */ e.createElement(l, { size: c || "80%", color: n.color }, r));
}
const x = u(f)`
  cursor: pointer;
  &:hover {
    // background-color: var(--primary-medium);
    opacity: 0.8;
  }
`;
export {
  l as Svg,
  f as SvgBall,
  x as SvgButton
};
