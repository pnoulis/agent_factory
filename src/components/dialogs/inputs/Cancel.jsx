import { InputDialog } from "react_utils/dialogs";

function Cancel({ className, style, children, props }) {
  return (
    <InputDialog.Close
      autoFocus={false}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </InputDialog.Close>
  );
}

export { Cancel };
