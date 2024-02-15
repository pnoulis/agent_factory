import * as React from "react";
import { ContextPanel } from "/src/contexts/ContextPanel.jsx";
import styled from "styled-components";

function Panel({ className, style, children }) {
  const [mounted, setMounted] = React.useState();
  const actionbarRef = React.useRef();
  const nodesRef = React.useRef([]);

  function handleMount(mounted) {
    for (const node of nodesRef.current) {
      node.style.display = "none";
    }
    nodesRef.current.push(mounted);
  }

  function handleUnmount(unmounted) {
    nodesRef.current.pop();
    for (const node of nodesRef.current) {
      node.style.display = "initial";
    }
  }

  return (
    <ContextPanel ctx={{ actionbarRef, handleMount, handleUnmount }}>
      <Wrapper className={className} style={style}>
        <header
          ref={(node) => {
            setMounted(!!node);
            actionbarRef.current = node;
          }}
        />
        <article>{mounted && children}</article>
      </Wrapper>
    </ContextPanel>
  );
}

const Wrapper = styled("div")`
  box-sizing: border-box;
  display: grid;
  width: 100%;
  height: 100%;
  padding: 20px;
  grid-template-areas: "panel-header" "panel-main";
  grid-template-rows: max-content 1fr;
  grid-template-columns: 1fr;
  row-gap: 20px;
  position: relative;
`;

export { Panel };
