import IconDistribute from "/assets/icons/distribute-2.svg?react";
import { StandardWidget } from "./StandardWidget.jsx";
import { mergec } from "../../misc/misc.js";

function WidgetDistribute(props) {
  return (
    <StandardWidget
      className={mergec(props.className, "widget-distribute")}
      content="distribute"
      {...props}
    >
      <IconDistribute />
    </StandardWidget>
  );
}
export { WidgetDistribute };
