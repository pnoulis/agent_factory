import { alertDialog } from "react_utils/dialogs";

function Description({ className, style, children }) {
  return (
    <alertDialog.Description className={className} style={style}>
      {children}
    </alertDialog.Description>
  );
}

export { Description };
