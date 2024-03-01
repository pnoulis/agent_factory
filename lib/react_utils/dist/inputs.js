import * as o from "react";
import f from "styled-components";
function S(e = {}) {
  const [t, n] = o.useReducer(y, {
    ...h,
    ...e
  });
  return [t, (s, ...l) => {
    if (s === "reset")
      n({
        type: "RESET",
        initialState: {
          ...h,
          ...e
        }
      });
    else if (Object.hasOwn(g, s))
      n(g[s](...l));
    else
      throw new Error(`Undefined action:${s} in formReducer`);
  }];
}
function y(e, t) {
  switch (t.type) {
    case "ERRORS":
      return { ...e, errors: t.errors };
    case "INPUT":
      return {
        ...e,
        errors: {
          ...e.errors,
          [t.name]: t.value.length < 1 ? "" : e.errors[t.name]
        },
        fields: {
          ...e.fields,
          [t.name]: t.value
        }
      };
    case "RESET":
      return t.initialState;
    case "SUBMIT":
      return {
        ...e,
        submitting: t.submitting
      };
    default:
      return e;
  }
}
const g = {
  setErrors: (e) => ({ type: "ERRORS", errors: e }),
  setInput: (e, t) => ({ type: "INPUT", name: e, value: t }),
  setSubmit: (e) => ({ type: "SUBMIT", submitting: e })
}, v = o.createContext({}), m = () => {
  const e = o.useContext(v);
  if (e == null)
    throw new Error("<FormProvider/> missing");
  return e;
}, k = ({ value: e, children: t }) => /* @__PURE__ */ o.createElement(v.Provider, { value: e }, t), h = {
  fields: {},
  errors: {},
  submitting: !1
}, w = f.div`
  // defaults
  all: unset;
  display: block;
  box-sizing: border-box;

  // content
  // dimensions
  width: 100%;
  min-height: 60px;
  height: max-content;
  // appearance
  // dynamic
  pointer-events: none;
  // position
  position: relative;
  text-align: center;

  .input {
    pointer-events: auto;
    width: 100%;
    // height: 100%;
    height: 55px;
    padding: 0 6px;
    border-radius: var(--br-sm);
    border: 1px solid var(--black-base);
    font-size: var(--tx-nl);
    text-align: center;
    letter-spacing: 1.5px;
    outline: none;
    color: black;
  }

  .label {
    padding: 0 5px;
    border-radius: var(--br-sm);
    letter-spacing: 1.5px;
    font-size: var(--tx-md);
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(20px, -50%);
    transition-property: top, font-size;
    transition-duration: 0.3s;
    color: var(--black-subtle);
    pointer-events: none;
    text-transform: uppercase;
  }

  .optional {
    position: absolute;
    font-size: var(--tx-md);
    border-radius: var(--br-sm);
    pointer-events: none;
    letter-spacing: 1.5px;
    top: 50%;
    right: 10px;
    padding: 0 5px;
    transform: translate(0, -50%);
    color: var(--info-base);
  }

  &:not(:focus-within) .input::placeholder {
    opacity: 0;
  }

  &:focus-within .input::placeholder {
    opacity: 0.3;
  }

  .input:focus ~ label,
  input:not(:placeholder-shown) ~ label {
    top: 0px;
    transition-property: top;
    transition-duration: 0.3s;
    font-size: 0.8em;
    background-color: white;
  }

  .input:focus ~ .optional,
  input:not(:placeholder-shown) ~ .optional {
    top: 0px;
    transition-property: top;
    transition-duration: 0.3s;
    font-size: 0.8em;
    background-color: white;
  }

  .input:disabled ~ .label {
    color: black;
  }

  &.error .input {
    border: 2px solid var(--error-base);
    text-transform: lowercase;
  }

  &.error .label,
  &.error .optional {
    color: var(--error-base);
  }

  &.success .input {
    border: 2px solid var(--success-base);
  }

  &.success .label {
    color: var(--success-strong);
  }
`, E = f.p`
  position: absolute;
  display: block;
  width: 100%;
  padding-top: 5px;
  padding-left: 5px;
  font-size: var(--tx-nl);
  color: var(--error-base);
  text-transform: capitalize;
  letter-spacing: 1px;
`, z = o.forwardRef(function({ className: t, type: n, name: r, label: s, optional: l, placeholder: p, ...u } = {}, c) {
  const { fields: d, errors: i, submitting: b, setForm: x } = m();
  return /* @__PURE__ */ o.createElement(
    w,
    {
      className: `${t || ""} ${i[r] && "error"}`
    },
    /* @__PURE__ */ o.createElement(
      "input",
      {
        ref: c,
        className: "input",
        type: n || "text",
        id: r,
        autoComplete: "off",
        placeholder: p || " ",
        onChange: (a) => !b && x("setInput", r, a.target.value),
        value: d[r],
        ...u
      }
    ),
    /* @__PURE__ */ o.createElement("label", { className: "label", htmlFor: r }, s || r),
    i[r] ? null : /* @__PURE__ */ o.createElement("span", { className: "optional" }, l && "optional"),
    /* @__PURE__ */ o.createElement(E, null, i[r])
  );
});
function I({
  className: e,
  disabled: t,
  type: n,
  name: r,
  label: s,
  optional: l,
  placeholder: p,
  onChange: u = () => {
  },
  ...c
}) {
  const { fields: d, errors: i, submitting: b, setForm: x } = m();
  return /* @__PURE__ */ o.createElement("div", { className: e, error: i[r], ...c }, /* @__PURE__ */ o.createElement(
    "input",
    {
      id: r,
      className: "input",
      type: n || "text",
      autoComplete: "off",
      placeholder: p || " ",
      disabled: t,
      onChange: (a) => {
        b || (x("setInput", r, a.target.value), u(a.target.value));
      },
      value: d[r] || ""
    }
  ));
}
const F = f(I)`
  all: unset;
  display: block;
  box-sizing: border-box;
  width: 100%;
  min-height: 60px;
  height: max-content;
  pointer-events: none;
  position: relative;
  text-align: center;

  .input {
    pointer-events: auto;
    width: 100%;
    height: 55px;
    padding: 0 6px;
    border-radius: var(--br-sm);
    border: 1px solid var(--black-base);
    font-size: var(--tx-nl);
    text-align: center;
    letter-spacing: 1.5px;
    outline: none;
    color: black;
  }
`;
function C({
  className: e,
  disabled: t,
  name: n,
  placeholder: r,
  rows: s,
  cols: l,
  onChange: p,
  ...u
}) {
  const { fields: c, errors: d, submitting: i, setForm: b, formId: x } = m();
  return /* @__PURE__ */ o.createElement(
    "textarea",
    {
      error: d[n],
      id: n,
      form: x,
      className: e || "",
      autoComplete: "off",
      rows: s ?? 5,
      cols: l ?? 5,
      autoFocus: !0,
      placeholder: r || " ",
      value: c[n] || "",
      disabled: t,
      onChange: (a) => {
        i || (b("setInput", n, a.target.value), p && p(a.target.value));
      },
      ...u
    }
  );
}
export {
  k as FormProvider,
  I as SimpleInput,
  F as StyledSimpleInput,
  C as TextArea,
  z as TextInput_0,
  S as useForm,
  m as useFormContext
};
