import IconBoot from "/assets/icons/clock.svg?react";
import { StandardWidget } from "./StandardWidget.jsx";
import { mergec } from "../../misc/misc.js";

function WidgetBoot(props) {
  return (
    <StandardWidget
      className={mergec(props.className, "widget-boot")}
      content="boot"
      {...props}
    >
      <IconBoot />
    </StandardWidget>
  );
}

export { WidgetBoot };
