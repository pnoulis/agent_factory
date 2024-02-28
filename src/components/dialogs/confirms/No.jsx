import { BasicDialog } from "react_utils/dialogs";

function No({ className, style, children, ...props }) {
  return (
    <BasicDialog.Close className={className} style={style} {...props}>
      {children}
    </BasicDialog.Close>
  );
}

export { No };
