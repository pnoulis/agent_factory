import { Submit } from "./Submit.jsx";
import { TextInput } from "./TextInput.jsx";
import { Form } from "./Form.jsx";

function FormLoginCashier({ onSubmit, style, className }) {
  return (
    <Form
      style={style}
      className={className}
      id="loginCashier"
      fields={{ username: "", password: "" }}
      onSubmit={onSubmit}
    >
      <TextInput autoFocus name="username" />
      <TextInput name="password" type="password" autoComplete="new-password" />
      <Submit>login</Submit>
    </Form>
  );
}

export { FormLoginCashier };
