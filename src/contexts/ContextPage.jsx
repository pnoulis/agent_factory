import { createContext, useContext } from "react";

const Context = createContext(null);
function ContextPage({ ctx, children }) {
  return <Context.Provider value={ctx}>{children}</Context.Provider>;
}
function useContextPage() {
  const ctx = useContext(Context);
  if (ctx == null) {
    throw new Error("<ContextPage/> missing");
  }
  return ctx;
}
export { ContextPage, useContextPage };
