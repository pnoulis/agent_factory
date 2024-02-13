import { StandardFm } from "./StandardFm.jsx";
import { Svg } from "react_utils/svgs";
import IconSuccess from "/assets/icons/semantic-success-outlined.svg?react";

function SuccessFm({ message }) {
  return (
    <StandardFm $variant="success">
      <Svg className="icon">
        <IconSuccess />
      </Svg>
      <p classname="msg">{message}</p>
    </StandardFm>
  );
}

export { SuccessFm };
