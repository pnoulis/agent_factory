import { alertDialog } from "react_utils/dialogs";

function Heading({ className, style, children }) {
  return (
    <alertDialog.Heading className={className} style={style}>
      {children}
    </alertDialog.Heading>
  );
}

export { Heading };
