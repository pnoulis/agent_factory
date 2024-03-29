import IconSignal from "/assets/icons/signal.svg?react";
import { StandardWidget } from "./StandardWidget.jsx";
import styled, { css, keyframes } from "styled-components";
import { mergec } from "../../misc/misc.js";

function WidgetWristband({ $wristbandColor, $pairing, ...props }) {
  return (
    <StandardWidgetWristband
      $pairing={$pairing}
      $wristbandColor={$wristbandColor}
      content={"pair wristband"}
      className={mergec(props.className, "widget-wristband")}
      {...props}
    >
      <IconSignal />
    </StandardWidgetWristband>
  );
}

const animation = keyframes`
50% {
background-color: white;
border-color: var(--grey-light);
}
`;

function animate({ $pairing } = {}) {
  if (!$pairing) return "";
  return css`
    &.trigger {
      background-color: var(--success-base);
      border-color: var(--success-base);
      animation: ${animation} 2s infinite;
    }
  `;
}

function paint({ $wristbandColor } = {}) {
  if (!$wristbandColor) return "";
  return css`
    &.trigger {
      border-color: ${$wristbandColor};
      background-color: ${$wristbandColor};
    }

    &.trigger > svg {
      fill: white;
    }
  `;
}

const StandardWidgetWristband = styled(StandardWidget)`
  ${paint}
  ${animate}

&.trigger > svg {
    position: relative;
    top: 1.5px;
    left: 0.5px;
  }
`;

export { WidgetWristband };
