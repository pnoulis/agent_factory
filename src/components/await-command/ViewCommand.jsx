import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Pending } from "./Pending2.jsx";
import { Fulfilled } from "./Fulfilled.jsx";
import { Rejected } from "./Rejected.jsx";
import { REACT_APP_ROOT } from "../../constants.js";
import { delay } from "js_utils/misc";

function ViewCommand({
  cmd,
  noRejected = false,
  noFulfilled = false,
  onFulfilled,
  onRejected,
  onPending,
  onSettled,
  filterCb,
  children,
  delay: time = 0,
}) {
  const rootRef = React.useRef();
  const idRef = React.useRef(`${cmd.taskname}-cmd`);

  const cleanup = () => {
    rootRef.current?.unmount();
    const node = document.getElementById(idRef.current);
    node && document.body.removeChild(node);
  };

  React.useEffect(() => {
    const handlePending = async (cmd) => {
      const div = document.createElement("div");
      div.setAttribute("id", idRef.current);
      const root = ReactDOM.createRoot(div);
      document.body.appendChild(div);
      rootRef.current = root;
      rootRef.current.render(<Pending style={{ marginLeft: "100px" }} />);
      document.body.style.pointerEvents = "none";
      time && (await delay(time));
      document.body.style.pointerEvents = "auto";
      return Promise.resolve(cmd).then(onPending);
    };
    const handleFulfilled = async (cmd) => {
      !noFulfilled &&
        rootRef.current.render(<Fulfilled style={{ marginLeft: "100px" }} />);
      time && (await delay(time));
      document.body.style.pointerEvents = "auto";
      return Promise.resolve(cmd).then(onFulfilled);
    };
    const handleRejected = async (cmd) => {
      !noRejected &&
        rootRef.current.render(<Rejected style={{ marginLeft: "100px" }} />);
      time && (await delay(time));
      document.body.style.pointerEvents = "auto";
      return Promise.resolve(cmd).then(onRejected);
    };
    const handlePostask = async (cmd) => {
      cleanup();
      return Promise.resolve(cmd).then(onSettled);
    };

    cmd.on("pending", handlePending);
    cmd.on("fulfilled", handleFulfilled);
    cmd.on("rejected", handleRejected);
    cmd.on("postask", handlePostask);
    return () => {
      cmd.removeListener("pending", handlePending);
      cmd.removeListener("fulfilled", handleFulfilled);
      cmd.removeListener("rejected", handleRejected);
      cmd.removeListener("postask", handlePostask);
      cleanup();
    };
  }, []);

  return children;
}

export { ViewCommand };
