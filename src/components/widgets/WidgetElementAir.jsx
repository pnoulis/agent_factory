import IconElementAir from "/assets/icons/element-air.svg?react";
import { ElementWidget } from "./ElementWidget.jsx";
import { mergec } from "../../misc/misc.js";

function WidgetElementAir(props) {
  return (
    <ElementWidget
      className={mergec(props.className, "widget-element-air")}
      content="air"
      {...props}
    >
      <IconElementAir />
    </ElementWidget>
  );
}

export { WidgetElementAir };
