import * as React from "react";
import { useSubscription } from "../../hooks/useSubscription.jsx";

function AwaitSubscription({ cmd, skip, children }) {
  const { err, msg } = useSubscription(cmd, { skip });
  throw err;
  return children(msg);
}

export { AwaitSubscription };
