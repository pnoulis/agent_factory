import * as React from "react";
import styled from "styled-components";
import { TableScoreboardLive } from "#components/tables/TableScoreboardLive.jsx";
import { AwaitScoreboardLive } from "/src/loaders/loadScoreboardLive.jsx";

function Component() {
  return (
    <Page>
      <AwaitScoreboardLive>
        {({ scoreboard }) => (
          <Content>
            <TableScoreboardLive scoreboard={scoreboard} />
          </Content>
        )}
      </AwaitScoreboardLive>
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
  padding: 40px 40px 20px 40px;
`;

export { Component };
