import { createContext, useContext } from "react";

const Context = createContext(null);
function ContextTable({ ctx, children }) {
  return <Context.Provider value={ctx}>{children}</Context.Provider>;
}
function useContextTable() {
  const ctx = useContext(Context);
  if (ctx == null) {
    throw new Error("<ContextTable/> missing");
  }
  return ctx;
}
export { ContextTable, useContextTable };
