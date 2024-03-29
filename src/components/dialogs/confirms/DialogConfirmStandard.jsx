import styled from "styled-components";
import { DialogConfirm } from "./DialogConfirm.jsx";
import { ButtonDialog } from "../../buttons/ButtonDialog.jsx";
import { Heading } from "./Heading.jsx";
import { Description } from "./Description.jsx";
import { Yes } from "./Yes.jsx";
import { No } from "./No.jsx";

function DialogConfirmStandard({
  id,
  initialOpen,
  onClose,
  heading,
  msg,
  yes = "yes",
  no = "no",
  style,
  className,
  children,
}) {
  return (
    <StyledDialogConfirm
      style={style}
      className={className}
      id={id}
      initialOpen={initialOpen}
      onClose={onClose}
    >
      <Heading>{t(heading)}</Heading>
      <Description>{children || t(msg)}</Description>
      <No>{t(no)}</No>
      <Yes autoFocus>{t(yes)}</Yes>
    </StyledDialogConfirm>
  );
}

const StyledDialogConfirm = styled(DialogConfirm)`
  min-width: 450px;
  max-width: 550px;
  min-height: 150px;
  font-family: Saira;
  box-sizing: border-box;
  z-index: 4;
  gap: 15px 20px;
  padding: 20px 35px;
  border: none;
  box-shadow: var(--sd-9);
  text-align: center;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto minmax(60px, auto);
  justify-items: center;

  .heading {
    grid-column: 1 / -1;
    text-transform: uppercase;
    color: var(--primary-base);
    letter-spacing: 1px;
    font-weight: 550;
  }

  .description {
    grid-column: 1 / -1;
    font-size: var(--tx-lg);
  }

  .confirm {
    ${ButtonDialog}
    align-self: end;
    justify-self: start;
  }

  .close {
    ${ButtonDialog}
    align-self: end;
    justify-self: end;
  }
`;

export { DialogConfirmStandard };
