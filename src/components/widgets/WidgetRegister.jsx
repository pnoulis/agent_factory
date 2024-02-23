import IconRegister from "/assets/icons/save.svg?react";
import { StandardWidget } from "./StandardWidget.jsx";
import { mergec } from "../../misc/misc.js";

function WidgetRegister(props) {
  return (
    <StandardWidget
      className={mergec(props.className, "widget-register")}
      content="register"
      {...props}
    >
      <IconRegister />
    </StandardWidget>
  );
}
export { WidgetRegister };
