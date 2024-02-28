import IconMerge from "/assets/icons/merge.svg?react";
import { StandardWidget } from "./StandardWidget.jsx";
import { mergec } from "../../misc/misc.js";

function WidgetMerge(props) {
  return (
    <StandardWidget
      className={mergec(props.className, "widget-merge")}
      content="merge"
      {...props}
    >
      <IconMerge />
    </StandardWidget>
  );
}
export { WidgetMerge };
