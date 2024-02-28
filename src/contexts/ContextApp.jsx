import { createContext, useContext } from "react";

const Context = createContext(null);
function ContextApp({ ctx, children }) {
  return <Context.Provider value={ctx}>{children}</Context.Provider>;
}
function useContextApp() {
  const ctx = useContext(Context);
  if (ctx == null) {
    throw new Error("<ContextApp/> missing");
  }
  return ctx;
}
export { ContextApp, useContextApp };
