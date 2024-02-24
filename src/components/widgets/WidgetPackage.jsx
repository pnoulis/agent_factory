import IconPackage from "/assets/icons/package.svg?react";
import { StandardWidget } from "./StandardWidget.jsx";
import { mergec } from "../../misc/misc.js";
import styled from "styled-components";

function WidgetPackage(props) {
  return (
    <ThisStandardWidget
      className={mergec(props.className, "widget-package")}
      content="package"
      {...props}
    >
      <IconPackage />
    </ThisStandardWidget>
  );
}

const ThisStandardWidget = styled(StandardWidget)`
  &.trigger > svg {
    stroke: var(--primary-base);
  }
`;

export { WidgetPackage };
