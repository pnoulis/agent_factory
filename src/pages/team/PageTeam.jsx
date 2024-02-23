import * as React from "react";
import { Panel } from "#components/panel/Panel.jsx";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import { PanelNavLink } from "#components/links/PanelNavLink";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { AwaitTeam } from "/src/loaders/loadTeam.jsx";
import { Center } from "/src/components/Center.jsx";

function Component() {
  return (
    <>
      <Panel>
        <Center>
          <Page>
            <AwaitTeam>
              {({ team }) => {
                debug(team, "team");
                return <>{team?.name}</>;
              }}
            </AwaitTeam>
          </Page>
        </Center>
      </Panel>
    </>
  );
}

const Page = styled("div")``;

export { Component };
