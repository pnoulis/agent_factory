import { Svg } from "react_utils/svgs";
import IconInfo from "/assets/icons/semantic-info-outlined.svg?react";

function Info({ className, style }) {
  return (
    <div className={className} style={style}>
      <Svg>
        <IconInfo />
      </Svg>
    </div>
  );
}

export { Info };
