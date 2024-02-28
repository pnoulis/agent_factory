import IconPlay from "/assets/icons/play.svg?react";
import { StandardWidget } from "./StandardWidget.jsx";
import { mergec } from "../../misc/misc.js";
import styled from "styled-components";

function WidgetPlay(props) {
  return (
    <ThisStandardWidget
      className={mergec("widget-play", props.className)}
      content="play"
      {...props}
    >
      <IconPlay />
    </ThisStandardWidget>
  );
}

const ThisStandardWidget = styled(StandardWidget)`
  &.trigger > svg {
    position: relative;
    left: 2px;
  }
`;
export { WidgetPlay };
