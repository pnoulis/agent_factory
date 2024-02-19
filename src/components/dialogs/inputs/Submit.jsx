import { InputDialog } from "react_utils/dialogs";

function Submit({ className, style, form, children, props }) {
  return (
    <InputDialog.Confirm
      className={className}
      style={style}
      form={form}
      {...props}
    >
      {children}
    </InputDialog.Confirm>
  );
}

export { Submit };
