import { createContext, useContext } from "react";

const Context = createContext(null);
function ContextWristband({ ctx, children }) {
  return <Context.Provider value={ctx}>{children}</Context.Provider>;
}
function useContextWristband() {
  const ctx = useContext(Context);
  if (ctx == null) {
    throw new Error("<ContextWristband/> missing");
  }
  return ctx;
}
export { ContextWristband, useContextWristband };
