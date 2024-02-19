import { Button } from "#components/buttons/Button.jsx";
import { ButtonStandard } from "#components/buttons/ButtonStandard.jsx";
import { useFormContext } from "react_utils/inputs";
import styled from "styled-components";

function Submit({ className, style, children }) {
  const { id, submitting } = useFormContext();
  return (
    <StyledButton
      className={className}
      style={style}
      type="submit"
      form={id}
      disabled={submitting}
    >
      {children}
    </StyledButton>
  );
}

const StyledButton = styled(Button)`
  ${ButtonStandard}
`;

export { Submit };
