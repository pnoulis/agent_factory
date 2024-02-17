import { Svg } from "react_utils/svgs";
import IconFail from "/assets/icons/semantic-warning-filled.svg?react";

function Fail({ className, style }) {
  return (
    <div className={className} style={style}>
      <Svg>
        <IconFail />
      </Svg>
    </div>
  );
}

export { Fail };
