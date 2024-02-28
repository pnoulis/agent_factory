import * as React from "react";
import styled from "styled-components";

const RootFm = React.forwardRef(({ className, ...props }, ref) => (
  <Div ref={ref} className={className} {...props} />
));

const Div = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  pointer-events: none;
  z-index: 3;
  display: flex;
  flex-flow: column-reverse nowrap;
  gap: 20px;
  padding: 30px;
`;

export { RootFm };
