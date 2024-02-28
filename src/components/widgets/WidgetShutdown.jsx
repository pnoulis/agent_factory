import IconShutdown from "/assets/icons/power-on.svg?react";
import { StandardWidget } from "./StandardWidget.jsx";
import { mergec } from "../../misc/misc.js";

function WidgetShutdown(props) {
  return (
    <StandardWidget
      className={mergec(props.className, "widget-shutdown")}
      content="shutdown"
      {...props}
    >
      <IconShutdown />
    </StandardWidget>
  );
}

export { WidgetShutdown };
