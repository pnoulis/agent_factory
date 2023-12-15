import IconAdd from "/assets/icons/add.svg?react";
import { StandardWidget } from "./StandardWidget.jsx";

function WidgetAdd(props) {
  return (
    <StandardWidget content="add" {...props}>
      <IconAdd />
    </StandardWidget>
  );
}
export { WidgetAdd };
