import * as React from "react";
import { Outlet } from "react-router-dom";
import { Panel } from "#components/panel/Panel.jsx";

function Component() {
  return (
    <Panel>
      <Outlet />
    </Panel>
  );
}

export { Component };
