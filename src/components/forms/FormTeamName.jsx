import * as React from "react";
import { Submit } from "./Submit.jsx";
import { LabelessTextInput } from "./LabelessTextInput.jsx";
import { Form } from "./Form.jsx";
import { generateRandomName } from "js_utils";

function FormTeamName({ onSubmit, onChange }) {
  const [randomTeamName, setRandom] = React.useState(() =>
    generateRandomName(),
  );

  return (
    <Form
      id="teamName"
      fields={{ randomTeamName, teamName: "" }}
      onSubmit={onSubmit}
      onChange={onChange}
    >
      <LabelessTextInput name="teamName" placeholder={randomTeamName} />
    </Form>
  );
}

export { FormTeamName };
