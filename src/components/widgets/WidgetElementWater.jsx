import IconElementWater from "/assets/icons/element-water.svg?react";
import { ElementWidget } from "./ElementWidget.jsx";
import { mergec } from "../../misc/misc.js";

function WidgetElementWater(props) {
  return (
    <ElementWidget
      className={mergec(props.className, "widget-element-water")}
      content="water"
      {...props}
    >
      <IconElementWater />
    </ElementWidget>
  );
}

export { WidgetElementWater };
