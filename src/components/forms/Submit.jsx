import { Button } from "../buttons/Button.jsx";
import { ButtonStandard } from "../buttons/ButtonStandard.jsx";
import { useFormContext } from "react_utils/inputs";
import styled from "styled-components";
import { mergec } from "/src/misc/misc.js";

function Submit({ className, style, children }) {
  const { id, submitting } = useFormContext();
  return (
    <StyledButton
      className={mergec("submit", className)}
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
