import IconAdd from "/assets/icons/add.svg?react";
import { StandardWidget } from "./StandardWidget.jsx";
import { mergec } from "../../misc/misc.js";

function WidgetAdd(props) {
  return (
    <StandardWidget
      className={mergec(props.className, "widget-add")}
      content="add"
      {...props}
    >
      <IconAdd />
    </StandardWidget>
  );
}
export { WidgetAdd };
