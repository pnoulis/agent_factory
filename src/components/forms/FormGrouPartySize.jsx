import { TextInput_0 } from "react_utils/inputs";
import { Form } from "./Form.jsx";
import { MAX_ROSTER_SIZE } from "../../constants.js";
import styled from "styled-components";

function FormGrouPartySize({
  className,
  submitting,
  style,
  onSubmit,
  onChange,
}) {
  return (
    <Form
      id="form-grouPartySize"
      className={className}
      onSubmit={(form) =>
        onSubmit?.({
          ...form,
          fields: {
            partysize: form.fields.partysize || MAX_ROSTER_SIZE,
            distribution: form.fields.distribution || 3,
          },
        })
      }
      onChange={onChange}
      submitting={submitting}
      fields={{ partysize: "", distribution: "" }}
    >
      <TextInput
        autoFocus
        name="partysize"
        label="size"
        placeholder={MAX_ROSTER_SIZE}
      />
      <TextInput name="distribution" placeholder={3} />
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

export { FormGrouPartySize };
