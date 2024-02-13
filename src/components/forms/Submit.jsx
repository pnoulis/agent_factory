import { Button } from "#components/buttons/Button.jsx";
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
  font-size: var(--tx-lg);
  text-transform: uppercase;
  background-color: var(--primary-base);
  height: 60px;
  border-radius: var(--br-nl);
  width: 100%;
  cursor: pointer;
  letter-spacing: 1px;
  text-align: center;
  color: white;
  font-weight: 500;
  &:hover {
    opacity: 0.9;
  }
`;

export { Submit };
