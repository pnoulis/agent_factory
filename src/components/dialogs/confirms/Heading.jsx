import { BasicDialog } from "react_utils/dialogs";

function Heading({ className, style, children }) {
  return (
    <BasicDialog.Heading className={className} style={style}>
      {children}
    </BasicDialog.Heading>
  );
}

export { Heading };
