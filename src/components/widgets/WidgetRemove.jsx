import IconRemove from "/assets/icons/delete.svg?react";
import { StandardWidget } from "./StandardWidget.jsx";
import { mergec } from "../../misc/misc.js";

function WidgetRemove(props) {
  return (
    <StandardWidget
      className={mergec(props.className, "widget-remove")}
      content="remove"
      {...props}
    >
      <IconRemove />
    </StandardWidget>
  );
}

export { WidgetRemove };
