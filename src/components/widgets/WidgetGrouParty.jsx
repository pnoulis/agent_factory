import IconGrouParty from "/assets/icons/players-three.svg?react";
import { StandardWidget } from "./StandardWidget.jsx";
import { mergec } from "../../misc/misc.js";

function WidgetGrouParty(props) {
  return (
    <StandardWidget
      className={mergec(props.className, "widget-grouParty")}
      content="grouParty"
      {...props}
    >
      <IconGrouParty />
    </StandardWidget>
  );
}
export { WidgetGrouParty };
