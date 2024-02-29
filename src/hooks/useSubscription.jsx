import * as React from "react";
import { isFunction } from "js_utils/misc";

function useSubscription(
  cmd,
  { revalidator = true, skip = 0, withMsg = true } = {},
  cb,
) {
  const [msg, setMsg] = React.useState(null);
  const skipRef = React.useRef(skip || 0);

  React.useEffect(() => {
    const unsub = cmd({ revalidator }, (err, msg) => {
      if (!skipRef.current) {
        skipRef.current = skip;
        cb?.(err, msg);
        return withMsg && setMsg({ err, msg });
      }
      --skipRef.current;
    });

    return () => {
      unsub.then((unsub) => unsub());
      skipRef.current = skip;
    };
  }, [cmd]);

  return msg;
}

export { useSubscription };
