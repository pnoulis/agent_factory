import IconLock from "/assets/icons/lock-locked.svg?react";
import IconUnlock from "/assets/icons/lock-unlocked.svg?react";
import { StandardWidget } from "./StandardWidget.jsx";
import { mergec } from "../../misc/misc.js";

function WidgetLock({ locked, ...props }) {
  return (
    <StandardWidget
      className={mergec(props.className, "widget-lock")}
      content={props.content || `${locked ? "unlock" : "lock"}`}
      {...props}
    >
      {locked ? <IconLock /> : <IconUnlock />}
    </StandardWidget>
  );
}
export { WidgetLock };
