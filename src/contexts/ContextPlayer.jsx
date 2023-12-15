import { createContext, useContext } from "react";

const Context = createContext(null);
function ContextPlayer({ ctx, children }) {
  return <Context.Provider value={ctx}>{children}</Context.Provider>;
}
function useContextPlayer() {
  const ctx = useContext(Context);
  if (ctx == null) {
    throw new Error("<ContextPlayer/> missing");
  }
  return ctx;
}
export { ContextPlayer, useContextPlayer };
