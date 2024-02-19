import styled from "styled-components";
import { DialogInput } from "./DialogInput.jsx";
import { Heading } from "./Heading.jsx";
import { Description } from "./Description.jsx";
import { Submit } from "./Submit.jsx";
import { Cancel } from "./Cancel.jsx";
import { ButtonDialog } from "#components/buttons/ButtonDialog.jsx";
import { isFunction } from "js_utils/misc";

function DialogInputStandard({
  id,
  form,
  initialOpen,
  onClose,
  heading,
  cancel = "cancel",
  submit = "submit",
  children,
}) {
  const [open, setOpen] = React.useState(initialOpen);

  const closeDialog = () => {
    setOpen(false);
    onClose?.();
  };

  return (
    <StyledDialogInput
      id={id}
      onClose={onClose}
      open={open}
      onOpenChange={setOpen}
    >
      <Heading>{heading}</Heading>
      <Description>
        {isFunction(children) ? children(closeDialog) : null}
      </Description>
      <Cancel autoFocus>{cancel}</Cancel>
      <Submit form={form}>{submit}</Submit>
    </StyledDialogInput>
  );
}

const StyledDialogInput = styled(DialogInput)`
  min-width: 450px;
  max-width: 550px;
  min-height: 150px;
  font-family: Saira;
  box-sizing: border-box;
  z-index: 4;
  gap: 15px 20px;
  padding: 15px 15px;
  border: none;
  box-shadow: var(--sd-9);
  text-align: center;

  display: grid;
  grid-template-columns: 1fr auto;
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
    justify-self: end;
  }

  .close {
    ${ButtonDialog}
    justify-self: end;
    align-self: end;
  }
`;

export { DialogInputStandard };
