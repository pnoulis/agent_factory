import * as React from "react";

function useHover() {
  const [hovering, setIsHovering] = React.useState(false);

  return [
    hovering,
    {
      onMouseEnter: (e) => setIsHovering(true),
      onMouseLeave: (e) => setIsHovering(false),
    },
  ];
}

export { useHover };
