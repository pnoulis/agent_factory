import * as React from "react";
import { Outlet } from "react-router-dom";
import { Panel } from "#components/panel/Panel.jsx";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import styled from "styled-components";

function Component() {
  return (
    <Page className="page">
      <Panel className="panel">
        <Content className="content">
          <Outlet />
        </Content>
      </Panel>
    </Page>
  );
}

const Page = styled("div")`
  width: 100%;
  height: 100%;
`;
const Content = styled("div")`
  width: 100%;
  height: 100%;
`;

export { Component };
