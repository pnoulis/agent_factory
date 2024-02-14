import * as React from "react";
import { createPortal } from "react-dom";
import { useContextPanel } from "/src/contexts/ContextPanel.jsx";

function PanelActionbar(props) {
  const id = React.useId();
  const { actionbarRef } = useContextPanel();
  const contentRef = React.useRef();

  // React.useEffect(() => {
  //   debug(!!actionbarRef.current, "actionbarref");
  //   if (!actionbarRef.current) {
  //     setMounted(false);
  //   } else {
  //     actionbarRef.current.innerHTMl = "";
  //     setMounted(true);
  //   }
  // }, [actionbarRef.current, mounted]);
  // React.useLayoutEffect(() => {
  //   // if (childRef.current) {
  //   //   actionbarRef.current.innerHTML = "";
  //   // }
  //   debug(actionbarRef.current, `actionbarRef: ${props.id}`);
  //   // if (!childRef.current) {
  //   //   childRef.current = Array.from(actionbarRef.current.children);
  //   //   actionbarRef.current.innerHTML = "";
  //   // }
  //   debug(childRef.current, `childref: ${props.id}`);
  //   debug(childRef.current, `uselayout: ${props.id}`);

  //   return () => {
  //     debug(childRef.current, `return childref: ${props.id}`);
  //     for (let i = 0; i < childRef.current?.length; i++) {
  //       actionbarRef.current?.appendChild(childRef.current[i]);
  //     }
  //   };
  // }, [actionbarRef.current]);

  if (!contentRef.current) {
    const bar = actionbarRef.current;
    contentRef.current = Array.from(bar.children);
    bar.innerHTML = "";
  }

  React.useLayoutEffect(() => {
    return () => {
      debug(contentRef.current, `unmounting: ${props.id}`);
    };
  }, [actionbarRef.current]);

  // React.useEffect(() => {
  // debug(actionbarRef.current, "actionbarRef changed");
  //   if (actionbarRef.current) {
  //     childRef.current ??= actionbarRef.current
  //       ? Array.from(actionbarRef.current.children)
  //       : null;
  //     actionbarRef.current.innerHTML = "";
  //     setMounted(true);
  //   } else {
  //     setMounted(false);
  //   }
  //   return () => {
  //     for (let i = 0; i < childRef.current?.length; i++) {
  //       actionbarRef.current.appendChild(childRef.current[i]);
  //     }
  //   };
  // }, [actionbarRef.current]);

  // debug(mounted, "mounted actionbar");
  // debug(actionbarRef.current, "actionbar");
  return createPortal(props.children, actionbarRef.current);
}

export { PanelActionbar };
