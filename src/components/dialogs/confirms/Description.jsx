import { BasicDialog } from "react_utils/dialogs";

function Description({ className, style, children }) {
  return (
    <BasicDialog.Description className={className} style={style}>
      {children}
    </BasicDialog.Description>
  );
}

export { Description };
