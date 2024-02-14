import { Outlet } from "react-router-dom";
import { Panel } from "#components/panel/Panel.jsx";

function PagePanel() {
  return (
    <Panel>
      <Outlet />
    </Panel>
  );
}

export { PagePanel };
