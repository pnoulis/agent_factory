import styled from "styled-components";
import { DialogAlert } from "./DialogAlert.jsx";
import { Heading } from "./Heading.jsx";
import { Description } from "./Description.jsx";

function DialogAlertStandard({ id, initialOpen, onClose, heading, msg }) {
  return (
    <StyledDialogAlert id={id} initialOpen={initialOpen} onClose={onClose}>
      <Heading>{heading}</Heading>
      <Description>{msg}</Description>
    </StyledDialogAlert>
  );
}
const StyledDialogAlert = styled(DialogAlert)`
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
  cursor: pointer;

  display: grid;

  .heading {
    text-transform: uppercase;
    color: var(--primary-base);
    letter-spacing: 1px;
    font-weight: 550;
  }
`;

export { DialogAlertStandard };
