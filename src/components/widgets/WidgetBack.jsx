import IconBack from "/assets/icons/back.svg?react";
import { StandardWidget } from "./StandardWidget.jsx";
import { mergec } from "../../misc/misc.js";

function WidgetBack(props) {
  return (
    <StandardWidget
      className={mergec(props.className, "widget-back")}
      content="back"
      {...props}
    >
      <IconBack />
    </StandardWidget>
  );
}

export { WidgetBack };
