import IconElementEarth from "/assets/icons/element-earth.svg?react";
import { ElementWidget } from "./ElementWidget.jsx";
import { mergec } from "../../misc/misc.js";

function WidgetElementEarth(props) {
  return (
    <ElementWidget
      className={mergec(props.className, "widget-element-earth")}
      content="earth"
      {...props}
    >
      <IconElementEarth />
    </ElementWidget>
  );
}

export { WidgetElementEarth };
