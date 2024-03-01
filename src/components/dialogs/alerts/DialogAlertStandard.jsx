import * as React from "react";
import styled from "styled-components";
import { DialogAlert } from "./DialogAlert.jsx";
import { Heading } from "./Heading.jsx";
import { Description } from "./Description.jsx";

function DialogAlertStandard({
  id,
  initialOpen,
  onClose,
  heading,
  msg,
  children,
  className,
  style,
}) {
  return (
    <StyledDialogAlert
      className={className}
      style={style}
      id={id}
      initialOpen={initialOpen}
      onClose={onClose}
    >
      {children || (
        <>
          <Heading>{t(heading)}</Heading>
          <Description>{t(msg)}</Description>
        </>
      )}
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
  padding: 15px 25px;
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

  .description {
    font-size: var(--tx-lg);
  }
`;

export { DialogAlertStandard };
