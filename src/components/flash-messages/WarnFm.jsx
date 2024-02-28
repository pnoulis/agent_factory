import { StandardFm } from "./StandardFm.jsx";
import { Svg } from "react_utils/svgs";
import IconWarn from "/assets/icons/semantic-warning-outlined.svg?react";

function WarnFm({ message }) {
  return (
    <StandardFm $variant="warn">
      <Svg className="icon">
        <IconWarn />
      </Svg>
      <p className="msg">{message}</p>
    </StandardFm>
  );
}

export { WarnFm };
