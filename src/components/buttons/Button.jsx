import * as React from "react";
import styled from "styled-components";

function Button({ type, disabled, form, children, className, ...props }) {
  return (
    <button
      className={className}
      type={type}
      disabled={disabled}
      form={form}
      {...props}
    >
      {children}
    </button>
  );
}

export { Button };
