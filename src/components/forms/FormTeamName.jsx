import * as React from "react";
import { Submit } from "./Submit.jsx";
import { LabelessTextInput } from "./LabelessTextInput.jsx";
import { Form } from "./Form.jsx";

function FormTeamName({
  className,
  style,
  onSubmit,
  submitting,
  onChange,
  randomTeamName,
  teamName,
}) {
  return (
    <Form
      id="form-teamName"
      className={className}
      style={style}
      submitting={submitting}
      fields={{ randomTeamName, teamName: teamName || "" }}
      onSubmit={onSubmit}
      onChange={onChange}
    >
      <LabelessTextInput name="teamName" placeholder={randomTeamName} />
    </Form>
  );
}

export { FormTeamName };
