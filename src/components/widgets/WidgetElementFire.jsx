import IconElementFire from "/assets/icons/element-fire.svg?react";
import { ElementWidget } from "./ElementWidget.jsx";
import { mergec } from "../../misc/misc.js";

function WidgetElementFire(props) {
  return (
    <ElementWidget
      className={mergec(props.className, "widget-element-fire")}
      content="fire"
      {...props}
    >
      <IconElementFire />
    </ElementWidget>
  );
}

export { WidgetElementFire };
