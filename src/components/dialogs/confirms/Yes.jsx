import { BasicDialog } from "react_utils/dialogs";

function Yes({ className, style, children, ...props }) {
  return (
    <BasicDialog.Confirm className={className} style={style} {...props}>
      {children}
    </BasicDialog.Confirm>
  );
}

export { Yes };
