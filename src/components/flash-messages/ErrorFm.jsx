import { StandardFm } from "./StandardFm.jsx";
import { Svg } from "react_utils/svgs";
import IconError from "/assets/icons/semantic-warning-outlined.svg?react";

function ErrorFm({ message }) {
  return (
    <StandardFm $variant="error">
      <Svg className="icon">
        <IconError />
      </Svg>
      <p className="msg">{message}</p>
    </StandardFm>
  );
}

export { ErrorFm };
