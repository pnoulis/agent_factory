import { StandardFm } from "./StandardFm.jsx";
import { Svg } from "react_utils/svgs";
import IconInfo from "/assets/icons/semantic-info-outlined.svg?react";

function InfoFm({ message }) {
  return (
    <StandardFm $variant="info">
      <Svg className="icon">
        <IconInfo />
      </Svg>
      <p className="msg">{message}</p>
    </StandardFm>
  );
}

export { InfoFm };
