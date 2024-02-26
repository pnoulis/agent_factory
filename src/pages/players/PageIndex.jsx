import { PanelActionbar } from "#components/panel/PanelActionbar";
import { AwaitPlayers } from "/src/loaders/loadPlayers.jsx";
import { TablePlayers } from "#components/tables/TablePlayers.jsx";
import { Center } from "#components/Center.jsx";
import styled from "styled-components";

function Component() {
  return (
    <Page className="page-players-index">
      <Content className="content-players-index">
        <AwaitPlayers>
          {({ players }) => (
            <TablePlayers players={players} />
          )}
        </AwaitPlayers>
      </Content>
    </Page>
  );
}

const Page = styled("div")`
  height: 100%;
  width: 100%;
`;
const Content = styled("div")`
  width: 100%;
  height: 100%;
`;

export { Component };
