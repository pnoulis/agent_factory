import { Form } from "./Form.jsx";
import { Submit } from "./Submit.jsx";
import { TextArea } from "react_utils/inputs";
import { TextInput_0 } from "react_utils/inputs";
import styled from "styled-components";

function FormCashout({
  cashier,
  comment,
  onSubmit,
  onChange,
  style,
  className,
}) {
  return (
    <Form
      className={className}
      style={style}
      id="form-cashout"
      fields={{ cashier: cashier || "", comment: comment || "" }}
      onSubmit={onSubmit}
      onChange={onChange}
    >
      <div className="comment-wrapper">
        <Label className="label">Comments</Label>
        <TextArea autoFocus placeholder="..." name="comment" />
      </div>
      <TextInput readOnly name="cashier" />
      <Submit>cashout</Submit>
    </Form>
  );
}

const Label = styled("label")`
  color: var(--primary-base);
  font-size: var(--tx-xxh);
  letter-spacing: 1.5px;
  text-transform: capitalize;
  letter-spacing: 2px;
`;

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

export { FormCashout };
