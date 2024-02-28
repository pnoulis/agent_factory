import { InputDialog } from "react_utils/dialogs";

function Description({ className, style, children }) {
  return (
    <InputDialog.Description className={className} style={style}>
      {children}
    </InputDialog.Description>
  );
}

export { Description };
