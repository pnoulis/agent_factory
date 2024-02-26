import * as React from "react";
import styled from "styled-components";

function Overflow({ className, style, children }) {
  const [size, setSize] = React.useState(null);
  const ref = React.useRef();

  React.useLayoutEffect(() => {
    const container = ref.current;
    if (!container) return;
    const dimensions = window.getComputedStyle(container);

    setSize({
      width:
        container.scrollWidth -
        (parseFloat(dimensions.paddingLeft) +
          parseFloat(dimensions.paddingRight)),
      height:
        container.scrollHeight -
        (parseFloat(dimensions.paddingTop) +
          parseFloat(dimensions.paddingBottom)),
    });
  }, []);

  return (
    <Container
      className={className}
      style={style}
      $width={size?.width}
      $height={size?.height}
      ref={ref}
    >
      {size && children}
    </Container>
  );
}

const Container = styled.div.attrs(({ ref }) => ({ ref }))`
  box-sizing: border-box;
  overflow: auto;
  width: ${({ $width }) => ($width ? `${$width}px` : "100%")};
  max-width: ${({ $width }) => ($width ? `${$width}px` : "100%")};
  height: ${({ $height }) => ($height ? `${$height}px` : "100%")};
  max-height: ${({ $height }) => ($height ? `${$height}px` : "100%")};
`;

export { Overflow };
