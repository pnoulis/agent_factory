import { InputDialog } from "react_utils/dialogs";

function Heading({ className, style, children }) {
  return (
    <InputDialog.Heading className={className} style={style}>
      {children}
    </InputDialog.Heading>
  );
}

export { Heading };
