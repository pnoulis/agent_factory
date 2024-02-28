import IconRestart from "/assets/icons/restart.svg?react";
import { StandardWidget } from "./StandardWidget.jsx";
import { mergec } from "../../misc/misc.js";

function WidgetRestart(props) {
  return (
    <StandardWidget
      className={mergec(props.className, "widget-restart")}
      content="restart"
      {...props}
    >
      <IconRestart />
    </StandardWidget>
  );
}

export { WidgetRestart };
