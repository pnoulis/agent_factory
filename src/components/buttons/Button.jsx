// ------------------------------ std libs ------------------------------- //
// ------------------------------ 3rd libs ------------------------------- //
import * as React from "react";
import styled from "styled-components";
// ------------------------------ own libs ------------------------------- //
// ------------------------------ project  ------------------------------- //

function Button({ type, disabled, form, children, className, ...props }) {
  return (
    <StyleButton
      className={className}
      type={type}
      disabled={disabled}
      form={form}
      {...props}
    >
      {children}
    </StyleButton>
  );
}

const StyleButton = styled("button")``;
export { Button };
