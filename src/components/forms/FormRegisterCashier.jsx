import styled from "styled-components";
import { Submit } from "./Submit.jsx";
import { TextInput_0, useForm } from "react_utils/inputs";
import { Form } from "./Form.jsx";
import { ComboboxCashierPrivilege } from "../comboboxes/ComboboxCashierPrivilege.jsx";

function FormRegisterCashier({ onSubmit, style }) {
  const [form, setForm] = useForm({
    submitting: false,
    fields: {
      username: "",
      email: "",
      password: "",
      role: "",
    },
  });

  return (
    <Form
      style={{ rowGap: "20px", ...style }}
      id="registerCashier"
      ctx={[form, setForm]}
      onSubmit={onSubmit}
    >
      <TextInput autoFocus name="username" />
      <TextInput name="email" type="email" />
      <TextInput name="password" type="password" autoComplete="new-password" />
      <ComboboxCashierPrivilege
        onSelect={(v) => {
          setForm("setInput", "role", v);
        }}
      />
      <Submit>register cashier</Submit>
    </Form>
  );
}

const TextInput = styled(TextInput_0)`
  text-transform: uppercase !important;
  & > * {
    font-size: var(--tx-sm) !important;
  }

  & .label {
    left: 50%;
    transform: translate(-50%, -50%);
  }
  & input {
    background-color: var(--grey-light);
    border-color: white !important;
    border-radius: var(--br-nl);
  }

  .input:focus ~ label,
  input:not(:placeholder-shown) ~ label {
    background-color: var(--grey-light);
    left: 0;
    transform: translate(1px, -50%);
  }

  .input:focus ~ .optional,
  input:not(:placeholder-shown) ~ .optional {
    right: 1px;
    background-color: var(--grey-light);
  }

  &.error .input {
    text-transform: uppercase !important;
  }

  &.error .label {
    background-color: var(--grey-light);
    left: 0;
    top: 0;
    transform: translate(1px, -50%);
  }

  &.error p {
    position: initial;
    background-color: white;
    border-radius: var(--br-nl);
    margin-top: 5px;
    padding-bottom: 5px;
  }
`;

export { FormRegisterCashier };
