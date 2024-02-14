import { createContext, useContext } from "react";

const Context = createContext(null);
function ContextPanel({ ctx, children }) {
  return <Context.Provider value={ctx}>{children}</Context.Provider>;
}
function useContextPanel() {
  const ctx = useContext(Context);
  if (ctx == null) {
    throw new Error("<ContextPanel/> missing");
  }
  return ctx;
}
export { ContextPanel, useContextPanel };
