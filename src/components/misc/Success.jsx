import { Svg } from "react_utils/svgs";
import IconSuccess from "/assets/icons/tick.svg?react";

function Success({ className, style }) {
  return (
    <div className={className} style={style}>
      <Svg>
        <IconSuccess />
      </Svg>
    </div>
  );
}

export { Success };
