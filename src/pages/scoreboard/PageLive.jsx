import * as React from "react";
import styled from "styled-components";
import { TableScoreboardLive } from "#components/tables/TableScoreboardLive.jsx";
import { AwaitScoreboardLive } from "/src/loaders/loadScoreboardLive.jsx";
import { useSubscription } from "../../hooks/useSubscription.jsx";
import { useRevalidator } from "react-router-dom";

function Component() {
  const revalidator = useRevalidator();

  useSubscription(
    afm.subscribeScoreboard,
    {
      skip: 3,
      withMsg: false,
      revalidator: true,
    },
    (err, scoreboard) => {
      revalidator.revalidate();
    },
  );

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
