import * as React from "react";
import { InputDialog } from "react_utils/dialogs";

const Submit = React.forwardRef((props, ref) => (
  <>
    <InputDialog.Confirm
      ref={ref}
      className={props.className}
      style={props.style}
      form={props.form}
      {...props}
    >
      {props.children}
    </InputDialog.Confirm>
  </>
));

export { Submit };
