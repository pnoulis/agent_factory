import IconRoster from "/assets/icons/players-two.svg?react";
import { StandardWidget } from "./StandardWidget.jsx";
import { mergec } from "../../misc/misc.js";

function WidgetRoster(props) {
  return (
    <StandardWidget
      className={mergec(props.className, "widget-roster")}
      content="roster"
      {...props}
    >
      <IconRoster />
    </StandardWidget>
  );
}
export { WidgetRoster };
