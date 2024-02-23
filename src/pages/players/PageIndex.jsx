import { PanelActionbar } from "#components/panel/PanelActionbar";
import { AwaitPlayers } from "/src/loaders/loadPlayers.jsx";
import { TablePlayers } from "#components/tables/TablePlayers.jsx";
import { Center } from "#components/Center.jsx";
import styled from "styled-components";

function Component() {
  return (
    <Center>
      <AwaitPlayers>
        {({ players }) => {
          return (
            <Page className="page">
              <TablePlayers players={players} />
            </Page>
          );
        }}
      </AwaitPlayers>
    </Center>
  );
}

const Page = styled("div")`
  padding-top: 80px;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 85%;
  grid-template-rows: 1fr;
  justify-content: center;
`;

export { Component };
