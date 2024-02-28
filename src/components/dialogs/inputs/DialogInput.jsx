import { InputDialog } from "react_utils/dialogs";

function DialogInput({
  className,
  style,
  initialOpen,
  open,
  onOpenChange,
  id,
  onClose,
  children,
}) {
  return (
    <InputDialog.Provider
      id={id}
      initialOpen={initialOpen}
      onClose={onClose}
      open={open}
      onOpenChange={onOpenChange}
    >
      <InputDialog.Content
        style={{
          outline: "none",
          border: "none",
          padding: 0,
          backgroundColor: "white",
          borderRadius: "var(--br-md)",
        }}
      >
        <article className={className} style={style}>
          {children}
        </article>
      </InputDialog.Content>
    </InputDialog.Provider>
  );
}

export { DialogInput };
