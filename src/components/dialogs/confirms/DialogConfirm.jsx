import { BasicDialog } from "react_utils/dialogs";

function DialogConfirm({
  className,
  style,
  initialOpen,
  id,
  onClose,
  children,
}) {
  return (
    <BasicDialog.Provider id={id} initialOpen={initialOpen} onClose={onClose}>
      <BasicDialog.Content
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
      </BasicDialog.Content>
    </BasicDialog.Provider>
  );
}

export { DialogConfirm };
