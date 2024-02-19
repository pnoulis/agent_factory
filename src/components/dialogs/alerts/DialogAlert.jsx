import { alertDialog } from "react_utils/dialogs";

function DialogAlert({ className, style, initialOpen, id, onClose, children }) {
  return (
    <alertDialog.Provider id={id} initialOpen={initialOpen} onClose={onClose}>
      <alertDialog.Dialog
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
      </alertDialog.Dialog>
    </alertDialog.Provider>
  );
}

export { DialogAlert };
