import * as React from "react";
import { createPortal } from "react-dom";
import { useContextPanel } from "/src/contexts/ContextPanel.jsx";

function PanelActionbar(props) {
  const node = React.useRef();
  const { actionbarRef, handleMount, handleUnmount } = useContextPanel();

  React.useLayoutEffect(() => {
    handleMount(node.current);
    return () => handleUnmount(node.current);
  }, [handleMount, handleUnmount, node.current]);

  return createPortal(
    <div ref={node}>{props.children}</div>,
    actionbarRef.current,
  );
}

export { PanelActionbar };
