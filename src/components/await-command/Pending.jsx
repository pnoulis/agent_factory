import { Spinner } from "#components/misc/Spinner.jsx";
import styled from "styled-components";

function Pending({ className, style }) {
  return (
    <StyledSpinner
      className={className}
      style={style}
      color="var(--info-strong)"
      size="75px"
    />
  );
}

const StyledSpinner = styled(Spinner)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: var(--grey-light);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export { Pending };
