import { LabelessTextInput } from "./LabelessTextInput.jsx";
import { Form } from "./Form.jsx";

function FormGrouPartyDistribution({
  className,
  submitting,
  style,
  onSubmit,
  onChange,
  placeholder,
}) {
  return (
    <Form
      id="form-grouPartyDistribution"
      className={className}
      onSubmit={onSubmit}
      onChange={onChange}
      submitting={submitting}
      fields={{ distribution: "", placeholder }}
    >
      <LabelessTextInput
        autoFocus
        name="distribution"
        placeholder={placeholder}
      />
    </Form>
  );
}

export { FormGrouPartyDistribution };
