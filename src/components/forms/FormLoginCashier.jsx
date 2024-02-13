import { Submit } from "./Submit.jsx";
import { TextInput } from "./TextInput.jsx";
import { Form } from "./Form.jsx";

function FormLoginCashier({ onSubmit }) {
  return (
    <Form
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
